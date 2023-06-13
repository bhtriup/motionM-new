import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from './tenancy/tenancy.module';
import { AuthModule } from './auth/auth.module';
import { FrontModule } from './front/front.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    // UserModule,
    // OrganizationModule,
    // FriendModule,
    AuthModule,
    // CodeModule,
    // ChatModule,
    // RoomModule,
    // SettingModule,
    // TestModule,
    TenancyModule,
    FrontModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
