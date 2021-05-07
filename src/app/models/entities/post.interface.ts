export interface Post {
  id: number;
  user_community_id: number;
  subcategory_id: number;
  post_state_id: number;
  type: number;
  description: string;
  is_anonymous: boolean;
}
