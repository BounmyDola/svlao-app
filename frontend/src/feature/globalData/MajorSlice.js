import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

const initialState = {
  majors: [],
  status: {
    list: "idle" | "loading" | "succeeded" | "failed",
    create: "idle" | "loading" | "succeeded" | "failed",
    update: "idle" | "loading" | "succeeded" | "failed",
    remove: "idle" | "loading" | "succeeded" | "failed",
  },
  error: null,
};

export const createMajor = createAsyncThunk(
  "majors/addMajor",
  async (inputData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post("/api/majors", inputData, config);
      return { data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateMajor = createAsyncThunk(
  "majors/updateMajor",
  async (inputData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/majors/${inputData._id}`,
        {
          ...inputData,
        },
        config,
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removeMajor = createAsyncThunk(
  "majors/removeMajor",
  async (majorId, thunkAPI) => {
    const { auth } = thunkAPI.getState().auth;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.delete(
        `/api/majors/${majorId}`,
        config,
      );
      const _id = res.data._id;
      return _id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const listMajor = createAsyncThunk(
  "majors/listMajor",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/majors`);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getMajorById = createAsyncThunk(
  "user/getMajorById",
  async (majorId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/majors/${majorId}`,
        config,
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const resetStatus = (state) => {
  state.status = {
    list: "idle",
    create: "idle",
    update: "idle",
    remove: "idle",
  };
  state.error = null;
};

const setError = (state, action) => {
  state.error = action.payload;
};

const majorSlice = createSlice({
  name: "major",
  initialState,
  reducers: {
    reset: resetStatus,
    setError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listMajor.pending, (state) => {
        state.status.list = "loading";
      })
      .addCase(listMajor.fulfilled, (state, action) => {
        state.status.list = "succeeded";
        state.majors = action.payload;
      })
      .addCase(listMajor.rejected, (state, action) => {
        state.status.list = "failed";
        setError(state, action);
      })

      .addCase(getMajorById.pending, (state) => {
        state.status.list = "loading";
      })
      .addCase(getMajorById.fulfilled, (state, action) => {
        state.status.list = "succeeded";
        state.majors = [{ ...action.payload }];
      })
      .addCase(getMajorById.rejected, (state, action) => {
        state.status.list = "failed";
        setError(state, action);
      })

      // ADD
      .addCase(createMajor.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createMajor.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.majors = [...state.majors, action.payload.data];
      })
      .addCase(createMajor.rejected, (state, action) => {
        state.status.create = "failed";
        setError(state, action);
      })

      // UPDATE ADMIN
      .addCase(updateMajor.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateMajor.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const updatedMajorIndex = state.majors.findIndex(
          (major) => major._id === action.payload._id,
        );
        if (updatedMajorIndex !== -1) {
          state.majors[updatedMajorIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateMajor.rejected, (state, action) => {
        state.status.update = "failed";
        setError(state, action);
      })

      // DELETE
      .addCase(removeMajor.pending, (state) => {
        state.status.remove = "loading";
      })
      .addCase(removeMajor.fulfilled, (state, action) => {
        state.status.remove = "succeeded";
        state.majors = state.majors.filter(
          (major) => major._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(removeMajor.rejected, (state, action) => {
        state.status.remove = "failed";
        setError(state, action);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null;
        },
      );
  },
});

export const { reset: majorReset } = majorSlice.actions;

export default majorSlice.reducer;
