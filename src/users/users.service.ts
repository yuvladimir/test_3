import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async fixProblems(): Promise<number> {
    try {
      const result = await this.usersRepository.update(
        {
          hasProblems: true,
        },
        {
          hasProblems: false,
        },
      );
      return result.affected;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Что-то пошло не так...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
