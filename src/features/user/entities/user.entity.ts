import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserDocument } from './document.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  walletAddress: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  passportCopy: string;

  @Column()
  email: string;

  @Column()
  riskScore: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  documentFilename: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  documentPath: string;

  @OneToMany(() => UserDocument, (document) => document.user)
  documents: UserDocument[];
}
