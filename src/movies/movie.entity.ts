import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Director } from '../directors/director.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Director, director => director.movies)
  director: Director;
}