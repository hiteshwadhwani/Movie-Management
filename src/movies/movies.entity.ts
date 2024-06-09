import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Genre } from './movies.dto';

@Entity('user')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'text', unique: true })
  title: string;

  @Column({ name: 'release_data', type: 'date' })
  release_data: Date;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'genre', type: 'enum', enum: Genre })
  genre: Genre;

  @Column({ name: 'rating_count', type: 'int', default: 0 })
  rating_count: number;

  @Column({ name: 'rating_sum', type: 'int', default: 0 })
  rating_sum: number;

  @Column({ name: 'rating', type: 'int', default: 0 })
  rating: number;
}
