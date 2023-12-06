import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

// Import Reducers
import taskReducer from '../slice/taskSlice';

// Import Redux Persist
import storage from 'redux-persist/lib/storage'; // or 'redux-persist/lib/storage/session' for session storage
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

// Define the persistConfig
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  // Add any other config options you need
};

const rootReducer = combineReducers({
    // Add your reducers here
    task: taskReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            // Add other middleware here
        ),
    devTools: true,
});

// Export an assembled wrapper
export const wrapper = createWrapper(() => store);