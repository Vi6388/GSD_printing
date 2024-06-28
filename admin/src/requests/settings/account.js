import { useQuery } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

async function fetchUserProfile() {
  const data = await API.get(ENDPOINTS.GET_ADMIN_INFO_API);
  return data;
}
export function fetchUserProfileData() {
  // return useQuery('get-user-profile', fetchUserProfile);
  return fetchUserProfile();
}
