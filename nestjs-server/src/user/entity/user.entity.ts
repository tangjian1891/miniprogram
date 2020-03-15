import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '昵称' })
  nickname: string;
  @Column({ comment: '邮箱', nullable: true })
  email: string;
  @Column({ comment: '微信的Openid', unique: true, nullable: true })
  openid: string;
  @Column({ comment: '密码', nullable: true })
  password: string;
}
