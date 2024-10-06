import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { VerificationModule } from '../verification/verification.module';
import { RiskScoreModule } from '../risk-score/risk-score.module';
import { UserDocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { UserDocument } from './entities/document.entity';

@Module({
  imports: [
    RiskScoreModule,
    VerificationModule,
    TypeOrmModule.forFeature([User, UserDocument])
  ],
  providers: [UserService, UserDocumentService],
  controllers: [UserController, DocumentController],
})
export class UserModule {}
