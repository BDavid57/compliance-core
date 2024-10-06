import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  walletAddress: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  passportCopy: string;

  @IsString()
  email: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false, description: 'Document to upload' })
  @IsOptional()
  document?: Express.Multer.File;
}
