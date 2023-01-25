import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guard/jwt-login.guard';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { imageConfig } from './interceptors/image-interceptor.config';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', imageConfig),
    CurrentUserInterceptor,
  )
  create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req,
  ) {
    if (image) createNewsDto.image_path = image.path.slice(7);
    createNewsDto.user = req.user;
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.newsService.findAll(query.page, query.perPage, query.search);
  }

  @Get('last')
  findLast() {
    return this.newsService.findLast();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', imageConfig),
    CurrentUserInterceptor,
  )
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req,
  ) {
    updateNewsDto.image_path = image ? image.path.slice(7) : null;
    updateNewsDto.user = req.user;
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
