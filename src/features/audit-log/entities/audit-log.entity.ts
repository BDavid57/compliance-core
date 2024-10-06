import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  action: string; // e.g., 'approve', 'reject'

  @Column()
  reviewerId: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ nullable: true })
  comment: string;
}
