import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';
import { toast } from 'react-toastify';

const API = customInterIceptors();

// Sport Request

async function fetchSports() {
  const { data } = await API.get(ENDPOINTS.GET_SPORT);
  return data?.data;
}
export function fetchSportdata() {
  return useQuery('get-sport', fetchSports);
}

// Sport Category Request

async function fetchSportCategories() {
  const { data } = await API.get(ENDPOINTS.GET_ALL_SPORT_CATEGORY);
  return data?.data;
}
export function fetchSportCategorydata() {
  return useQuery('get-sport-category', fetchSportCategories);
}

export async function fetchSportBySportIdCategorydataRQ(query) {
  const { data } = await API.get(ENDPOINTS.GET_ALL_SPORT_CATEGORY + query.queryKey[1]);
  return data?.data;
}

// Division Request
export async function fetchDivisionDataRQ(query) {
  const { data } = await API.get(ENDPOINTS.GET_SPORT_CATEGORY_DIVISION + query.queryKey[1]);
  return data?.data;
}

async function createSportCategoryDivisionRQ(payload) {
  const { data } = await API.post(
    ENDPOINTS.CREATE_SPORT_CATEGORY_DIVISION + payload.categoryId,
    payload
  );
  return data;
}

export function useNewSportCategoryDivision() {
  const queryClient = useQueryClient();
  return useMutation(createSportCategoryDivisionRQ, {
    onSuccess: () => {
      toast.success('Division Added Successfully');
      queryClient.invalidateQueries('division-create');
    },
    onError: () => {
      toast.error('Unable to add this Division');
    }
  });
}
async function updateSportCategoryDivisionRQ(payload) {
  const { data } = await API.put(ENDPOINTS.UPDATE_SPORT_CATEGORY_DIVISION + payload.id, payload);
  return data;
}

export function useEditSportCategoryDivision() {
  const queryClient = useQueryClient();
  return useMutation(updateSportCategoryDivisionRQ, {
    onSuccess: () => {
      toast.success('Division Edited Successfully');
      queryClient.invalidateQueries('division-update');
    },
    onError: () => {
      toast.error('Unable to edit this Division');
    }
  });
}

async function deleteSportCategoryDivisionRQ(id) {
  const { data } = await API.delete(ENDPOINTS.DELETE_SPORT_CATEGORY_DIVISION + id);
  return data;
}

export function useDeleteSportCategoryDivision() {
  const queryClient = useQueryClient();
  return useMutation(deleteSportCategoryDivisionRQ, {
    onSuccess: () => {
      toast.success('Division Deleted Successfully');
      queryClient.invalidateQueries('division-delete');
    },
    onError: () => {
      toast.error('Unable to delete this Division');
    }
  });
}

// Rank Request
// Sport Category Request

async function fetchRankAll() {
  const { data } = await API.get(ENDPOINTS.GET_SPORT_CATEGORY_RANK);
  return data?.data;
}
export function fetchRankAllData() {
  return useQuery('get-allsportcategoryrank', fetchRankAll);
}
export async function fetchRankDataRQ(query) {
  const { data } = await API.get(ENDPOINTS.GET_SPORT_CATEGORY_RANK + query.queryKey[1]);
  return data?.data;
}

async function createSportCategoryRankRQ(payload) {
  const { data } = await API.post(
    ENDPOINTS.CREATE_SPORT_CATEGORY_RANK + payload.categoryId,
    payload
  );
  return data;
}

export function useNewSportCategoryRank() {
  const queryClient = useQueryClient();
  return useMutation(createSportCategoryRankRQ, {
    onSuccess: () => {
      toast.success('Rank Added Successfully');
      queryClient.invalidateQueries('rank-create');
    },
    onError: () => {
      toast.error('Unable to add this Rank');
    }
  });
}
async function updateSportCategoryRankRQ(payload) {
  const { data } = await API.put(ENDPOINTS.UPDATE_SPORT_CATEGORY_RANK + payload.id, payload);
  return data;
}

export function useEditSportCategoryRank() {
  const queryClient = useQueryClient();
  return useMutation(updateSportCategoryRankRQ, {
    onSuccess: () => {
      toast.success('Rank Edited Successfully');
      queryClient.invalidateQueries('rank-update');
    },
    onError: () => {
      toast.error('Unable to edit this Rank');
    }
  });
}

async function deleteSportCategoryRankRQ(id) {
  const { data } = await API.delete(ENDPOINTS.DELETE_SPORT_CATEGORY_RANK + id);
  return data;
}

export function useDeleteSportCategoryRank() {
  const queryClient = useQueryClient();
  return useMutation(deleteSportCategoryRankRQ, {
    onSuccess: () => {
      toast.success('Rank Deleted Successfully');
      queryClient.invalidateQueries('rank-delete');
    },
    onError: () => {
      toast.error('Unable to delete this Rank');
    }
  });
}
