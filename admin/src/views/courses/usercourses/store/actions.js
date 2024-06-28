import { toast } from 'react-toastify';
import * as api from './api';
import {
  fetchCourse,
  fetchActiveCourse,
  deleteCourseSuccess,
  deleteCourseFail,
  resetDeleteCourseStatus,
  addCourseFail,
  addCourseSuccess,
  resetAddCourseStatus,
  editCourseFail,
  editCourseSuccess,
  resetEditCourseStatus,
  fetchActiveCourseLessons,
  fetchCourseCategories,
  addCourseCategoriesSuccess,
  addCourseCategoriesFail,
  resetAddCourseCategoriesStatus,
  deleteCourseCategoriesFail,
  deleteCourseCategoriesSuccess,
  resetDeleteCourseCategoriesStatus,
  editCourseCategoriesFail,
  editCourseCategoriesSuccess,
  resetEditCourseCategoriesStatus
} from './reducer';

//course categories
export const courseCategoriesFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourseCategories();
    dispatch(fetchCourseCategories(data));
  } catch (error) {}
};

export const courseCategoriesAddAction = (categoriesData) => async (dispatch) => {
  try {
    const { data } = await api.addCourseCategory(categoriesData);
    if (data.success === true) {
      dispatch(addCourseCategoriesSuccess());
      toast.success('Course Category Added Successfully!');
      dispatch(courseFetchAction());
      dispatch(courseCategoriesFetchAction());
    } else {
      dispatch(addCourseCategoriesFail());
      toast.error('Course Category Addition Failed!');
    }
    dispatch(resetAddCourseCategoriesStatus());
  } catch (error) {}
};

export const courseCategoriesDeleteAction = (item) => async (dispatch) => {
  try {
    if (item?.subCategories?.length === 0) {
      const { data } = await api.deleteCourseCategory(item._id);
      if (data.success === true) {
        dispatch(deleteCourseCategoriesSuccess(true));
        toast.success('Course Category Deleted Successfully!');
        dispatch(courseFetchAction());
        dispatch(courseCategoriesFetchAction());
      } else {
        dispatch(deleteCourseCategoriesFail(true));
      }
      dispatch(resetDeleteCourseCategoriesStatus());
    } else {
      toast.error('Can not be deleted! Has Sub-Categories!');
    }
  } catch (error) {}
};

export const courseCategoriesEditAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editCourseCategory(payload);
    if (data.success === true) {
      dispatch(editCourseCategoriesSuccess());
    } else {
      dispatch(editCourseCategoriesFail());
    }
    dispatch(resetEditCourseCategoriesStatus());
    dispatch(courseFetchAction());
  } catch (error) {}
};

// ** Course Sub Categories
export const courseSubCategoriesAddAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.addCourseSubCategory(id, payload);
    if (data.success === true) {
      dispatch(editCourseCategoriesSuccess());
      toast.success('Course Sub-Category Added Successfully!');
    } else {
      dispatch(editCourseCategoriesFail());
      toast.error('Course Sub-Category Addition Failed!');
    }
    dispatch(resetEditCourseCategoriesStatus());
    dispatch(courseFetchAction());
    dispatch(courseCategoriesFetchAction());
  } catch (error) {}
};

export const courseSubCategoryDeleteAction = (item, row) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourseSubCategory(item._id, row._id);
    if (data.success === true) {
      dispatch(editCourseCategoriesSuccess());
      toast.success('Course Category Deleted Successfully!');
    } else {
      dispatch(editCourseCategoriesFail());
      toast.error('Course Category Deletion Failed!');
    }
    dispatch(resetEditCourseCategoriesStatus());
    dispatch(courseFetchAction());
    dispatch(courseCategoriesFetchAction());
  } catch (error) {}
};

//Course Actions
export const courseFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourses();
    dispatch(fetchCourse(data));
  } catch (error) {}
};

export const activeCourseFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchActiveCourse(id);
    dispatch(fetchActiveCourse(data));
  } catch (error) {}
};

