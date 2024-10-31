import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { editItemAPI, getByDateAPI, getByUserAPI } from '../api/item';
import { TILE_ITEMS } from '../constants';

export const getByDate = createAsyncThunk(
    'item/getByDate',
    getByDateAPI
)
export const getByUser = createAsyncThunk(
    'item/getByUser',
    getByUserAPI
)
export const editItem = createAsyncThunk(
    'item/editItem',
    editItemAPI
)

const initialState = {
    data: {},
    userItems: [],
    tileType: TILE_ITEMS[0].value
};

export const userSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        clearItem(state, action) {
            state.data = {};
        },
        setTileType(state, action) {
            state.tileType = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(
                getByDate.fulfilled, (state, action) => {
                    state.data = action.payload
                }
            )
            .addCase(
                getByUser.fulfilled, (state, action) => {
                    state.userItems = action.payload
                }
            )
            .addCase(
                editItem.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.userItems = [...state.userItems.filter(i => i.uuid !== action.payload.uuid), action.payload];
                }
            )
    }
});

const { reducer } = userSlice;
export const { clearItem, setTileType } = userSlice.actions
export default reducer
