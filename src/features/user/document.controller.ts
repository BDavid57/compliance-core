import { Controller, Post, UploadedFile, Param, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: UserDocumentService) {}

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('document'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string
  ) {
    return this.documentService.saveDocument(file, userId);
  }
}
