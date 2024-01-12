import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Job (e2e)', () => {
  let app: INestApplication;
  let authToken: string; // To store the authentication token

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Register a new user and obtain the authentication token
    const userRegistrationDto = {
      username: 'testuser',
      password: 'testpassword',
      email: 'testuser@example.com',
    };

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userRegistrationDto)
      .expect(201);

    authToken = registerResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  let createdJobId: string; // To store the ID of the job created for testing updates and deletes

  describe('POST /jobs', () => {
    it('should create a new job', async () => {
      const createJobDto = {
        title: 'Software Engineer',
        description: 'Exciting software engineering opportunity',
        salary: 80000,
        userType: 'EMPLOYEE',
      };

      // Create a new job using the registered user's token
      const response = await request(app.getHttpServer())
        .post('/jobs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createJobDto)
        .expect(201);

      const { id, title, description, salary, userType } = response.body;
      expect(id).toBeDefined();
      expect(title).toBe(createJobDto.title);
      expect(description).toBe(createJobDto.description);
      expect(salary).toBe(createJobDto.salary);
      expect(userType).toBe(createJobDto.userType);

      createdJobId = id; // Save the ID for testing updates and deletes
    });

    it('should handle job creation failure', async () => {
      const invalidCreateJobDto = {
        title: 'Invalid Job', // This should fail as it's missing required fields
      };

      // Attempt to create a job with incomplete data
      await request(app.getHttpServer())
        .post('/jobs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidCreateJobDto)
        .expect(400);
    });
  });

  describe('GET /jobs', () => {
    it('should get all jobs', async () => {
      await request(app.getHttpServer())
        .get('/jobs')
        .expect(200);
    });
  });

  describe('GET /jobs/:id', () => {
    it('should get a specific job', async () => {
      await request(app.getHttpServer())
        .get(`/jobs/${createdJobId}`)
        .expect(200);
    });

    it('should handle job not found', async () => {
      const nonExistentJobId = 'nonexistentjobid';

      await request(app.getHttpServer())
        .get(`/jobs/${nonExistentJobId}`)
        .expect(404);
    });
  });

  describe('PATCH /jobs/:id', () => {
    it('should update a job', async () => {
      const updateJobDto = {
        title: 'Updated Job Title',
        description: 'Updated job description',
        salary: 90000,
      };

      await request(app.getHttpServer())
        .patch(`/jobs/${createdJobId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateJobDto)
        .expect(200)
        .expect((response) => {
          const { title, description, salary } = response.body;
          expect(title).toBe(updateJobDto.title);
          expect(description).toBe(updateJobDto.description);
          expect(salary).toBe(updateJobDto.salary);
        });
    });

    it('should handle job update failure', async () => {
      const invalidUpdateJobDto = {
        salary: 'invalidsalary', // This should fail as salary should be a number
      };

      await request(app.getHttpServer())
        .patch(`/jobs/${createdJobId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidUpdateJobDto)
        .expect(400);
    });
  });

  describe('DELETE /jobs/:id', () => {
    it('should delete a job', async () => {
      await request(app.getHttpServer())
        .delete(`/jobs/${createdJobId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should handle job deletion failure', async () => {
      const nonExistentJobId = 'nonexistentjobid';

      await request(app.getHttpServer())
        .delete(`/jobs/${nonExistentJobId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
