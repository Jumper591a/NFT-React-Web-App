import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";

export const connectWallet = createSlice({
  name: "connectWallet",
  initialState: { status: false, account: "" },
  reducers: {
    activate: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = true;
      state.account = payload;
    },
    deactivate: (state) => {
      state.status = false;
      state.account = "";
    },
  },
});

export const formData = createSlice({
  name: "formData",
  initialState: {
    swagType: "",
    nftName: "",
    nftDescription: "",
  },
  reducers: {
    setFormData: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.swagType = payload.swagType;
      state.nftName = payload.nftName;
      state.nftDescription = payload.nftDescription;
    },
    setFormEmpty: (state) => {
      state.swagType = "";
      state.nftName = "";
      state.nftDescription = "";
    },
  },
});

export const ipfsData = createSlice({
  name: "ipfsData",
  initialState: {
    status: false,
    title: "",
    description: "",
    swagType: "",
    swagScore: "",
    legacy: "",
    swagLevel: "",
    video: "",
    image: "",
  },
  reducers: {
    setIpfsData: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = true;
      state.title = payload.title;
      state.description = payload.description;
      state.swagType = payload.swagType;
      state.swagScore = payload.swagScore;
      state.legacy = payload.legacy;
      state.swagLevel = payload.swagLevel;
      state.video = payload.video;
      state.image = payload.image;
    },
    setIpfsEmpty: (state) => {
      state.status = false;
      state.title = "";
      state.description = "";
      state.swagType = "";
      state.swagScore = "";
      state.legacy = "";
      state.swagLevel = "";
      state.video = "";
      state.image = "";
    },
  },
});

export const nftLoading = createSlice({
  name: "nftLoading",
  initialState: false,
  reducers: {
    setNftLoading: (state) => true,
    setLoadingOff: (state) => false,
  },
});

export const { activate, deactivate } = connectWallet.actions;
export const { setFormData, setFormEmpty } = formData.actions;
export const { setIpfsData, setIpfsEmpty } = ipfsData.actions;
export const { setNftLoading, setLoadingOff } = nftLoading.actions;

const __reducers = {
  connectWallet: connectWallet.reducer,
  formData: formData.reducer,
  ipfsData: ipfsData.reducer,
  nftLoading: nftLoading.reducer,
};

const middleware = [...getDefaultMiddleware(), logger];
export const store = configureStore({
  reducer: __reducers,
  middleware,
  devTools: true,
});

export default store;
