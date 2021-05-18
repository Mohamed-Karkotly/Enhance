export interface CommunityRole {
  id: number;
  role_id: number;
  community_id: number;
  role: string;
  priority: number;
  restrictions?: any;
}
