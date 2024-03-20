import ENTITY_NAME from 'src/constant/entity-name';
import { IsSwaggerString } from 'src/decorator/swagger.decorator';
import { Column, Entity } from 'typeorm';
import { AbstractTimeEntity } from './entity.interface';

@Entity(ENTITY_NAME.USERS)
export class User extends AbstractTimeEntity {
  @IsSwaggerString()
  @Column({ name: 'user_name', type: 'varchar', length: 50, unique: true })
  username: string;

  @IsSwaggerString()
  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @IsSwaggerString()
  @Column({ name: 'password', type: 'varchar' })
  password: string;
}
