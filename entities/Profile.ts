import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
