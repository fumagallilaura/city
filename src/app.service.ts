import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Health(): string {
    return 'Ok';
  }
}
