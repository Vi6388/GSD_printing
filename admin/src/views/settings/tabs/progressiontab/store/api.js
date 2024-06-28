import { customInterIceptors } from '../../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addSport = (Data) => {
  return API.post('/sport/createSport', Data);
};
export const fetchSport = () => {
  return API.get('/sport/sportsDetails');
};
export const editSport = (Data) => {
  return API.put('/sport/update_sports_details/' + Data.id, Data);
};
// export const deleteProgression = (id) => {
//   return API.delete('/progression/delete/progression_remove/' + id);
// };

export const deleteSport = (id) => {
  return API.delete('/sport/delete_sports/' + id);
};

//categories
// export const fetchSportCategories = () => {
//   return API.get('/category/categoryDetails');
// };
export const fetchSportCategories = () => {
  return API.get('/sport-category/addCategory');
};
export const addSportCategories = (categoriesData) => {
  return API.post('/sport-category/addCategory/' + categoriesData.sportId, categoriesData);
};
export const editSportCategories = (categoriesData) => {
  return API.put('/sport-category/categoryUpdate/' + categoriesData.id, categoriesData);
};
export const deleteSportCategories = (id) => {
  return API.delete('/sport-category/categoryDelete/' + id);
};

export const addProgression = (progressionData) => {
  return API.post('/progression', progressionData);
};
export const fetchProgression = () => {
  return API.get('/progression');
};
export const deleteProgression = (id) => {
  return API.delete('/progression/' + id);
};
export const editProgression = (payload) => {
  return API.put('/progression/' + payload?.id, payload);
};

//categories
export const fetchProgressionCategories = () => {
  return API.get('/sport-category/categoryDetails');
};
export const addProgressionCategories = (categoriesData) => {
  return API.post('sport-category/addCategory/' + categoriesData?.sportId, categoriesData);
};
export const deleteProgressionCategories = (payload) => {
  return API.delete('/sport-category/categoryDelete/' + payload);
};
export const editProgressionCategories = (payload) => {
  return API.put('/sport-category/categoryUpdate/' + payload?.id, payload);
};

//division
export const fetchProgressionCategoriesDivision = (id) => {
  return API.get('division-category/category_division_info/' + (id !== undefined ? id : ''));
};
export const addProgressionCategoriesDivision = (formdata, categoryId) => {
  return API.post('/division-category/add_category_division/' + categoryId, formdata);
};
export const editProgressionCategoriesDivision = (payload, id) => {
  return API.put('/division-category/update_category_division/' + id, payload);
};
export const deleteProgressionCategoriesDivision = (id) => {
  return API.delete('/division-category/delete_category_division/' + id);
};

//rank
export const fetchProgressionCategoriesRank = (id) => {
  return API.get('rank-category/category_rank_info/' + (id !== undefined ? id : ''));
};
export const addProgressionCategoriesRank = (formdata, categoryId) => {
  return API.post('/rank-category/add_category_rank/' + categoryId, formdata);
};
export const editProgressionCategoriesRank = (payload, id) => {
  return API.put('/rank-category/update_category_rank/' + id, payload);
};
export const deleteProgressionCategoriesRank = (id) => {
  return API.delete('/rank-category/delete_category_rank/' + id);
};
