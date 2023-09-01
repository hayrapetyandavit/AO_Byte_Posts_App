import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkDispatch } from "redux-thunk";

import authReducer from "./reducers/authReducer";
import postsReducer from "./reducers/postsReduser";
import themeReducer from "./reducers/themeReducer";
import filtersReducer from "./reducers/filtersReducer";
import commentsReducer from "./reducers/commentsReduser";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  theme: themeReducer,
  filters: filtersReducer,
  comments: commentsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export { store, persistor };
