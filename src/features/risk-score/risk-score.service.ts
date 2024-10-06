import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RiskScoreService {
  private readonly logger = new Logger(RiskScoreService.name);

  calculateRiskScore(user: any): number {
    this.logger.log(`Calculating risk score for user with ID: ${user.id}`);
    
    let score = 0;

    score += this.calculateKycRisk(user.kycLevel);

    score += this.calculateWalletRisk(user.walletStatus);

    score += this.calculateSanctionsRisk(user.sanctionsCheck);

    score += this.calculateTransactionRisk(user.transactionVolume);

    score += this.applyAdditionalRules(user);

    this.logger.log(`Final risk score for user with ID: ${user.id} is ${score}`);
    return score;
  }

  private calculateKycRisk(kycLevel: number): number {
    let risk = 0;
    if (kycLevel === 1) {
      risk = 20;
      this.logger.log('KYC Level 1 - High risk (+20)');
    } else if (kycLevel === 2) {
      risk = 10;
      this.logger.log('KYC Level 2 - Medium risk (+10)');
    } else {
      this.logger.log('KYC Level 3 - Low risk (0)');
    }
    return risk;
  }

  private calculateWalletRisk(walletStatus: string): number {
    let risk = 0;
    if (walletStatus === 'flagged') {
      risk = 50;
      this.logger.warn('Wallet flagged - High risk (+50)');
    } else {
      this.logger.log('Wallet clean - No additional risk');
    }
    return risk;
  }

  private calculateSanctionsRisk(sanctionsCheck: string): number {
    let risk = 0;
    if (sanctionsCheck === 'positive') {
      risk = 70;
      this.logger.warn('Sanctions check positive - High risk (+70)');
    } else {
      this.logger.log('Sanctions check negative - No additional risk');
    }
    return risk;
  }

  private calculateTransactionRisk(transactionVolume: number): number {
    let risk = 0;
    if (transactionVolume > 10000) {
      risk = 30;
      this.logger.log('High transaction volume - Medium risk (+30)');
    } else {
      this.logger.log('Transaction volume within limits - No additional risk');
    }
    return risk;
  }

  private applyAdditionalRules(user: any): number {
    let risk = 0;
    if (user.hasExceededLimits) {
      risk = 40;
      this.logger.warn('User has exceeded limits - Medium risk (+40)');
    } else {
      this.logger.log('User within limits - No additional risk');
    }
    return risk;
  }
}
