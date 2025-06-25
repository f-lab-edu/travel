export type User = {
  id: string; // UUID
  email: string;
  name: string | null;
  profile_image_url: string | null;
  provider: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
};
