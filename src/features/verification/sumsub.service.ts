import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SumsubService {
  private readonly SUMSUB_API_URL = 'https://api.sumsub.com';
  private readonly tokenUrl = 'https://api.sumsub.com/resources/accessTokens'; 
  private readonly apiKey = 'YOUR_SUMSUB_API_KEY'; // Replace with your actual Sumsub API Key

  async getAccessToken(): Promise<string> {
    const headers = {
      'X-App-Token': this.apiKey,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(this.tokenUrl, {}, { headers });
    return response.data.token;
  }

  async createVerificationSession(userDetails: any): Promise<any> {
    const token = await this.getAccessToken();

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      `${this.SUMSUB_API_URL}/resources/applicants`,
      {
        externalUserId: userDetails.id, 
        email: userDetails.email,
        country: userDetails.country, 
        idDocType: userDetails.idDocType, 
        successUrl: 'YOUR_SUCCESS_URL', 
        errorUrl: 'YOUR_ERROR_URL', 
      },
      { headers },
    );

    return response.data;
  }
}
