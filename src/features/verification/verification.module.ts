import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { JumioService } from './jumio.service';
import { SumsubService } from './sumsub.service';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, JumioService, SumsubService],
  exports: [VerificationService, JumioService, SumsubService]
})
export class VerificationModule {}
