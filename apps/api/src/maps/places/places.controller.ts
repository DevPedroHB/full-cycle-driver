import { Controller, Get, Query } from "@nestjs/common";
import { PlacesService } from "./places.service";

@Controller("places")
export class PlacesController {
	constructor(private readonly placesService: PlacesService) {}

	@Get()
	findPlaces(@Query("input") input: string) {
		return this.placesService.findPlaces(input);
	}
}
