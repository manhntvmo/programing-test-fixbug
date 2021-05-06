import { configureStore } from '@reduxjs/toolkit';
import spacexSlice from '../slices/spacex/SpaceX';

export const store = configureStore({
  reducer: {
    spacex: spacexSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
