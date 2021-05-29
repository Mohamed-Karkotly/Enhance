import { Country } from "../entities/country.interface";

export interface CityAPI {
	id: number;
	name: string;
	country: Country;
}
