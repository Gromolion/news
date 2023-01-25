import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';
import { Role } from '../rbac/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
    nullable: false,
  })
  name: string;
  @Column({
    nullable: false,
  })
  password: string;

  @OneToMany(() => News, (news) => news.user)
  news: News[];

  @Column({
    type: 'enum',
    enum: Role,
  })
  roles: Role[];

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}
