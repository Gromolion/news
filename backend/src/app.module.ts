import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'news',
      password: 'news',
      database: 'news',
      entities: ['./entities/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    NewsModule,
  ],
})
export class AppModule {}
