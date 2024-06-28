import { toast } from 'react-toastify';
import * as api from './api';
import {
  fetchSport,
  progressionFetchAction,
  addProgressionSuccess,
  addProgressionFail,
  resetAddProgressionStatus,
  deleteProgressionSuccess,
  deleteProgressionFail,
  resetDeleteProgressionStatus,
  fetchSportCategories,
  fetchProgressionCategoriesSuccess,
  fetchProgressionCategoriesFail,
  fetchProgressionCategories,
  addProgressionCategoriesSuccess,
  addProgressionCategoriesFail,
  resetAddProgressionCategoriesStatus,
  deleteProgressionCategoriesSuccess,
  deleteProgressionCategoriesFail,
  resetDeleteProgressionCategoriesStatus,
  editProgressionCategoriesSuccess,
  editProgressionCategoriesFail,
  resetEditProgressionCategoriesStatus,
  fetchProgressionCategoriesRank,
  addProgressionCategoriesRankSuccess,
  addProgressionCategoriesRankFail,
  resetAddProgressionCategoriesRankStatus,
  editProgressionCategoriesRankSuccess,
  editProgressionCategoriesRankFail,
  resetEditProgressionCategoriesRankStatus,
  deleteProgressionCategoriesRankSuccess,
  deleteProgressionCategoriesRankFail,
  resetDeleteProgressionCategoriesRankStatus,
  addRankingForSmartList,
  deleteRankingForSmartList,
  deleteCategoryForSmartList,
  fetchProgressionCategoriesDivision,
  addProgressionCategoriesDivisionSuccess,
  addProgressionCategoriesDivisionFail,
  resetAddProgressionCategoriesDivisionStatus,
  editProgressionCategoriesDivisionSuccess,
  editProgressionCategoriesDivisionFail,
  resetEditProgressionCategoriesDivisionStatus,
  deleteProgressionCategoriesDivisionSuccess,
  deleteProgressionCategoriesDivisionFail,
  resetDeleteProgressionCategoriesDivisionStatus,
  addDivisioningForSmartList,
  deleteDivisioningForSmartList,
  deleteProgressionForSmartList,
  setSmartListRankingInit,
  setSmartListDivisioningInit,
  setSmartListDivision,
  setSmartListRank
} from './reducer';
//parent progression
export const sportFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSport();
    dispatch(fetchSport(data?.data));
  } catch (error) {}
};
export const sportAddAction = (Data) => async (dispatch) => {
  try {
    const { data } = await api.addSport(Data);
    if (data.success === true) {
      toast.success('Sport Added Successfully');
    } else {
      toast.error('Unable to add this Sport');
    }
    // console.log(data);
    // if (data.success === true) {
    //   dispatch(addProgressionSuccess(true));
    // } else {
    //   dispatch(addProgressionFail(true));
    // }
    // dispatch(resetAddProgressionStatus());
    dispatch(sportFetchAction());
  } catch (error) {}
};
export const sportEditAction = (Data) => async (dispatch) => {
  try {
    const { data } = await api.editSport(Data);
    // console.log(data);
    if (data.success === true) {
      toast.success('Sport Edited Successfully');
    } else {
      toast.error('Unable to edit this Sport');
    }
    // if (data.success === true) {
    //   dispatch(addProgressionSuccess(true));
    // } else {
    //   dispatch(addProgressionFail(true));
    // }
    // dispatch(resetAddProgressionStatus());
    dispatch(sportFetchAction());
  } catch (error) {}
};
export const sportDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteSport(id);
    // console.log(id);

    if (data.success === true) {
      toast.success('Sport Edited Successfully');
    } else {
      toast.error('Unable to edit this Sport');
    }
    // if (data.success === true) {
    //   dispatch(deleteProgressionSuccess(true));
    // } else {
    //   dispatch(deleteProgressionFail(true));
    // }
    // dispatch(resetDeleteProgressionStatus());
    dispatch(sportFetchAction());
  } catch (error) {}
};

