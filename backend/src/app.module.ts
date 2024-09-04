import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@core/core.module';
import { StageModule } from './modules/stage/stage.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env`
		}),
		CoreModule,
		AuthModule,
		UsersModule,
		StageModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
