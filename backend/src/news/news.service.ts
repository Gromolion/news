import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { News } from '../entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}
  async create(createNewsDto: CreateNewsDto) {
    const news = new News(
      createNewsDto.header,
      createNewsDto.announce,
      createNewsDto.description,
      new Date(),
    );

    news.image_path = createNewsDto.image_path;
    news.user = createNewsDto.user;

    await this.newsRepository.save(news);
  }

  async findAll(page: number, perPage: number, search?: string) {
    const skip = page * perPage - perPage;

    const query = this.newsRepository
      .createQueryBuilder('news')
      .take(perPage)
      .skip(skip);

    if (search) {
      query.where([
        { header: Like('%' + search + '%') },
        { announce: Like('%' + search + '%') },
        { description: Like('%' + search + '%') },
      ]);
    }

    return {
      news: await query.getMany(),
      count: await this.newsRepository.count(),
      b: `${page}            ${perPage}`,
      a: `${skip}            ${perPage}`,
    };
  }

  async findOne(id: number) {
    return await this.newsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async findLast() {
    return await this.newsRepository.find({
      order: {
        created_at: 'DESC',
      },
      skip: 0,
      take: 1,
    });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const setJson = {};
    if (updateNewsDto.header) setJson['header'] = updateNewsDto.header;
    if (updateNewsDto.announce) setJson['announce'] = updateNewsDto.announce;
    if (updateNewsDto.description)
      setJson['description'] = updateNewsDto.description;
    if (updateNewsDto.image_path)
      setJson['image_path'] = updateNewsDto.image_path;
    if (updateNewsDto.views) setJson['views'] = updateNewsDto.views;

    await this.newsRepository
      .createQueryBuilder('news')
      .update(News)
      .where('id = :id', { id: id })
      .andWhere('userId = :userId', { userId: updateNewsDto.user.id })
      .set(setJson)
      .execute();

    return id;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
