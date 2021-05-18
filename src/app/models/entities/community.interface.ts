export interface Community {
  id: number;
  owner_id: string;
  community_state_id: number;
  category_id: number;
  name: string;
  label: string;
  primary_color?: string;
  accent_color?: string;
  warn_color?: string;
  is_verified: boolean; //Has a default value of false
}
