import { City } from "../entities/city.interface";

export interface CountryAPI {
	id: number;
	name: string;
	cities: City[];
}
