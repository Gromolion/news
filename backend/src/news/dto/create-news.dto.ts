import { User } from '../../entities/user.entity';

export class CreateNewsDto {
  header: string;
  announce: string;
  description: string;
  image_path: string;
  user: User;
  views: number;
}