export const courseAddAction = (courseData) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(courseData);
    if (data.success === true) {
      dispatch(addCourseSuccess(true));
      toast.success('Course Added Successfully!');
    } else {
      dispatch(addCourseFail(true));
      toast.error('Course Addition Failed!');
    }
    dispatch(resetAddCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) {}
};

export const courseDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourse(id);
    if (data.success === true) {
      dispatch(deleteCourseSuccess(true));
    } else {
      dispatch(deleteCourseFail(true));
    }
    dispatch(resetDeleteCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) {}
};

export const courseEditAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.editCourse(id, payload);
    if (data.success === true) {
      dispatch(editCourseSuccess(true));
    } else {
      dispatch(editCourseFail(true));
    }
    dispatch(resetEditCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) {}
};

// course Lessons
export const activeCourseLessonsFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchLessons(id);

    dispatch(fetchActiveCourseLessons(data?.data));
  } catch (error) {}
};
export const lessonAddAction = (id, payload) => async (dispatch) => {
  const { data } = await api.addLesson(id, payload);
  if (data.success) {
  }
  dispatch(activeCourseLessonsFetchAction(id));
};
export const lessonDeleteAction = (chapterId, id) => async (dispatch) => {
  const { data } = await api.deleteLesson(id);
  dispatch(activeCourseLessonsFetchAction(chapterId));
};

//couse Vidoes
export const videoAddAction = (chapterId, payLoad) => async (dispatch) => {
  const { data } = await api.addVideo(payLoad);
  dispatch(activeCourseLessonsFetchAction(chapterId));
};

//course quiz
export const quizAddAction = (chapterId, lessonId, payLoad) => async (dispatch) => {
  const { data } = await api.addQuiz(lessonId, payLoad);
  dispatch(activeCourseLessonsFetchAction(chapterId));
};

// export const videoDeleteAction=(id,chapterId)=>async(dispatch)=>{
//   const {data}= await api.deleteVideo(id);
//   dispatch(activeCourseLessonsFetchAction(chapterId))
// }

// //categories  ranks
// export const courseCategoriesRankFetchAction = (name) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchCourseCategoriesRank(name);
//     dispatch(fetchCourseCategoriesRank(data?.data));
//   } catch (error) {}
// };
// export const courseCategoriesRankResetAction = () => async (dispatch) => {
//   try {
//     dispatch(resetCourseCategoriesRank());
//   } catch (error) {}
// };
// export const courseCategoriesRankAddAction = (formdata, categoryName) => async (dispatch) => {
//   try {
//     const { data } = await api.addCourseCategoriesRank(formdata);
//     if (data.sucess) {
//       dispatch(addCourseCategoriesRankSuccess());
//     } else {
//       dispatch(addCourseCategoriesRankFail());
//     }
//     dispatch(courseCategoriesRankFetchAction(categoryName));
//   } catch (error) {}
// };
// export const courseCategoriesRankEditAction =
//   (formdata, categoryName, id) => async (dispatch) => {
//     try {
//       const { data } = await api.editCourseCategoriesRank(formdata, id);

//       if (data.success) {
//         dispatch(editCourseCategoriesRankSuccess());
//       } else {
//         dispatch(editCourseCategoriesRankFail());
//       }
//       dispatch(resetEditCourseCategoriesRankStatus());
//       dispatch(courseCategoriesRankFetchAction(categoryName));
//     } catch (error) {}
//   };
// export const courseCategoriesRankDeleteAction = (id, categoryName) => async (dispatch) => {
//   try {
//     const { data } = await api.deleteCourseCategoriesRank(id);
//     if (data.success) {
//       dispatch(deleteCourseCategoriesRankSuccess());
//     } else {
//       dispatch(deleteCourseCategoriesRankFail());
//     }
//     dispatch(resetDeleteCourseCategoriesRankStatus());
//     dispatch(courseCategoriesRankFetchAction(categoryName));
//   } catch (error) {}
// };
