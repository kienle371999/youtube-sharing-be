import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { VideoEventController } from './video-event.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Video]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [VideoController, VideoEventController],
  providers: [VideoService],
})
export class VideoModule {}
