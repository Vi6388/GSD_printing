import { useQuery } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

export async function fetchEventProgressionRQ(query) {
  const { data } = await API.post(ENDPOINTS.GET_PROGRESSION_EVENT, {
    selectEventId: query.queryKey[1]
  });
  return data?.data;
}

export async function fetchProgressionDataRQ(query) {
  const { data } = await API.post(ENDPOINTS.GET_PROGRESSION, {
    search: query.queryKey[1],
    eventId: query.queryKey[2],
    sportId: query.queryKey[3],
    categoryId: query.queryKey[4],
    divisionId: query.queryKey[5],
    rankId: query.queryKey[6],
    year: query.queryKey[7],
    currentPage: query.queryKey[8]
  });
  return data?.data;
}

export async function fetchUpdateProgressionDataRQ(query) {
  const { data } = await API.post(ENDPOINTS.GET_UPDATE_PROGRESSION, {
    memberId: query.queryKey[1],
    categoryId: query.queryKey[2]
  });
  return data?.data;
}

export async function fetchAddProgressionInputDataRQ(query) {
  const { data } = await API.post(ENDPOINTS.GET_ADD_PROGRESSION, {
    eventId: query.queryKey[1],
    sportId: query.queryKey[2]
  });
  return data?.data;
}
