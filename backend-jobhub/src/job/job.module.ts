import { Global, Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { AuthModule } from 'src/auth/auth.module';


@Global()
@Module({
  imports: [AuthModule], 
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}

