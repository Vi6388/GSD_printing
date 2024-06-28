import { useQuery } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { toast } from 'react-toastify';
import { queryCache } from 'react-query';

const API = customInterIceptors();

// ** Get Memberships
async function getMemberships() {
  const { data } = await API.get(ENDPOINTS.GET_MEMBERSHIPS);
  return data?.data;
}
export function getMemberShipList() {
  return useQuery('memberships', getMemberships);
}

async function fetchMembership() {
  const { data } = await API.get(ENDPOINTS.GET_MEMBERSHIP);
  return data?.data;
}
export function getMemberShip() {
  return useQuery('get-membership-type', fetchMembership);
}

async function fetchMembershipData() {
  const { data } = await API.get(ENDPOINTS.POST_MEMBERSHIP_MEMBER);
  return data?.data;
}
export function getMemberShipData() {
  return useQuery('get-membership', fetchMembershipData);
}

async function fetchMembershipById(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_MEMBERSHIP_BY_ID}${id}`);
  return data?.data;
}
export function memberShipById(id) {
  return useQuery(['get-membership-type', id], () => fetchMembershipById(id));
}

export async function addMemberShip(payload) {
  try {
    const { data } = await API.post(ENDPOINTS.POST_MEMBERSHIP, payload);
    if (data.success === true) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
}

export async function editMemberShip(id, payload) {
  try {
    const { data } = await API.put(ENDPOINTS.EDIT_MEMBERSHIP + id, payload);
    if (data.success === true) {
      toast.success(data.message ? data.message : 'Membership Updated');
      queryCache.invalidateQueries('get-membership-type');
      getMemberShip().refetch();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
}

//membership to member
export async function addMemberShipToMember(payload, history, url) {
  try {
    const { data } = await API.post(ENDPOINTS.POST_MEMBERSHIP_MEMBER, payload);
    if (data.success === true) {
      await history.push(`${url}`);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
}

async function fetchEvent(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_EVENTS_DATA}/${id}`);
  return data;
}

export function fetchEventById(id) {
  return useQuery(['get-member', id], () => fetchEvent(id));
}
