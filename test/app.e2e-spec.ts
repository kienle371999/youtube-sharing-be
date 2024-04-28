import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

let app: INestApplication;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

describe('Youtube Sharing Application', () => {
  it('Login', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'john.doe@example.com', password: 'qwerty456' });

    expect(res.status).toBe(201);
  });
});

afterAll(() => {
  app.close();
});
