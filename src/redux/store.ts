import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authService } from './api/auth';
import { branchService } from './api/branch';
import { comboBoxService } from './api/comboBox';
import { envService } from './api/env';
import { historyJobService } from './api/historyJob';
import { jobService } from './api/job';
import { jobGroupService } from './api/jobGroup';
import { repositoryService } from './api/repository';
import layoutReducer from './layoutSlice';

const rootReducer = combineReducers({
  layout: layoutReducer,
  [authService.reducerPath]: authService.reducer,
  [repositoryService.reducerPath]: repositoryService.reducer,
  [envService.reducerPath]: envService.reducer,
  [branchService.reducerPath]: branchService.reducer,
  [jobService.reducerPath]: jobService.reducer,
  [jobGroupService.reducerPath]: jobGroupService.reducer,
  [comboBoxService.reducerPath]: comboBoxService.reducer,
  [historyJobService.reducerPath]: historyJobService.reducer,
});

const apiMiddleware = [
  authService.middleware,
  repositoryService.middleware,
  envService.middleware,
  branchService.middleware,
  jobService.middleware,
  jobGroupService.middleware,
  comboBoxService.middleware,
  historyJobService.middleware,
];
const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
