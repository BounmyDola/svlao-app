import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../utils/axiosConfig";

const initialState = {
  auth: localStorage.getItem("authInfo")
    ? JSON.parse(localStorage.getItem("authInfo") || "")
    : null,
  status: {
    setInfo: "idle" | "loading" | "succeeded" | "failed",
    signup: "idle" | "loading" | "succeeded" | "failed",
    signin: "idle" | "loading" | "succeeded" | "failed",
    signout: "idle" | "loading" | "succeeded" | "failed",
  },
  role: null,
  error: "",
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const { emailAddress, password, fullname } = userData;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await apiRequest.post(
        "/users",
        { emailAddress, password, fullname },
        config,
      );
      return null;
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
export const signIn = createAsyncThunk(
  "auth/signin",
  async (userData, thunkAPI) => {
    try {
      const { emailAddress, password } = userData;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await apiRequest.post(
        "/users/login",
        { emailAddress, password },
        config,
      );
      console.log("🚀 ~ data:", data);
      localStorage.setItem("authInfo", JSON.stringify(data));
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

export const signOut = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.clear("authInfo");
      await apiRequest.post("/users/logout");
      return;
    } catch (error) {
      console.log("🚀 ~ error:", error)
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const formattedData = {
        ...userData,
        university: {
          universityId: userData?.university?.universityId,
          shortcut: userData.university.shortcut,
        },
      };
      const { data } = await apiRequest.put(
        "/users/profile",
        {
          ...formattedData,
        },
        config,
      );
      localStorage.setItem("authInfo", JSON.stringify(data));
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

const setAuthInfo = (state, action) => {
  state.auth = action.payload;
};

const statusReset = (state) => {
  state.status = {
    setInfo: "idle",
    signup: "idle",
    signin: "idle",
    signout: "idle",
  };
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: statusReset,
    setAuth: setAuthInfo,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status.signup = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status.signup = "succeeded";
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status.signup = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status.signin = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status.signin = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status.signin = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      .addCase(signOut.pending, (state) => {
        state.auth = null;
        state.status.signout = "loading";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status.signout = "idle";
        state.auth = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status.setInfo = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status.setInfo = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status.setInfo = "failed";
        state.auth = null;
        state.error = action.payload;
      });
  },
});

export const { reset: authReset, setAuth, setRole } = authSlice.actions;
export default authSlice.reducer;
