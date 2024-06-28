import { customInterIceptors } from '../../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const fetchUserPermission = () => {
  return API.get('/permission', { params: { userType: 'user' } });
};
export const fetchAllLinks = () => {
  return API.get('/default-element');
};

export const fetchOperatorPermission = () => {
  return API.get('/permission', { params: { userType: 'operator' } });
};

export const savePermission = (payload) => {
  return API.post('/permission', payload);
};

export const saveModule = (payload) => {
  return API.post('/default-element', payload);
};
