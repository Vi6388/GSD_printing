import * as api from './api';

import {
  fetchSport,
  fetchProgressionCategories,
  deleteProgressionSuccess,
  deleteProgressionFail,
  resetDeleteProgressionStatus,
  fetchProgressionFail,
  fetchProgressionStatusReset,
  fetchProgressionSuccess,
  addProgressionFail,
  addProgressionSuccess,
  resetAddProgressionStatus,
  fetchProgressionCategoriesSuccess,
  fetchProgressionCategoriesFail,
  resetFetchProgressionCategories,
  fetchProgressionCategoriesRank,
  fetchProgressionCategoriesRankFail,
  fetchProgressionCategoriesRankSuccess,
  fetchProgressionCategoriesDivision,
  fetchProgressionCategoriesDivisionFail,
  fetchProgressionCategoriesDivisionSuccess,
  fetchListEventData,
  fetchEventData,
  deleteEventData,
  createEventData,
  fetchParticularEventDataInfo,
  fetchEventDataById,
  editEventData,
  fetchSearchedEvent,
  fetchEventPointType
} from './reducer';
import { toast } from 'react-toastify';

// import { fetchEventAction } from './actions';
//
//parent progression
// export const sportFetchAction = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchSport();
//     dispatch(fetchSport(data?.data));
//   } catch (error) {}
// };
////////event
export const fetchEventAction = (payload) => async (dispatch) => {
  // console.log('fetchEventAction is running');
  const { data } = await api.fetchEventDataAPI(payload);

  dispatch(fetchEventData(data?.data[0]?.paginatedResults));
};

export const fetchParticularEventAction = (payload) => async (dispatch) => {
  const res = await api.fetchEventByIdApi(payload);
  dispatch(fetchEventDataById(res?.data));
};

export const deleteEventAction = (payload) => async (dispatch) => {
  const res = await api.deleteEventDataAPI(payload);

  if (res.status == '200') {
    await dispatch(fetchEventAction('all'));
    toast.success('Successfully Deleted Event');
  }
};
// create event
export const createEventAction = (payload, history) => async (dispatch) => {
  let eventType = payload.get('eventType');
  const res = await api.createEventDataAPI(payload);
  if (res.status == '201') {
    await dispatch(
      fetchEventAction(
        new URLSearchParams({ eventType: eventType, search: '', year: '', month: '', status: '' })
      )
    );
    toast.success('Successfully Created Event');
    history.push(`/event-view-list/${res.data.data._id.toString()}`);
  }
};
// update event
export const editParticularEventAction = (id, payload, msg) => async (dispatch) => {
  const res = await api.editEventByIdApi(id, payload);
  if (res.status == '200') {
    msg !== undefined ? toast.success(`${msg} Successfully`) : null;
    dispatch(fetchParticularEventAction(id));
  }
};
// create event
export const createEventRegistrantAction = (payload, refetch, toggle) => async (dispatch) => {
  const res = await api.createEventRegistrantDataAPI(payload);
  if (res.status == '200') {
    toast.success('Successfully Registrant member to Event');
    refetch && refetch();
    toggle && toggle();
  } else toast.warning('UnSucessfully Registrant member to Event');
};
export const updateEventRegistrantAction = (payload, refetch) => async (dispatch) => {
  const res = await api.updateEventRegistrant(payload);
  if (res.status == '200') {
    toast.success(`Successfully Update member's Registrant to Event`);
    refetch && refetch();
  } else toast.warning(`UnSucessfully Update member's Registrant to Event`);
};

export const sportAddAction = (Data) => async (dispatch) => {
  try {
    const { data } = await api.addSport(Data);
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
      dispatch(addProgressionSuccess(true));
    } else {
      dispatch(addProgressionFail(true));
    }
    dispatch(resetAddProgressionStatus());
    dispatch(sportFetchAction());
  } catch (error) {}
};
export const sportDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteSport(id);
    // console.log(id);
    if (data.success === true) {
      dispatch(deleteProgressionSuccess(true));
    } else {
      dispatch(deleteProgressionFail(true));
    }
    dispatch(resetDeleteProgressionStatus());
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
      dispatch(fetchProgressionCategoriesSuccess(true));
      dispatch(progressionFetchAction());
    } else {
      dispatch(fetchProgressionCategoriesFail(true));
    }
    // dispatch(sportFetchAction());
  } catch (error) {}
};
export const categoriesEditAction = (categoriesData) => async (dispatch) => {
  try {
    const { data } = await api.editSportCategories(categoriesData);
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
      dispatch(deleteProgressionSuccess(true));
    } else {
      dispatch(deleteProgressionFail(true));
    }
    dispatch(resetDeleteProgressionStatus());
    dispatch(sportFetchAction());
  } catch (error) {}
};

