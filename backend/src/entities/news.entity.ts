import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  header: string;
  @Column({
    nullable: false,
  })
  announce: string;
  @Column({
    nullable: false,
  })
  description: string;
  @Column({
    nullable: true,
  })
  image_path: string;
  @Column({
    default: 0,
  })
  views: number;
  @ManyToOne(() => User, (user) => user.news)
  user: User;
  @Column()
  created_at: Date;

  constructor(
    header: string,
    announce: string,
    description: string,
    created_at: Date,
    image_path: string = null,
  ) {
    this.header = header;
    this.announce = announce;
    this.description = description;
    this.created_at = created_at;
    this.image_path = image_path;
  }
}
