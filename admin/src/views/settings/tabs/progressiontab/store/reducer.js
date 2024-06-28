import { createSlice } from '@reduxjs/toolkit';

export const progression = createSlice({
  name: 'progression',
  initialState: {
    // Progression
    isProgressionLoading: false,
    progressionList: [],
    progressionListSuccess: false,
    progressionListFail: false,
    // Add Progression
    progressionAddSuccess: false,
    progressionAddFail: false,
    // Delete Progression
    progressionDeleteSuccess: false,
    progressionDeleteFail: false,
    //Edit Progression
    progressionEditSuccess: false,
    progressionEditFail: false,
    //progressionCategories
    progressionCategories: [],
    progressionCategoriesAddSuccess: false,
    progressionCategoriesAddFail: false,

    progressionCategoriesDeleteSuccess: false,
    progressionCategoriesDeleteFail: false,

    progressionCategoriesEditSuccess: false,
    progressionCategoriesEditFail: false,
    // divisions
    progressionCategoriesDivision: [],
    progressionCategoriesDivisionSuccess: false,
    progressionCategoriesDivisionFail: false,
    progressionCategoriesDivisionAddSuccess: false,
    progressionCategoriesDivisionAddFail: false,
    progressionCategoriesDivisionDeleteSuccess: false,
    progressionCategoriesDivisionDeleteFail: false,
    progressionCategoriesDivisionEditSuccess: false,
    progressionCategoriesDivisionEditFail: false,
    smartListDivisioning: [],
    // ranks
    progressionCategoriesRank: [],
    progressionCategoriesRankSuccess: false,
    progressionCategoriesRankFail: false,
    progressionCategoriesRankAddSuccess: false,
    progressionCategoriesRankAddFail: false,
    progressionCategoriesRankDeleteSuccess: false,
    progressionCategoriesRankDeleteFail: false,
    progressionCategoriesRankEditSuccess: false,
    progressionCategoriesRankEditFail: false,
    smartListRanking: [],

    // Progression
    isProgressionLoading: false,
    sportList: [],
    progressionListSuccess: false,
    progressionListFail: false,
    // Add Progression
    progressionAddSuccess: false,
    progressionAddFail: false,
    // Delete Progression
    progressionDeleteSuccess: false,
    progressionDeleteFail: false,

    //progressionCategories
    progressionCategories: [],
    progressionCategoriesAddSuccess: false,
    progressionCategoriesAddFail: false
    // // divisions
    // progressionCategoriesDivision: [],
    // progressionCategoriesDivisionAddSuccess: false,
    // progressionCategoriesDivisionAddFail: false,
    // // ranks
    // progressionCategoriesRank: [],
    // progressionCategoriesRankAddSuccess: false,
    // progressionCategoriesRankAddFail: false,
  },
  reducers: {
    // fetching progression
    fetchProgression: (state, action) => {
      state.progressionList = action?.payload;
    },

    fetchProgressionSuccess: (state, action) => {
      state.progressionListSuccess = action?.payload;
    },
    fetchProgressionFail: (state, action) => {
      state.progressionListFail = action?.payload;
    },
    fetchProgressionStatusReset: (state, action) => {
      state.progressionListSuccess = false;
      state.progressionListSuccess = false;
    },

    //addin progression

    addProgressionSuccess: (state, action) => {
      state.progressionAddSuccess = action?.payload;
    },
    addProgressionFail: (state, action) => {
      state.progressionAddFail = action?.payload;
    },
    resetAddProgressionStatus: (state, action) => {
      state.progressionAddSuccess = false;
      state.progressionAddFail = false;
    },
    //delete progression
    deleteProgressionSuccess: (state, action) => {
      state.progressionDeleteSuccess = action?.payload;
    },
    deleteProgressionFail: (state, action) => {
      state.progressionDeleteFail = action?.payload;
    },
    resetDeleteProgressionStatus: (state) => {
      state.progressionDeleteSuccess = false;
      state.progressionDeleteFail = false;
    },
    //edit progression
    editProgressionSuccess: (state, action) => {
      state.progressionEditSuccess = action?.payload;
    },
    editProgressionFail: (state, action) => {
      state.progressionEditFail = action?.payload;
    },
    resetEditProgressionStatus: (state) => {
      state.progressionEditSuccess = false;
      state.progressionEditFail = false;
    },

    // fetch progression CAtegories
    fetchProgressionCategories: (state, action) => {
      state.progressionCategories = action?.payload;
    },
    addProgressionCategoriesSuccess: (state) => {
      state.progressionCategoriesAddSuccess = true;
    },
    addProgressionCategoriesFail: (state, action) => {
      state.progressionCategoriesAddFail = true;
    },
    resetAddProgressionCategoriesStatus: (state) => {
      state.progressionCategoriesAddFail = false;
      state.progressionCategoriesAddSuccess = false;
    },
    deleteProgressionCategoriesSuccess: (state) => {
      state.progressionCategoriesDeleteSuccess = true;
    },
    deleteProgressionCategoriesFail: (state) => {
      state.progressionCategoriesDeleteFail = true;
    },
    resetDeleteProgressionCategoriesStatus: (state) => {
      state.progressionCategoriesDeleteFail = false;
      state.progressionCategoriesDeleteSuccess = false;
    },
    editProgressionCategoriesSuccess: (state) => {
      state.progressionCategoriesEditSuccess = true;
    },
    editProgressionCategoriesFail: (state) => {
      state.progressionCategoriesEditFail = true;
    },
    resetEditProgressionCategoriesStatus: (state) => {
      state.progressionCategoriesEditFail = false;
      state.progressionCategoriesEditSuccess = false;
    },

    //fetch division
    resetProgressionCategoriesDivision: (state) => {
      state.progressionCategoriesDivision = [];
    },

    addProgressionCategoriesDivisionSuccess: (state) => {
      state.progressionCategoriesDivisionAddSuccess = true;
    },
    addProgressionCategoriesDivisionFail: (state) => {
      state.progressionCategoriesDivisionAddFail = true;
    },
    resetAddProgressionCategoriesDivisionStatus: (state) => {
      state.progressionCategoriesDivisionAddSuccess = false;
      state.progressionCategoriesDivisionAddFail = false;
    },
    editProgressionCategoriesDivisionSuccess: (state) => {
      state.progressionCategoriesDivisionEditSuccess = true;
    },
    editProgressionCategoriesDivisionFail: (state) => {
      state.progressionCategoriesDivisionEditFail = true;
    },
    resetEditProgressionCategoriesDivisionStatus: (state) => {
      state.progressionCategoriesDivisionEditFail = false;
      state.progressionCategoriesDivisionEditSuccess = false;
    },

    deleteProgressionCategoriesDivisionSuccess: (state) => {
      state.progressionCategoriesDivisionDeleteSuccess = true;
    },
    deleteProgressionCategoriesDivisionFail: (state) => {
      state.progressionCategoriesDivisionDeleteFail = true;
    },
    resetDeleteProgressionCategoriesDivisionStatus: (state) => {
      state.progressionCategoriesDivisionDeleteFail = false;
      state.progressionCategoriesDivisionDeleteSuccess = false;
    },
    addDivisioningForSmartList: (state, action) => {
      state.smartListDivisioning.push(action.payload);
    },
    deleteDivisioningForSmartList: (state, action) => {
      const index = state.smartListDivisioning.findIndex(
        (item) => item.divisioning == action.payload.divisioning
      );
      if (index != -1) state.smartListDivisioning.splice(index, 1);
    },
    deleteCategoryForSmartListDivision: (state, action) => {
      state.smartListDivisioning = state.smartListDivisioning.filter(
        (item) => item.category != action.payload
      );
    },
    deleteProgressionForSmartList: (state, action) => {
      state.smartListDivisioning = state.smartListDivisioning.filter(
        (item) => item.progression != action.payload
      );
    },
    setSmartListDivisioningInit: (state, action) => {
      state.smartListDivisioning = [];
    },
    setSmartListDivisioning: (state, action) => {
      state.smartListDivisioning = action.payload;
    },

    //fetch rank
    resetProgressionCategoriesRank: (state) => {
      state.progressionCategoriesRank = [];
    },

    addProgressionCategoriesRankSuccess: (state) => {
      state.progressionCategoriesRankAddSuccess = true;
    },
    addProgressionCategoriesRankFail: (state) => {
      state.progressionCategoriesRankAddFail = true;
    },
    resetAddProgressionCategoriesRankStatus: (state) => {
      state.progressionCategoriesRankAddSuccess = false;
      state.progressionCategoriesRankAddFail = false;
    },
    editProgressionCategoriesRankSuccess: (state) => {
      state.progressionCategoriesRankEditSuccess = true;
    },
    editProgressionCategoriesRankFail: (state) => {
      state.progressionCategoriesRankEditFail = true;
    },
    resetEditProgressionCategoriesRankStatus: (state) => {
      state.progressionCategoriesRankEditFail = false;
      state.progressionCategoriesRankEditSuccess = false;
    },

    deleteProgressionCategoriesRankSuccess: (state) => {
      state.progressionCategoriesRankDeleteSuccess = true;
    },
    deleteProgressionCategoriesRankFail: (state) => {
      state.progressionCategoriesRankDeleteFail = true;
    },
    resetDeleteProgressionCategoriesRankStatus: (state) => {
      state.progressionCategoriesRankDeleteFail = false;
      state.progressionCategoriesRankDeleteSuccess = false;
    },
    addRankingForSmartList: (state, action) => {
      state.smartListRanking.push(action.payload);
    },
    deleteRankingForSmartList: (state, action) => {
      const index = state.smartListRanking.findIndex(
        (item) => item.ranking == action.payload.ranking
      );
      if (index != -1) state.smartListRanking.splice(index, 1);
    },
    deleteCategoryForSmartListRank: (state, action) => {
      state.smartListRanking = state.smartListRanking.filter(
        (item) => item.category != action.payload
      );
    },
    deleteProgressionForSmartListRank: (state, action) => {
      state.smartListRanking = state.smartListRanking.filter(
        (item) => item.progression != action.payload
      );
    },
    setSmartListRankingInit: (state, action) => {
      state.smartListRanking = [];
    },
    setSmartListRank: (state, action) => {
      state.smartListRanking = action.payload;
    },

    // fetching progression
    fetchSport: (state, action) => {
      state.sportList = action?.payload;
    },

    fetchProgressionSuccess: (state, action) => {
      state.progressionListSuccess = action?.payload;
    },
    fetchProgressionFail: (state, action) => {
      state.progressionListFail = action?.payload;
    },
    fetchProgressionStatusReset: (state, action) => {
      state.progressionListSuccess = false;
      state.progressionListSuccess = false;
    },

    //addin progression

    addProgressionSuccess: (state, action) => {
      state.progressionAddSuccess = action?.payload;
    },
    addProgressionFail: (state, action) => {
      state.progressionAddFail = action?.payload;
    },
    resetAddProgressionStatus: (state, action) => {
      state.progressionAddSuccess = false;
      state.progressionAddFail = false;
    },
    //delete progression
    deleteProgressionSuccess: (state, action) => {
      state.progressionDeleteSuccess = action?.payload;
    },
    deleteProgressionFail: (state, action) => {
      state.progressionDeleteFail = action?.payload;
    },
    resetDeleteProgressionStatus: (state) => {
      state.progressionDeleteSuccess = false;
      state.progressionDeleteFail = false;
    },

    // fetch progression CAtegories
    fetchProgressionCategories: (state, action) => {
      state.progressionCategories = action?.payload;
    },
    fetchProgressionCategoriesSuccess: (state, action) => {
      state.progressionCategoriesAddSuccess = action?.payload;
    },
    fetchProgressionCategoriesFail: (state, action) => {
      state.progressionCategoriesAddFail = action?.payload;
    },
    resetFetchProgressionCategories: (state) => {
      state.progressionCategoriesAddFail = false;
      state.progressionCategoriesAddSuccess = false;
    },
    //fetch rank
    fetchProgressionCategoriesRank: (state, action) => {
      state.progressionCategoriesRank = action?.payload;
    },
    fetchProgressionCategoriesRankSuccess: (state, action) => {
      state.progressionCategoriesRank = action?.payload;
      state.progressionCategoriesRankSuccess = true;
    },
    fetchProgressionCategoriesRankFail: (state, action) => {
      state.progressionCategoriesRank = action?.payload;
      state.progressionCategoriesRankFail = true;
    },
    resetFetchProgressionCategoriesRank: (state) => {
      state.progressionCategoriesRankSuccess = false;
      state.progressionCategoriesRankFail = false;
    },
    //fetch division
    fetchProgressionCategoriesDivision: (state, action) => {
      state.progressionCategoriesDivision = action?.payload;
    },
    fetchProgressionCategoriesDivisionSuccess: (state, action) => {
      state.progressionCategoriesDivision = action?.payload;
      state.progressionCategoriesDivisionSuccess = true;
    },
    fetchProgressionCategoriesDivisionFail: (state, action) => {
      state.progressionCategoriesDivision = action?.payload;
      state.progressionCategoriesDivisionFail = true;
    },
    resetFetchProgressionCategoriesDivision: (state) => {
      state.progressionCategoriesDivisionSuccess = false;
      state.progressionCategoriesDivisionFail = false;
    }
  }
});

export const {
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
  fetchProgressionCategoriesRankSuccess,
  fetchProgressionCategoriesRankFail,
  resetFetchProgressionCategoriesRank,
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
  fetchProgressionCategoriesDivisionSuccess,
  fetchProgressionCategoriesDivisionFail,
  resetFetchProgressionCategoriesDivision,
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
} = progression.actions;

export default progression.reducer;