//categories  ranks
export const progressionCategoriesRankFetchAction = (name) => async (dispatch) => {
  try {
    const { data } = await api.fetchProgressionCategoriesRank(name);
    dispatch(fetchProgressionCategoriesRank(data?.data));
  } catch (error) {}
};
export const progressionCategoriesRankAddAction = (formdata) => async (dispatch) => {
  try {
    const { data } = await api.addProgressionCategoriesRank(formdata);
    dispatch(progressionCategoriesRankFetchAction(formdata?.categoryName));
  } catch (error) {}
};
export const progressionCategoriesRankEditAction = (formdata) => async (dispatch) => {
  try {
    const { data } = await api.editProgressionCategoriesRank(formdata);
    dispatch(progressionCategoriesRankFetchAction(formdata?.categoryName));
  } catch (error) {}
};

export const progressionCategoriesRankDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProgressionCategoriesRank(id);
    // if (data.success === true) {
    //   dispatch(deleteProgressionSuccess(true));
    // } else {
    //   dispatch(deleteProgressionFail(true));
    // }
    // dispatch(resetDeleteProgressionStatus());
    dispatch(progressionCategoriesRankFetchAction());
    // console.log(id);
  } catch (error) {}
};

//categories  divisions
export const progressionCategoriesDivisionFetchAction = (name) => async (dispatch) => {
  try {
    const { data } = await api.fetchProgressionCategoriesDivision(name);
    dispatch(fetchProgressionCategoriesDivision(data?.data));
  } catch (error) {}
};
export const progressionCategoriesDivisionAddAction = (formdata) => async (dispatch) => {
  try {
    const { data } = await api.addProgressionCategoriesDivision(formdata);
    dispatch(progressionCategoriesDivisionFetchAction(formdata?.categoryName));
  } catch (error) {}
};
export const progressionCategoriesDivisionEditAction = (formdata) => async (dispatch) => {
  try {
    const { data } = await api.editProgressionCategoriesDivision(formdata);
    dispatch(progressionCategoriesDivisionFetchAction(formdata?.categoryName));
  } catch (error) {}
};

export const progressionCategoriesDivisionDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProgressionCategoriesDivision(id);
    // if (data.success === true) {
    //   dispatch(deleteProgressionSuccess(true));
    // } else {
    //   dispatch(deleteProgressionFail(true));
    // }
    // dispatch(resetDeleteProgressionStatus());
    dispatch(progressionCategoriesDivisionFetchAction());
  } catch (error) {}
};

//
export const reportingUpdateAction = (payload, refetch) => async (dispatch) => {
  try {
    const res = await api.updateReporting(payload);
    if (res.status == '200') {
      toast.success('Update Divisoin Reporting.');
      refetch();
    } else toast.error('Not Update Divisoin Reporting.');
  } catch (error) {}
};
//categories  ranks
export const eventPointTypeFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEventPointType();
    dispatch(fetchEventPointType(data?.data));
  } catch (error) {}
};
export const eventPointTypeUpdateAction = (payload) => async (dispatch) => {
  try {
    const res = await api.updateEventPointType(payload);
    if (res.status == '200') {
      toast.success('Update Event Point Type.');
      dispatch(eventPointTypeFetchAction());
    } else toast.error('Not Update Event Point Type.');
  } catch (error) {}
};
export const removeEventRegistrantAction = (id, name, refetch) => async () => {
  try {
    const { data } = await api.removeEventRegistrant(id);
    if (data.success) {
      toast.success(`${name}'s Event Registrant Deleted Successfully`);
      refetch ? refetch() : null;
    } else {
      toast.error(`Unable to delete ${name}'s Registrant in Event`);
    }
  } catch (error) {}
};
