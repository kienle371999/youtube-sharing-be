import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ENV } from './environment';
import { Video } from 'src/entities/video.entity';

const config: DataSourceOptions = {
  type: ENV.DATABASE.DB_TYPE as any,
  host: ENV.DATABASE.DB_HOST,
  port: ENV.DATABASE.DB_PORT,
  username: ENV.DATABASE.DB_USERNAME,
  password: ENV.DATABASE.DB_PASSWORD,
  database: ENV.DATABASE.DB_NAME,
  entities: [User, Video],
  synchronize: true,
};

export const dataSource = new DataSource(config as DataSourceOptions);

export const initDatasource = async () => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization', err);
  }
};

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return config;
  }
}
