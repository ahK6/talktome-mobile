// store.ts

import { configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import { asyncErrorMiddleware } from "../utils/middlewares";

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(asyncErrorMiddleware),
  /* enhancers: (defaultEnhancers) => {
    if (__DEV__) {
      const { default: Reactotron } = require("@/src/utils/reactotron");
      return [...defaultEnhancers, Reactotron.createEnhancer()];
    }
    return defaultEnhancers;
  }, */
});

const persistor = persistStore(store);

// persistor.pause();
// persistor.flush().then(() => {
//   return persistor.purge();
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
