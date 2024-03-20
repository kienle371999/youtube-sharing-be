import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiHandleResponse } from 'src/decorator/api.decorator';
import { CreateVideoDto } from 'src/dto/video-dto/create-video-dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/')
  @ApiHandleResponse({
    summary: 'Create a new video',
    type: Boolean,
    httpStatus: HttpStatus.CREATED,
  })
  async createNewUser(@Body() body: CreateVideoDto) {
    return await this.videoService.createVideo(body);
  }
}
