import { MapsModule } from "@/maps/maps.module";
import { Module } from "@nestjs/common";
import { RoutesController } from "./routes.controller";
import { RoutesService } from "./routes.service";
import { RoutesDriverService } from './routes-driver/routes-driver.service';

@Module({
	imports: [MapsModule],
	controllers: [RoutesController],
	providers: [RoutesService, RoutesDriverService],
})
export class RoutesModule {}
