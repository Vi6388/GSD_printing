import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { toast } from 'react-toastify';

const API = customInterIceptors();

async function fetchLocation() {
  const { data } = await API.get(ENDPOINTS.GET_LOCATION_DATA);
  return data?.data;
}
export function fetchLocationdata() {
  return useQuery('get-location', fetchLocation);
}

async function fetchLocationById(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_LOCATION_BY_ID}${id}`);
  return data?.data;
}
export function locationById(id) {
  return useQuery(['get-location', id], () => fetchLocationById(id));
}

export async function addLocation(payload) {
  try {
    const { data } = await API.post(ENDPOINTS.ADD_LOCATION, payload);
    if (data.success === true) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
}

// Update Location
async function updateLocationRQ({ locationID, formData }) {
  const { data } = await API.put(`${ENDPOINTS.UPDATE_LOCATION}${locationID}`, formData);
  return data;
}
export function useUpdateLocation() {
  const queryClient = useQueryClient();
  return useMutation(updateLocationRQ, {
    onSuccess: () => {
      toast.success('Location Updated Successfully');
      queryClient.invalidateQueries('get-location');
    },
    onError: () => {
      toast.error('Unable to update this Location!');
    }
  });
}
