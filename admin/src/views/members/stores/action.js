import { toast } from 'react-toastify';
import * as api from './api';

import {
  // add
  memberContactFetchStart,
  memberContactFetchSuccess,
  memberContactFetchError
} from './reducer';

// Fetch Member List
export const memberFetchAction = (options) => async (dispatch) => {
  try {
    dispatch(memberContactFetchStart());
    const { data } = await api.memberFetch();
    dispatch(memberContactFetchSuccess(data.data));
  } catch (error) {
    dispatch(memberContactFetchError(error));
  }
};

// Fetch Member Rank List
export const getAllMemberRanksAction = () => async () => {
  try {
    const { data } = await api.fetchAllMemberRanks();
    return data?.data;
  } catch (error) {}
};

export const getMemberRankByIdAction = (id) => async () => {
  try {
    const { data } = await api.fetchMemberRankById(id);
    return data?.data;
  } catch (error) {}
};

export const createMemberRankAction = (payload, name, refresh) => async () => {
  try {
    const { data } = await api.createMemberRank(payload);
    if (data.success) {
      toast.success(`${name} Rank Promted Successfully`);
      refresh();
    } else {
      toast.error(`Unable to Promte ${name} 's Rank`);
    }
  } catch (error) {}
};

export const updateMemberRankAction = (id, payload, name, refresh) => async () => {
  try {
    const { data } = await api.updateMemberRank(id, payload);
    if (data.success) {
      toast.success(`${name} Promted Successfully`);
      refresh();
    } else {
      toast.error(`Unable to promote  ${name} 's Rank`);
    }
  } catch (error) {}
};

export const promoteMemberRankAction = (promoteData, payload, refetch) => async () => {
  try {
    const { data } = await api.promoteMemberRank(promoteData.memberRankId, payload);
    if (data.success) {
      refetch();
      toast.success(
        `${promoteData.sportName}'s  ${promoteData.categoryName} is promoted to ${promoteData.rankName} Successfully`
      );
    } else {
      toast.error(
        `Unable to promote ${promoteData.rankName} in  ${promoteData.sportName}'s  ${promoteData.categoryName}`
      );
    }
  } catch (error) {}
};

export const dropMemberRankAction = (promoteData, payload, refetch) => async () => {
  try {
    const { data } = await api.dropMemberRank(promoteData.memberRankId, payload);
    if (data.success) {
      refetch();
      toast.success(
        `${promoteData.sportName}'s  ${promoteData.categoryName} is Droped to ${promoteData.rankName} Successfully`
      );
    } else {
      toast.error(
        `Unable to Drop ${promoteData.rankName} in  ${promoteData.sportName}'s  ${promoteData.categoryName}`
      );
    }
  } catch (error) {}
};

export const removeMemberRankAction =
  (id, name, memberRankAllDataRefetch, progressionSearchDataRefresh) => async () => {
    try {
      const { data } = await api.removeMemberRank(id);
      if (data.success) {
        toast.success(`${name}'s Rank Deleted Successfully`);
        memberRankAllDataRefetch();
        progressionSearchDataRefresh ? progressionSearchDataRefresh() : null;
      } else {
        toast.error(`Unable to delete ${name}'s Rank`);
      }
    } catch (error) {}
  };
