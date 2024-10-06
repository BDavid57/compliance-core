import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditLogService {
  private readonly logger = new Logger(AuditLogService.name);

  constructor(
    @InjectRepository(AuditLog) 
    private readonly repository: Repository<AuditLog>,
  ) {}

  async logAction(userId: string, action: string, reviewerId: string, comment?: string): Promise<AuditLog> {
    this.logger.log(`Logging action: ${action} for user ${userId} by reviewer ${reviewerId}`);

    const auditLog = this.repository.create({
      userId,
      action,
      reviewerId,
      comment,
    });

    const savedLog = await this.repository.save(auditLog);

    this.logger.log(`Audit log entry created with ID: ${savedLog.id}`);

    return savedLog;
  }

  async findAll(): Promise<AuditLog[]> {
    this.logger.log('Fetching all audit logs');
    return await this.repository.find();
  }

  async findByUser(userId: string): Promise<AuditLog[]> {
    this.logger.log(`Fetching audit logs for user ID: ${userId}`);
    return await this.repository.find({ where: { userId } });
  }
}
