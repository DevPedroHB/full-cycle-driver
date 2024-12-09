import {
	Client as GoogleMapsClient,
	PlaceInputType,
} from "@googlemaps/google-maps-services-js";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PlacesService {
	constructor(
		private readonly googleMapsClient: GoogleMapsClient,
		private readonly configService: ConfigService,
	) {}

	async findPlaces(input: string) {
		const { data } = await this.googleMapsClient.findPlaceFromText({
			params: {
				input,
				inputtype: PlaceInputType.textQuery,
				fields: ["place_id", "formatted_address", "geometry", "name"],
				key: this.configService.get("GOOGLE_MAPS_API_KEY"),
			},
		});

		return data;
	}
}
