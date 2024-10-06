import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JumioService {
  private readonly JUMIO_API_URL = 'https://netverify.jumio.com/api/v4/initiations';
  private readonly tokenUrl = 'https://auth.jumio.com/oauth2/token';
  private readonly apiKey = 'YOUR_API_KEY'; // Replace with your actual Jumio API Key
  private readonly apiSecret = 'YOUR_API_SECRET'; // Replace with your actual Jumio API Secret

  async getBearerToken(): Promise<string> {
    const response = await axios.post(this.tokenUrl, {
      client_id: this.apiKey,
      client_secret: this.apiSecret,
      grant_type: 'client_credentials',
    });

    return response.data.access_token;
  }

  async createVerificationSession(userDetails: any) {
    const token = await this.getBearerToken();

    const response = await axios.post(
      this.JUMIO_API_URL,
      {
        customerInternalReference: userDetails.userId,
        userReference: userDetails.email,
        country: userDetails.country,
        idType: userDetails.passportCopy,
        successUrl: 'YOUR_SUCCESS_URL',
        errorUrl: 'YOUR_ERROR_URL',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
