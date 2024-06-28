import { createSlice } from '@reduxjs/toolkit';

export const eventMain = createSlice({
  name: 'eventMain',
  initialState: {
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
    progressionCategoriesSuccess: false,
    progressionCategoriesFail: false,
    // Rank
    progressionCategoriesRank: [],
    progressionCategoriesRankSuccess: false,
    progressionCategoriesRankFail: false,
    // Division
    progressionCategoriesDivision: [],
    progressionCategoriesDivisionSuccess: false,
    progressionCategoriesDivisionFail: false,
    //event listing data
    eventListingData: [],
    deleteEventData: false,
    createEventActionData: [],
    particularEventListingData: [],
    eventListingDataById: [],
    eventEdit: [],
    eventListSearched: []

    // progressionCategoriesAddSuccess: false,
    // progressionCategoriesAddFail: false,
  },
  reducers: {
    //events
    fetchEvents: (state, action) => {
      state.eventList = action?.payload;
    },

    // fetching progression
    fetchSport: (state, action) => {
      state.sportList = action?.payload;
    },
    //fetch event
    fetchEventData: (state, action) => {
      state.eventListingData = action?.payload;
    },
    //edit event
    editEventData: (state, action) => {
      state.eventEdit = action?.payload;
    },
    deleteEventData: (state, action) => {
      state.deleteEventData = action?.payload;
    },
    fetchSearchedEvent: (state, action) => {
      state.eventListSearched = action?.payload;
    },
    createEventData: (state, action) => {
      state.createEventActionData = action?.payload;
    },
    // fetchParticularEventDataInfo: (state, action) => {
    //   state.particularEventListingData = action?.payload;
    // },
    fetchEventDataById: (state, action) => {
      state.eventListingDataById = action?.payload;
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
      state.progressionCategories = action?.payload;
      state.progressionCategoriesSuccess = true;
    },
    fetchProgressionCategoriesFail: (state, action) => {
      state.progressionCategories = action?.payload;
      state.progressionCategoriesFail = true;
    },
    resetFetchProgressionCategories: (state) => {
      state.progressionCategoriesFail = false;
      state.progressionCategoriesSuccess = false;
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
    },
    fetchEventPointType: (state, action) => {
      state.eventPointType = action?.payload;
    }
  }
});

export const {
  // progression
  fetchSport,
  fetchEvents,
  fetchProgressionFail,
  fetchProgressionSuccess,
  fetchProgressionStatusReset,
  addProgressionFail,
  addProgressionSuccess,
  resetAddProgressionStatus,
  deleteProgressionFail,
  deleteProgressionSuccess,
  resetDeleteProgressionStatus,
  //categories
  fetchProgressionCategories,
  fetchProgressionCategoriesSuccess,
  fetchProgressionCategoriesFail,
  resetFetchSportCategories,
  //categories rank
  fetchProgressionCategoriesRank,
  fetchProgressionCategoriesRankSuccess,
  fetchProgressionCategoriesRankFail,
  resetFetchProgressionCategoriesRank,
  // categories division
  fetchProgressionCategoriesDivision,
  fetchProgressionCategoriesDivisionSuccess,
  fetchProgressionCategoriesDivisionFail,
  resetFetchProgressionCategoriesDivision,
  //event relate data
  fetchEventData,
  deleteEventData,
  createEventData,
  fetchParticularEventDataInfo,
  fetchEventDataById,
  editEventData,
  fetchSearchedEvent,

  fetchEventPointType
  //event data
} = eventMain.actions;

export default eventMain.reducer;
