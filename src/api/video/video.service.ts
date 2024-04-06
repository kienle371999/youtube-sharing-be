import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ENV } from 'src/config/environment';
import { ERROR_MSG } from 'src/constant/error';
import {
  CreateVideoDto,
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

    const video = new Video();
    video.url = payload.url;
    video.title = videoSnippet.title;
    video.description = videoSnippet.description;
    video.likeCount = videoStats.likeCount;
    video.userId = payload.userId;

    return this.videoRepo.save(video);
  }

  async getVideos(userId: number): Promise<Video[]> {
    return this.videoRepo.findBy({ userId });
  }
}
