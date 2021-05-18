export interface UserCommunity {
  id: number;
  community_id: number;
  user_id: number;
  user_community_role_id: number;
  community_name: string;
  primary_color?: string;
  accent_color?: string;
  warn_color?: string;
  community_rating?: number;
  user_rating?: number;
  priority: number; //Has a default value of 5
  restrictions?: any;
}
