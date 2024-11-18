import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

enum Gender {
  Male = 'male',
  Female = 'female',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column('text')
  lastName: string;

  @Column()
  age: number;

  @Column('text')
  gender: Gender;

  @Column()
  @Index()
  hasProblems: boolean;
}
