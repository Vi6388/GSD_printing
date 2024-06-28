import { useQuery } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function fetchUsers() {
  const { data } = await API.get(ENDPOINTS.GET_USER_TABLE_DATA);
  return data?.data;
}
export function fetchUsersdata() {
  return useQuery('get-users', fetchUsers);
}

async function fetchUsersById(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_USER_BY_ID}/${id}`);
  return data?.data;
}

export function fetchUserById(id) {
  return useQuery(['get-users', id], () => fetchUsersById(id));
}

//update user
export async function updateUser(id, payload) {
  const { data } = await API.put(ENDPOINTS.UPDATE_USER + id, payload);
  if (data) {
    toast.success('Member update successful');
  }
  return data;
}
