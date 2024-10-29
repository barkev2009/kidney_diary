import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/user';
import itemReducer from '../reducers/item';
import userParameterReducer from '../reducers/userParameter';

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            item: itemReducer,
            userParameter: userParameterReducer
        }
    }
)