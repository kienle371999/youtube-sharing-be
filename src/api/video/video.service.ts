import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { ENV } from 'src/config/environment';
import COMMON from 'src/constant/common';
import { ERROR_MSG } from 'src/constant/error';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/dto/paginate.dto';
import {
  CreateVideoEvent,
  CreateVideoPayload,
} from 'src/dto/video-dto/create-video-dto';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { AppException } from 'src/middleware/app-error-handler';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly httpService: HttpService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createVideo(payload: CreateVideoPayload): Promise<Video> {
    const params = new URLSearchParams(payload.url);
    const prefixYoutubeUrl = 'https://www.youtube.com/watch?v';
    const videoId = params.get(prefixYoutubeUrl);

    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `${ENV.YOUTUBE.YOUTUBE_URL}?part=snippet,statistics&id=${videoId}&key=${ENV.YOUTUBE.YOUTUBE_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw new AppException(ERROR_MSG.BASE_ERROR);
          }),
        ),
    );

    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new AppException(ERROR_MSG.BASE_ERROR);
    }

    const videoSnippet = data.items[0].snippet;
    const videoStats = data.items[0].statistics;

    const existedVideo = await this.videoRepo.findOneBy({
      title: videoSnippet.title,
    });
    if (existedVideo) {
      throw new AppException(ERROR_MSG.VIDEO_EXIST);
    }

    const video = new Video();
    video.url = payload.url;
    video.title = videoSnippet.title;
    video.description = videoSnippet.description;
    video.likeCount = videoStats.likeCount;
    video.userId = payload.userId;

    const newVideo = await this.videoRepo.save(video);

    const user = await this.userRepo.findOneBy({ id: payload.userId });
    const eventPayload: CreateVideoEvent = {
      name: user.username,
      title: newVideo.title,
    };
    this.eventEmitter.emit(COMMON.EVENT, eventPayload);

    return newVideo;
  }

  async getVideos(pageOptionsDto: PageOptionsDto): Promise<PageDto<Video>> {
    const { page, limit } = pageOptionsDto;

    const [res, itemCount] = await this.videoRepo.findAndCount({
      take: limit,
      skip: page * limit,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
      },
    });

    return new PageDto(
      res,
      new PageMetaDto({
        pageOptionsDto,
        itemCount,
      }),
    );
  }

  handleVideoCreatedEvent(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, COMMON.EVENT).pipe(
      map((data) => {
        return { data } as MessageEvent;
      }),
    );
  }
}
