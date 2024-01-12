import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const registerDto = {
        username: 'testuser',
        password: 'testpassword',
        email: 'testuser@example.com',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201)
        .expect((response) => {
          const { token } = response.body;
          expect(token).toBeDefined();
        });
    });

    it('should handle registration failure', async () => {
      const invalidRegisterDto = {
        username: 'existinguser', // Assuming this user already exists
        password: 'testpassword',
        email: 'testuser@example.com',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(invalidRegisterDto)
        .expect(400)
        .expect((response) => {
          const { message } = response.body;
          expect(message).toBe('Registration failed');
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a user', async () => {
      const loginDto = {
        username: 'testuser', // Assuming this user was registered in the previous test
        password: 'testpassword',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200)
        .expect((response) => {
          const { token } = response.body;
          expect(token).toBeDefined();
        });
    });

    it('should handle login failure', async () => {
      const invalidLoginDto = {
        username: 'nonexistentuser',
        password: 'invalidpassword',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(invalidLoginDto)
        .expect(401)
        .expect((response) => {
          const { message } = response.body;
          expect(message).toBe('Invalid credentials');
        });
    });
  });
});
