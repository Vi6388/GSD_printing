import { useQuery } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

// fetch operator
async function fetchOperator() {
  const { data } = await API.get(ENDPOINTS.GET_OPERATOR_TABLE_DATA);
  return data?.data;
}
export function fetchOperatordata() {
  return useQuery('get-operator', fetchOperator);
}

// fetch operator by location id
async function fetchOperationByLocationIdHandler(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_OPERATOR_BY_LOCATIONID}${id}`);
  return data?.data;
}
export function fetchOperationByLocationId(id) {
  return useQuery(['get-location-operator', id], () => fetchOperationByLocationIdHandler(id));
}
