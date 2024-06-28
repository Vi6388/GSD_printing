import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

export async function fetchEventRegistrantByRegistrantTypeData(query) {
  const { data } = await API.post(ENDPOINTS.GET_EVENT_REGISTRANT_BY_TYPE, {
    eventId: query.queryKey[1],
    registrantType: query.queryKey[2]
  });
  return data;
}
export async function fetchEventRegistrantData(query) {
  const { data } = await API.post(ENDPOINTS.GET_EVENT_REGISTRANT, {
    eventId: query.queryKey[1]
  });
  return data;
}
