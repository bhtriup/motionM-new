import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from './tenancy/tenancy.module';
import { FrontModule } from './front/front.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    // OrganizationModule,
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
