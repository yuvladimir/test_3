import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('Users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Post('fix_problems')
  async fixProblems(): Promise<{ usersWithProblemsCount: number }> {
    const usersWithProblemsCount = await this.appService.fixProblems();
    return {
      usersWithProblemsCount,
    };
  }
}
