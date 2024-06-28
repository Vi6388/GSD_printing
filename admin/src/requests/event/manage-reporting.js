import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

export async function fetchReportingListData(query) {
  const { data } = await API.post(ENDPOINTS.GET_EVENT_REPORTING, {
    eventId: query.queryKey[1]
  });
  return data;
}
