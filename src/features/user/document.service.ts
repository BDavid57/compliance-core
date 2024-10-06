import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { User } from '../user/entities/user.entity';
import { UserDocument } from './entities/document.entity';

@Injectable()
export class UserDocumentService {
  private readonly logger = new Logger(UserDocumentService.name);

  constructor(
    @InjectRepository(UserDocument)
    private readonly documentRepository: Repository<UserDocument>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveDocument(document: Express.Multer.File, userId: string): Promise<UserDocument> {
    if (!document) {
      throw new Error('No document provided');
    }

    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['documents'] });
    if (!user) {
      throw new Error('User not found');
    }

    const documentFilename = `${Date.now()}-${document.originalname}`;
    const documentPath = join(__dirname, '../..', 'uploads', documentFilename);
    writeFileSync(documentPath, document.buffer);

    const userDocument = this.documentRepository.create({
      filename: documentFilename,
      path: documentPath,
      user: user,
    });

    const savedDocument = await this.documentRepository.save(userDocument);
    this.logger.log(`Document saved for user ID ${userId} at ${documentPath}`);

    return savedDocument;
  }
}
