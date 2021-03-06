import { CityAPI } from '../API/city-api.interface';
import { Settings } from './settings.interface';
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  profileImage: string;
  bio?: string;
  profession?: string;
  invitationOption: boolean;
  age: number;
  joinedAt: string;
  city: CityAPI;
  categories: any[];
  jwtToken: string;
  settings: Settings;
}
