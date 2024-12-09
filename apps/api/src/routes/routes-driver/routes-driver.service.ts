import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoutesDriverService {
	constructor(private readonly prismaService: PrismaService) {}

	processRoute(dto: { routeId: string; lat: number; lng: number }) {
		return this.prismaService.routeDriver.upsert({
			include: {
				route: true,
			},
			where: { routeId: dto.routeId },
			update: {
				points: {
					push: {
						location: {
							lat: dto.lat,
							lng: dto.lng,
						},
					},
				},
			},
			create: {
				routeId: dto.routeId,
				points: {
					set: {
						location: {
							lat: dto.lat,
							lng: dto.lng,
						},
					},
				},
			},
		});
	}
}
