import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AssetEntity, AssetType } from 'src/modules/asset/entities/asset.entity';

@ObjectType()
export class ImageMeta {
  @Field()
  source: string;
  
  @Field()
  width: number;
  
  @Field()
  height: number;
}

@ObjectType()
export class Asset {
  @Field(type => ID)
  id: string;

  @Field()
  type: AssetType;

  @Field(type => ImageMeta)
  meta: ImageMeta;
}

