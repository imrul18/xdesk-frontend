// import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@src/http";

export const getAllData = createAsyncThunk(
  "headPostOffices/getAllData",
  async (_, { getState }) => {
    const data = getState()?.headPostOffices?.params;
    const response = await Api.get("head-post-office", { params: data });
    return response.data;
  }
);

export const addData = createAsyncThunk(
  "headPostOffices/addData",
  async (_, { getState, dispatch }) => {
    dispatch(setParamsData({ loading: true }));
    const data = getState()?.headPostOffices?.uploadData;
    const response = await Api.post("head-post-office", data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      dispatch(setUploadData({}));
      dispatch(setParamsData({ loading: false }));
      return true;
    }
    dispatch(setParamsData({ loading: false }));
  }
);

export const getData = createAsyncThunk("headPostOffices/getData", async (id) => {
  const response = await Api.get(`head-post-office/${id}`);
  return response.data;
});

export const updateData = createAsyncThunk(
  "headPostOffices/updateData",
  async (id, { getState, dispatch }) => {
    dispatch(setParamsData({ loading: true }));
    const data = getState()?.headPostOffices?.uploadData;
    const response = await Api.post(`head-post-office-update/${id}`, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      return true;
    }
    dispatch(setParamsData({ loading: false }));
  }
);

export const updateStatus = createAsyncThunk(
  "headPostOffices/updateStatus",
  async (id, { dispatch }) => {
    const response = await Api.post(`head-post-office-change-status/${id}`);
    dispatch(getAllData());
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "headPostOffices/deleteData",
  async (id, { dispatch }) => {
    const response = await Api.post(`head-post-office-delete/${id}`);
    dispatch(getAllData());
    return response.data;
  }
);

export const getZoneOption = createAsyncThunk(
  "headPostOffices/getZoneOption",
  async () => {
    const response = await Api.get(`option-zone`);
    return response.data;
  }
);

export const headPostOfficesSlice = createSlice({
  name: "headPostOffices",
  initialState: {
    data: [],
    params: {
      perPage: 10,
      page: 1,
    },

    paramsData: {
      total: 1,
      loading: false
    },

    options: {  
      zones: [],
    },

    uploadData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.data = action.payload?.data;
        console.log(action.payload?.total);
        state.paramsData = {
          ...state.paramsData,
          total: action.payload?.total,
        };
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.uploadData = action.payload;
      })
      .addCase(getZoneOption.fulfilled, (state, action) => {
        state.options = {...state.options, zones: action.payload}
      });
  },
  reducers: {
    setParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
    setParamsData: (state, action) => {
      state.paramsData = { ...state.paramsData, ...action.payload };
    },
    setUploadData: (state, action) => {
      state.uploadData = action.payload;
    },
  },
});

export const { setParams, setParamsData, setUploadData } =
  headPostOfficesSlice.actions;

export default headPostOfficesSlice.reducer;
