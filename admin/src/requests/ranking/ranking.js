import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

export async function fetchSearchRankingDataRQ(query) {
  const { data } = await API.post(ENDPOINTS.GET_RANKING, {
    // search: query.queryKey[1],
    // eventId: query.queryKey[2],
    // sportId: query.queryKey[3],
    // categoryId: query.queryKey[4],
    // divisionId: query.queryKey[5],
    // rankId: query.queryKey[6],
    // year: query.queryKey[7],
    // currentPage: query.queryKey[8]
  });
  return data?.data;
}
