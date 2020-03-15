import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favor')
export class FavorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  uid: number;
  @Column()
  art_id: number;
  @Column()
  type: number;
  @CreateDateColumn()
  create_time;
}
