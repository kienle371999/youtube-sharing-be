import { Sse } from '@nestjs/common';
import { VideoService } from './video.service';
import { Observable } from 'rxjs';
import { IsAuthController } from 'src/decorator/auth.decorator';
import ENTITY_NAME from 'src/constant/entity-name';

@IsAuthController(ENTITY_NAME.VIDEO_EVENTS, 'Video Event', false)
export class VideoEventController {
  constructor(private readonly videoService: VideoService) {}

  @Sse()
  handleVideoCreatedEvent(): Observable<MessageEvent> {
    return this.videoService.handleVideoCreatedEvent();
  }
}
