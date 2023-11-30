// import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@src/http";

export const getAllData = createAsyncThunk(
  "zones/getAllData",
  async (_, { getState }) => {
    const data = getState()?.zones?.params;
    const response = await Api.get("zone", { params: data });
    return response.data;
  }
);

export const addData = createAsyncThunk(
  "zones/addData",
  async (_, { getState, dispatch }) => {
    dispatch(setParamsData({ loading: true }));
    const data = getState()?.zones?.uploadData;
    const response = await Api.post("zone", data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      dispatch(setUploadData({}));
      dispatch(setParamsData({ loading: false }));
      return true;
    }
    dispatch(setParamsData({ loading: false }));
  }
);

export const getData = createAsyncThunk("zones/getData", async (id) => {
  const response = await Api.get(`zone/${id}`);
  return response.data;
});

export const updateData = createAsyncThunk(
  "zones/updateData",
  async (id, { getState, dispatch }) => {
    dispatch(setParamsData({ loading: true }));
    const data = getState()?.zones?.uploadData;
    const response = await Api.post(`zone/${id}`, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      return true;
    }
    dispatch(setParamsData({ loading: false }));
  }
);

export const updateStatus = createAsyncThunk(
  "zones/updateStatus",
  async (id, { dispatch }) => {
    const response = await Api.post(`zone-change-status/${id}`);
    dispatch(getAllData());
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "zones/deleteData",
  async (id, { dispatch }) => {
    const response = await Api.post(`zone-delete/${id}`);
    dispatch(getAllData());
    return response.data;
  }
);

export const zonesSlice = createSlice({
  name: "zones",
  initialState: {
    data: [],
    params: {
      perPage: 10,
      page: 1,
    },
    paramsData: {
      total: 1,
      loading: false,
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
      state.uploadData = {...state.uploadData, ...action.payload};
    },
  },
});

export const { setParams, setParamsData, setUploadData } = zonesSlice.actions;

export default zonesSlice.reducer;
