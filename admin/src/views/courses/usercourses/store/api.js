// import { id } from 'react-scroll-calendar';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// Course Categories
export const addCourseCategory = (courseCategoryData) => {
  return API.post('/course/create-category', courseCategoryData);
};
export const fetchCourseCategories = () => {
  return API.get('/course/course-categories');
};
export const editCourseCategory = (id, payload) => {
  return API.put(`/course/course-category/${id}`, payload);
};
export const deleteCourseCategory = (id) => {
  return API.delete('/course//course-category/' + id);
};
export const addCourseSubCategory = (id, payload) => {
  return API.put(`/course/course-subcategory/${id}`, payload);
};
export const deleteCourseSubCategory = (catId, subCatId) => {
  return API.put(`/course/course-subcategory/${catId}/${subCatId}`);
};

export const addCourse = (courseData) => {
  return API.post('/course/create', courseData);
};
export const fetchCourses = () => {
  return API.get('/course/');
};
export const fetchActiveCourse = (id) => {
  return API.get('/course/courseId/' + id);
};
export const fetchSingleCourse = () => {
  return API.get('/course/courseId/:id');
};
export const deleteCourse = (id) => {
  return API.delete('/course/courseId/' + id);
};
export const editCourse = (id, payload) => {
  return API.put(`/course/courseId/${id}`, payload);
};
export const fetchLessons = (id) => {
  return API.get(`/course/lesson/${id}`);
};
export const addLesson = (id, payload) => {
  return API.post('/course/lesson/' + id, payload);
};
export const deleteLesson = (id) => {
  return API.delete('course/lessonId/' + id);
};
//course videos
export const addVideo = (payload) => {
  return API.post('course/coursevideo/' + payload.id, payload);
};
export const addQuiz = (lessonId, payLoad) => {
  return API.post('/course/quiz/' + lessonId, payLoad);
};
