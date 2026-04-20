import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import configuration from './config';
import { MarketModule } from './module/market/market.module';

const { db } = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    MongooseModule.forRoot(
      `mongodb://${db.mongo.username}${db.mongo.username ? ':' : ''}${db.mongo.password}${db.mongo.password ? '@' : ''}${db.mongo.host}:${db.mongo.port}/${db.mongo.database}`,
    ),
    MarketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
