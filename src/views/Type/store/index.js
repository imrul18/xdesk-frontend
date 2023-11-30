// import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@src/http";

export const getAllData = createAsyncThunk(
  "types/getAllData",
  async (_, { getState }) => {
    const data = getState()?.types?.params;
    const response = await Api.get("type", { params: data });
    return response.data;
  }
);

export const addData = createAsyncThunk(
  "types/addData",
  async (_, { getState, dispatch }) => {
    dispatch(setParamsData({ loading: true }));
    const data = getState()?.types?.uploadData;
    const response = await Api.post("type", data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      dispatch(setUploadData({}));
      dispatch(setParamsData({ loading: false }));
      return true;
    }
    dispatch(setParamsData({ loading: false }));
  }
);

export const getData = createAsyncThunk("types/getData", async (id) => {
  const response = await Api.get(`type/${id}`);
  return response.data;
});

export const updateData = createAsyncThunk(
  "types/updateData",
  async (id, { getState, dispatch }) => {
    dispatch(setParamsData({ loading: true }));
    const data = getState()?.types?.uploadData;
    const response = await Api.post(`type-update/${id}`, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
    dispatch(setParamsData({ loading: false }));
      return true;
    }
    dispatch(setParamsData({ loading: false }));
  }
);

export const updateStatus = createAsyncThunk(
  "types/updateStatus",
  async (id, { dispatch }) => {
    const response = await Api.post(`type-change-status/${id}`);
    dispatch(getAllData());
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "types/deleteData",
  async (id, { dispatch }) => {
    const response = await Api.post(`type-delete/${id}`);
    dispatch(getAllData());
    return response.data;
  }
);

export const typesSlice = createSlice({
  name: "types",
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
        state.paramsData = {
          ...state.paramsData,
          total: action.payload?.total,
        };
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.uploadData = action.payload;
      })
      .addCase(addData.fulfilled, (state, action) => {
        if (action.payload) {
          state.uploadData = {};
        }
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

export const { setParams, setParamsData, setUploadData } = typesSlice.actions;

export default typesSlice.reducer;
