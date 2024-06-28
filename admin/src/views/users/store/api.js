import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const fetchUserData = () => {
  return API.get('/auth/all_user_details');
};

export const fetchUserId = (id) => {
  return API.get('/auth/particular_user/' + id);
};

// Update Users Type List
export const editUserType = (payload) => {
  return API.put('/user/change-user-type', payload);
};
