import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsSwaggerDate, IsSwaggerNumber } from '../decorator/swagger.decorator';

export abstract class AbstractIdEntity extends BaseEntity {
  @IsSwaggerNumber({ default: 1 })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
}

export abstract class AbstractTimeEntity extends AbstractIdEntity {
  @IsSwaggerDate({ default: new Date() })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @IsSwaggerDate({ default: new Date() })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
