import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JumioService } from '../verification/jumio.service';
import { RiskScoreService } from '../risk-score/risk-score.service';
import { SumsubService } from '../verification/sumsub.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jumioService: JumioService, 
    private readonly sumsubService: SumsubService,
    private readonly riskScoreService: RiskScoreService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating a new user');

    // Jumio verification
    const jumioVerificationResponse = await this.jumioService.createVerificationSession(createUserDto);
    if (!jumioVerificationResponse || jumioVerificationResponse.status !== 'success') {
      this.logger.warn('Jumio verification failed');

      throw new BadRequestException('Jumio verification failed');
    }

    // Sumsub verification
    const sumsubVerificationResponse = await this.sumsubService.createVerificationSession(createUserDto);
    if (!sumsubVerificationResponse) {
      this.logger.warn('Sumsub verification failed');

      throw new Error('Sumsub verification failed');
    }

    // Create new user instance
    const newUser = this.repository.create(createUserDto);

    // Calculate Risk Score
    const riskScore = this.riskScoreService.calculateRiskScore(createUserDto);
    newUser.riskScore = riskScore;
    this.logger.log(`Risk score for new user: ${riskScore}`);

    // Save user
    const savedUser = await this.repository.save(newUser);
    this.logger.log(`User with ID ${savedUser.id} created`);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');

    const users = await this.repository.find();

    this.logger.log(`Fetched ${users.length} users`);

    return users;
  }

  async findOne(id: string): Promise<User> {
    this.logger.log(`Fetching user with ID ${id}`);

    const user = await this.repository.findOne({ where: { id } });

    if (user) {
      this.logger.log(`User with ID ${id} found`);

      return user;
    }

    this.logger.warn(`User with ID ${id} not found`);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user with ID ${id}`);

    await this.repository.update(id, updateUserDto);
    const updatedUser = await this.repository.findOne({ where: { id } });

    if (updatedUser) {
      this.logger.log(`User with ID ${id} updated`);

      return updatedUser;
    }

    this.logger.warn(`User with ID ${id} not found for update`);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing user with ID ${id}`);

    const result = await this.repository.delete(id);

    if (result.affected) {
      this.logger.log(`User with ID ${id} removed`);
    } else {
      this.logger.warn(`User with ID ${id} not found for removal`);
    }
  }
}
