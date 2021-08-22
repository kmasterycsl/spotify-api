import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AssetEntity, IImageMeta } from 'src/modules/asset/entities/asset.entity';
import { Asset } from 'src/modules/asset/models/asset.model';
import { Paginated } from '../args/Paginated';

@ObjectType()
export class Artist {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  biography: string;

  @Field()
  isVerified: boolean;

  @Field(type => Asset)
  coverImage: AssetEntity<IImageMeta>;

  @Field(type => Asset)
  avatarImage: AssetEntity<IImageMeta>;
}

@ObjectType()
export class PaginatedArtist extends Paginated(Artist) {}