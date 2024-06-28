// import { customInterIceptors } from '../../../../../lib/AxiosProvider';
import { identityMatrix } from 'pdf-lib/cjs/types/matrix';
import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addSport = (Data) => {
  return API.post('/sport/createSport', Data);
};
export const fetchEvents = () => {
  return API.get('/event/all');
};
export const editSport = (Data) => {
  return API.put('/sport/update_sports_details/' + Data.id, Data);
};

export const deleteSport = (id) => {
  return API.delete('/sport/delete_sports/' + id);
};

export const fetchSportCategories = () => {
  return API.get('/sport-category/addCategory');
};
export const addSportCategories = (categoriesData) => {
  return API.post('/sport-category/addCategory/' + categoriesData.id, categoriesData);
};
export const editSportCategories = (categoriesData) => {
  return API.put('/sport-category/categoryUpdate/' + categoriesData.id, categoriesData);
};
export const deleteSportCategories = (id) => {
  return API.delete('/sport-category/categoryDelete/' + id);
};

//division
export const fetchProgressionCategoriesDivision = (id) => {
  return API.get('division-category/category_division_info/' + id);
};
export const addProgressionCategoriesDivision = (formdata) => {
  return API.post('/division-category/add_category_division/' + formdata.id, formdata);
};
export const editProgressionCategoriesDivision = (formdata) => {
  return API.put('/division-category/update_category_division/' + formdata.id, formdata);
};
export const deleteProgressionCategoriesDivision = (id) => {
  return API.delete('/division-category/delete_category_division/' + id);
};

//rank
export const fetchProgressionCategoriesRank = (id) => {
  return API.get('rank-category/category_rank_info/' + id);
};
export const addProgressionCategoriesRank = (formdata) => {
  return API.post('/rank-category/add_category_rank/' + formdata.id, formdata);
};
export const editProgressionCategoriesRank = (formdata) => {
  return API.put('/rank-category/update_category_rank/' + formdata.id, formdata);
};
export const deleteProgressionCategoriesRank = (id) => {
  return API.delete('/rank-category/delete_category_rank/' + id);
};

///////////////////////// event listing api
export const fetchEventDataAPI = async (payload) => {
  return await API.get('/event/all/' + payload);
};

export const deleteEventDataAPI = (payload) => {
  return API.delete('/event/delete/' + payload);
};
export const createEventDataAPI = (payload) => {
  let [eventType] = payload.getAll('eventType');
  const eventTypeOne = eventType.toLowerCase();
  return API.post(`event/create/${eventTypeOne}`, payload);
};
// export const fetchParticularEventDataAPI = (payload) => {
//   return API.get('/event/info/' + payload);
// };
//fetch event by id
export const fetchEventByIdApi = (payload) => {
  return API.get('/event/info/' + payload);
};
//edit event by id
export const editEventByIdApi = (id, payload) => {
  // const eventId = payload.getAll('_id')
  // payload.delete('_id')
  // console.log('eventId',eventId);
  return API.put(`/event/update/` + id, payload);
};

export const createEventRegistrantDataAPI = (payload) => {
  return API.post(`event/registrant/create/${payload.eventId}`, payload);
};

export const updateReporting = (payload) => {
  return API.put(`/event/reporting`, payload);
};

export const fetchEventPointType = () => {
  return API.get(`/event/point-type`);
};
export const updateEventPointType = (payload) => {
  return API.put(`/event/point-type`, payload);
};
export const updateEventRegistrant = (payload) => {
  return API.put('/event/registrant/update/' + payload.id, payload);
};
export const removeEventRegistrant = (id) => {
  return API.delete('/event/registrant/delete/' + id);
};
