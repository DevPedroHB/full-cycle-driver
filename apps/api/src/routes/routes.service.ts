import { DirectionsService } from "@/maps/directions/directions.service";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateRouteDto } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";

@Injectable()
export class RoutesService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly directionsService: DirectionsService,
	) {}

	async create({ name, sourceId, destinationId }: CreateRouteDto) {
		const { available_travel_modes, geocoded_waypoints, routes, request } =
			await this.directionsService.getDirections(sourceId, destinationId);

		const legs = routes[0].legs[0];

		return await this.prismaService.route.create({
			data: {
				name,
				source: {
					name: legs.start_address,
					location: {
						lat: legs.start_location.lat,
						lng: legs.start_location.lng,
					},
				},
				destination: {
					name: legs.end_address,
					location: {
						lat: legs.end_location.lat,
						lng: legs.end_location.lng,
					},
				},
				duration: legs.duration.value,
				distance: legs.distance.value,
				directions: JSON.parse(
					JSON.stringify({
						available_travel_modes,
						geocoded_waypoints,
						routes,
						request,
					}),
				),
			},
		});
	}

	findAll() {
		return this.prismaService.route.findMany();
	}

	findOne(id: string) {
		return this.prismaService.route.findUniqueOrThrow({
			where: { id },
		});
	}

	update(id: number, updateRouteDto: UpdateRouteDto) {
		return `This action updates a #${id} route`;
	}

	remove(id: number) {
		return `This action removes a #${id} route`;
	}
}
