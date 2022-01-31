import { Profile } from '../../interface/Profile';

interface ProfileResponse {
  success?: {
    profile: Profile;
  };
  error?: string;
}

export const getProfile = async (id: string): Promise<ProfileResponse> => {
  const response = await fetch('/profile/load/' + id);
  return response.json();
};
