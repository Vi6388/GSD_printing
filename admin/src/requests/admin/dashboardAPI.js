import { useQuery } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getDashboard() {
    const { data } = await API.get(ENDPOINTS.GET_DASHBOARD_DATA);
    return data;
}
export function getDashboardData() {
    return getDashboard();
}