//progression categories
export const sportCategoriesFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSportCategories();
    dispatch(fetchSportCategories(data?.data));
  } catch (error) {}
};
export const categoriesAddAction = (categoriesData) => async (dispatch) => {
  try {
    const { data } = await api.addSportCategories(categoriesData);
    if (data.success === true) {
      toast.success('Category Added Successfully');
    } else {
      toast.error('Unable to add this Category');
    }
    // if (data.success === true) {
    //   dispatch(fetchProgressionCategoriesSuccess(true));
    //   dispatch(progressionFetchAction());
    // } else {
    //   dispatch(fetchProgressionCategoriesFail(true));
    // }
    dispatch(sportFetchAction());
  } catch (error) {}
};
export const categoriesEditAction = (categoriesData) => async (dispatch) => {
  try {
    const { data } = await api.editSportCategories(categoriesData);
    if (data.success === true) {
      toast.success('Category Edited Successfully');
    } else {
      toast.error('Unable to edit this Category');
    }
    // console.log(categoriesData);
    // if (data.success === true) {
    //   dispatch(addProgressionSuccess(true));
    // } else {
    //   dispatch(addProgressionFail(true));
    // }
    // dispatch(resetAddProgressionStatus());
    dispatch(sportFetchAction());
  } catch (error) {}
};
export const categoriesDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteSportCategories(id);
    // console.log(id);
    if (data.success === true) {
      toast.success('Category Deleted Successfully');
    } else {
      toast.error('Unable to delete this Category');
    }

    // if (data.success === true) {
    //   dispatch(deleteProgressionSuccess(true));
    // } else {
    //   dispatch(deleteProgressionFail(true));
    // }
    // dispatch(resetDeleteProgressionStatus());
    dispatch(sportFetchAction());
  } catch (error) {}
};

//progression categories
export const progressionCategoriesFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProgressionCategories();
    dispatch(fetchProgressionCategories(data?.data));
  } catch (error) {}
};
export const progressionCategoriesAddAction = (categoriesData) => async (dispatch) => {
  try {
    const { data } = await api.addProgressionCategories(categoriesData);
    // console.log(data);
    if (data.success === true) {
      dispatch(addProgressionCategoriesSuccess(true));
      dispatch(progressionFetchAction());
    } else {
      dispatch(addProgressionCategoriesFail(true));
    }
    dispatch(resetAddProgressionCategoriesStatus());
  } catch (error) {}
};
export const progressionCategoriesDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProgressionCategories(id);
    if (data.success === true) {
      dispatch(deleteProgressionCategoriesSuccess(true));
    } else {
      dispatch(deleteProgressionCategoriesFail(true));
    }
    dispatch(resetDeleteProgressionCategoriesStatus());
    dispatch(progressionFetchAction());
  } catch (error) {}
};
export const progressionCategoriesEditAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editProgressionCategories(payload);
    if (data.success === true) {
      dispatch(editProgressionCategoriesSuccess());
    } else {
      dispatch(editProgressionCategoriesFail());
    }
    dispatch(resetEditProgressionCategoriesStatus());
    dispatch(progressionFetchAction());
  } catch (error) {}
};
//categories  ranks
export const progressionCategoriesRankFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProgressionCategoriesRank(id);
    dispatch(fetchProgressionCategoriesRank(data?.data));
  } catch (error) {}
};
export const progressionCategoriesRankResetAction = () => async (dispatch) => {
  try {
    const { data } = await api.addProgressionCategoriesRank(formdata);
    dispatch(progressionCategoriesRankFetchAction(formdata?.id));
  } catch (error) {}
};
export const progressionCategoriesRankAddAction =
  (formdata, categoryId, rankTabledataRefetch) => async (dispatch) => {
    try {
      const { data } = await api.addProgressionCategoriesRank(formdata, categoryId);
      if (data.success) {
        toast.success('Rank Created Successfully');
        rankTabledataRefetch();
        // dispatch(addProgressionCategoriesRankSuccess());
      } else {
        toast.error('Unable to add this Rank');
        // dispatch(addProgressionCategoriesRankFail());
      }
      dispatch(resetAddProgressionCategoriesRankStatus());
      dispatch(progressionCategoriesRankFetchAction(categoryId));
    } catch (error) {}
  };
export const progressionCategoriesRankEditAction =
  (formdata, rankId, rankTabledataRefetch) => async (dispatch) => {
    try {
      const { data } = await api.editProgressionCategoriesRank(formdata, rankId);
      if (data.success) {
        toast.success('Rank Edited Successfully');
        rankTabledataRefetch();
        // dispatch(editProgressionCategoriesRankSuccess());
      } else {
        toast.error('Unable to edit this Rank');
        // dispatch(editProgressionCategoriesRankFail());
      }
      // dispatch(resetEditProgressionCategoriesRankStatus());
      // dispatch(progressionCategoriesRankFetchAction(categoryId));
    } catch (error) {}
  };
