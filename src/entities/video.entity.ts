import ENTITY_NAME from 'src/constant/entity-name';
import {
  IsSwaggerNumber,
  IsSwaggerString,
} from 'src/decorator/swagger.decorator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractTimeEntity } from './entity.interface';
import { User } from './user.entity';

@Entity(ENTITY_NAME.VIDEOS)
export class Video extends AbstractTimeEntity {
  @IsSwaggerString()
  @Column({ name: 'url', type: 'varchar', unique: true })
  url: string;

  @IsSwaggerString()
  @Column({ name: 'title', type: 'varchar', unique: true })
  title: string;

  @IsSwaggerString()
  @Column({ name: 'description', type: 'varchar', unique: true })
  description: string;

  @IsSwaggerNumber()
  @Column({ name: 'like_count', type: 'integer', unique: true })
  likeCount: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @IsSwaggerNumber()
  @Column({ name: 'user_id', type: 'integer', nullable: false })
  userId: number;
}
