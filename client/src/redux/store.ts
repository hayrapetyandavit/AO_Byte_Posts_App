// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import type {} from "redux-thunk/extend-redux";

// import authReducer from "./reducers/authReducer";
// import postsReducer from "./reducers/postsReduser";
// import themeReducer from "./reducers/themeReducer";
// import filtersReducer from "./reducers/filtersReducer";
// import commentsReducer from "./reducers/commentsReduser";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   posts: postsReducer,
//   theme: themeReducer,
//   filters: filtersReducer,
//   comments: commentsReducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
// });

// export default store;


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

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

// Adjusted types for the persisted store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };

