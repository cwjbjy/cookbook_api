import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class FoodSchema {
  [x: string]: any;
  @Prop()
  name: string;

  @Prop()
  describe: string;

  @Prop()
  burden: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  num: number;
}

@Schema()
export class Market {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop([FoodSchema])
  foods: [FoodSchema];
}

export type MarketDocument = HydratedDocument<Market>;

export const MarketSchema = SchemaFactory.createForClass(Market);
