export interface User {
  id: number;
  city_id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  profile_image: string;
  bio: string;
  profession: string;
  invitation_option_enabled: boolean;
  age: number;
  joined_at: Date;
}
