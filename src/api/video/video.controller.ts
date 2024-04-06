import { Body, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiHandleResponse } from 'src/decorator/api.decorator';
import {
  CreateVideoDto,
  CreateVideoPayload,
} from 'src/dto/video-dto/create-video-dto';
import ENTITY_NAME from 'src/constant/entity-name';
import { IsAuthController } from 'src/decorator/auth.decorator';
import { RequestAuth } from 'src/dto/request.dto';
import { Video } from 'src/entities/video.entity';

@IsAuthController(ENTITY_NAME.VIDEOS, 'Video Auth', true)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/')
  @ApiHandleResponse({
    summary: 'Create a new video',
    type: Boolean,
    httpStatus: HttpStatus.CREATED,
  })
  async createVideo(@Body() body: CreateVideoDto, @Req() req: RequestAuth) {
    const payload = {
      userId: req.user.sub,
      url: body.url,
    } as CreateVideoPayload;
    return this.videoService.createVideo(payload);
  }

  @Get('/')
  @ApiHandleResponse({
    summary: 'Get a list of videos',
    type: Video,
    httpStatus: HttpStatus.OK,
  })
  async getVideos(@Req() req: RequestAuth) {
    return this.videoService.getVideos(req.user.sub);
  }
}
