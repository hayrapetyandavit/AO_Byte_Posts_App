import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import type {} from "redux-thunk/extend-redux";

import postsReducer from "./reducers/postsReduser";
import themeReducer from "./reducers/themeReducer";
import filtersReducer from "./reducers/filtersReducer";
import allCommentsReducer from "./reducers/commentsReduser";

const rootReducer = combineReducers({
  posts: postsReducer,
  theme: themeReducer,
  filters: filtersReducer,
  allComments: allCommentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
