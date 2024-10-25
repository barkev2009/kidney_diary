import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getByDateAPI } from '../api/item';

export const getByDate = createAsyncThunk(
    'item/getByDate',
    getByDateAPI
)

const initialState = {
    data: {}
};

export const userSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(
                getByDate.fulfilled, (state, action) => {
                    console.log(action.payload);
                }
            )
    }
});

const { reducer } = userSlice;
// export const { setIsAuth, setUser } = userSlice.actions
export default reducer
