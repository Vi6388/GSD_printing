import { useQuery } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';
import { toast } from 'react-toastify';

const API = customInterIceptors();

async function fetchMembers() {
  const { data } = await API.get(ENDPOINTS.GET_MEMBER);
  return data?.data;
}
export function fetchMemberdata() {
  return useQuery('get-costumer', fetchMembers);
}

async function fetchMember(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_MEMBER_BY_ID}/${id}`);
  return data?.data;
}

export function fetchMemberById(id) {
  return useQuery(['get-member', id], () => fetchMember(id));
}

async function fetchMemberRanks() {
  const { data } = await API.get(ENDPOINTS.GET_MEMBER_RANK);
  return data?.data;
}
export function fetchMemberRankData() {
  return useQuery('get-member-ranks', fetchMemberRanks);
}

async function fetchMemberRank(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_MEMBER_RANK_BY_ID}/${id}`);
  return data?.data;
}

export function fetchMemberRankById(id) {
  return useQuery(['get-member-rank', id], () => fetchMemberRank(id));
}

//add member
export const addMember = (payload) => {
  return async () => {
    try {
      const { data } = await API.post(ENDPOINTS.ADD_MEMBER, payload);
      if (data.success === true) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
};

//update member
export async function updateMember(id, payload) {
  const { data } = await API.put(ENDPOINTS.UPDATE_MEMBER + id, payload);
  if (data) {
    toast.success('Member update successful');
  }
  return data;
}

async function fetchMemberToMemberships(query) {
  const { data } = await API.get(`${ENDPOINTS.GET_MEMBER_TO_MEMBERSHIP}/` + query?.queryKey[1]);
  return data?.data;
}

export function fetchMemberMembershipById(id) {
  const data = useQuery(['get-member-by-membership', id], fetchMemberToMemberships);
  return data;
}