export const progressionCategoriesRankDeleteAction =
  (id, rankTabledataRefetch) => async (dispatch) => {
    try {
      const { data } = await api.deleteProgressionCategoriesRank(id);
      if (data.success) {
        toast.success('Rank Deleted Successfully');
        rankTabledataRefetch();
        // dispatch(deleteProgressionCategoriesRankSuccess());
      } else {
        toast.error('Unable to delete this Rank');
        // dispatch(deleteProgressionCategoriesRankFail());
      }
      // dispatch(resetDeleteProgressionCategoriesRankStatus());
      // dispatch(progressionCategoriesRankFetchAction(categoryId));
    } catch (error) {}
  };

export const addRankForSmartListAction = (data) => async (dispatch) => {
  try {
    dispatch(addRankingForSmartList(data));
  } catch (error) {}
};

export const deleteRankForSmartListAction = (data) => async (dispatch) => {
  try {
    dispatch(deleteRankingForSmartList(data));
  } catch (error) {}
};

export const deleteCategoryForSmartListAction = (data) => async (dispatch) => {
  try {
    dispatch(deleteCategoryForSmartList(data));
  } catch (error) {}
};

//categories  divisions
export const progressionCategoriesDivisionFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProgressionCategoriesDivision(id);
    dispatch(fetchProgressionCategoriesDivision(data?.data));
  } catch (error) {}
};
export const progressionCategoriesDivisionResetAction = () => async (dispatch) => {
  try {
    const { data } = await api.addProgressionCategoriesDivision(formdata);
    dispatch(progressionCategoriesDivisionFetchAction(formdata?.id));
  } catch (error) {}
};
export const progressionCategoriesDivisionAddAction =
  (formdata, categoryId, divisionTableDataRefetch) => async (dispatch) => {
    try {
      const { data } = await api.addProgressionCategoriesDivision(formdata, categoryId);
      if (data.success) {
        toast.success('Division Created Successfully');
        divisionTableDataRefetch();
        // dispatch(addProgressionCategoriesDivisionSuccess());
      } else {
        toast.error('Unable To Create Division');
        // dispatch(addProgressionCategoriesDivisionFail());
      }
      // dispatch(resetAddProgressionCategoriesDivisionStatus());
      // dispatch(progressionCategoriesDivisionFetchAction(categoryId));
    } catch (error) {}
  };
export const progressionCategoriesDivisionEditAction =
  (formdata, divisionId, divisionTableDataRefetch) => async (dispatch) => {
    try {
      const { data } = await api.editProgressionCategoriesDivision(formdata, divisionId);
      if (data.success) {
        toast.success('Division Edited Successfully');
        divisionTableDataRefetch();
        // dispatch(editProgressionCategoriesDivisionSuccess());
      } else {
        toast.error('Unable To Edit Division');
        // dispatch(editProgressionCategoriesDivisionFail());
      }
      // dispatch(resetEditProgressionCategoriesDivisionStatus());
      // dispatch(progressionCategoriesDivisionFetchAction(categoryId));
    } catch (error) {}
  };
export const progressionCategoriesDivisionDeleteAction =
  (divisionId, divisionTableDataRefetch) => async (dispatch) => {
    try {
      const { data } = await api.deleteProgressionCategoriesDivision(divisionId);
      if (data.success) {
        toast.success('Division Deleted Successfully');
        divisionTableDataRefetch();
        // dispatch(deleteProgressionCategoriesDivisionSuccess());
      } else {
        toast.error('Unable To Delete Division');
        // dispatch(deleteProgressionCategoriesDivisionFail());
      }
      // dispatch(resetDeleteProgressionCategoriesDivisionStatus());
      // dispatch(progressionCategoriesDivisionFetchAction(categoryId));
    } catch (error) {}
  };

export const addDivisionForSmartListAction = (data) => async (dispatch) => {
  try {
    dispatch(addDivisioningForSmartList(data));
  } catch (error) {}
};

export const deleteDivisionForSmartListAction = (data) => async (dispatch) => {
  try {
    dispatch(deleteDivisioningForSmartList(data));
  } catch (error) {}
};

export const deleteProgressionForSmartListAction = (data) => async (dispatch) => {
  try {
    dispatch(deleteProgressionForSmartList(data));
  } catch (error) {}
};

export const setSmartListRankingInitial = () => async (dispatch) => {
  try {
    dispatch(setSmartListRankingInit());
  } catch (error) {}
};
export const setSmartListDivisioningInitial = () => async (dispatch) => {
  try {
    dispatch(setSmartListDivisioningInit());
  } catch (error) {}
};
export const setSmartListActionDivision = (data) => async (dispatch) => {
  try {
    dispatch(setSmartListDivision(data));
  } catch (error) {}
};

export const setSmartListActionRank = (data) => async (dispatch) => {
  try {
    dispatch(setSmartListRank(data));
  } catch (error) {}
};
