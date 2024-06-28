import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

// fetch Client Contact List
export const memberFetch = (options) => {
  return API.get('/member/', {
    params: options
  });
};

// Rank Member
export const fetchAllMemberRanks = () => {
  return API.get('/member-rank/');
};
export const fetchMemberRankById = (id, data) => {
  return API.get('/member-rank/' + id, data);
};

export const createMemberRank = (data) => {
  return API.post('/member-rank/create_rank/', data);
};

export const updateMemberRank = (id, data) => {
  return API.put('/member-rank/update_rank/' + id, data);
};

export const promoteMemberRank = (id, data) => {
  return API.put('/member-rank/promote_rank/' + id, data);
};

export const dropMemberRank = (id, data) => {
  return API.put('/member-rank/drop_rank/' + id, data);
};

export const removeMemberRank = (id) => {
  return API.delete('/member-rank/remove_rank/' + id);
};
