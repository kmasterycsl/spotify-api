import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likeable } from './likeable.entity';

@Injectable()
export class LikeableService {
  constructor(
    @InjectRepository(Likeable)
    private likeablesRepository: Repository<Likeable>,
  ) {}
}
