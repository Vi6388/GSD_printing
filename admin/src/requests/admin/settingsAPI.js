import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getBasicInfo() {
    const { data } = await API.get(ENDPOINTS.GET_ADMIN_BASIC_INFO);
    return data;
}
export function getBasicInfoData() {
    return getBasicInfo();
}

async function resetPassword(payload) {
  const { data } = await API.post(ENDPOINTS.RESET_PASSWORD, payload);
    return data;
}

export function resetPasswordData(payload) {
  return resetPassword(payload);
}