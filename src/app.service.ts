import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class AppService {
  constructor(private readonly configureService: ConfigService) {}
  getHello(): string {
    const test = AWS.config.credentials;
    console.log(test.secretAccessKey);
    return 'sfsdf';
  }
}
