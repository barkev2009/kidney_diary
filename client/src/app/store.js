import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/user';
import itemReducer from '../reducers/item';

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            item: itemReducer
        }
    }
)