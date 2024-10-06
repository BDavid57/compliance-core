import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuditLog } from './entities/audit-log.entity';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  async logAction(
    @Body('userId') userId: string,
    @Body('action') action: string,
    @Body('reviewerId') reviewerId: string,
    @Body('comment') comment?: string,
  ) {
    return this.auditLogService.logAction(userId, action, reviewerId, comment);
  }

  @Get('user/:userId')
  async getLogsForUser(@Param('userId') userId: string): Promise<AuditLog[]> {
    return this.auditLogService.findByUser(userId);
  }

  @Get('all')
  async getAllLogs(): Promise<AuditLog[]> {
    return this.auditLogService.findAll();
  }
}
