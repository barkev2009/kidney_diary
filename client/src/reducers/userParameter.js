import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createParamAPI, deleteParamAPI, editParamAPI, getParamsByUserAPI } from '../api/userParameter';

export const getParamsByUser = createAsyncThunk(
    'user_parameter/getParamsByUser',
    getParamsByUserAPI
)
export const createParam = createAsyncThunk(
    'user_parameter/createParam',
    createParamAPI
)
export const editParam = createAsyncThunk(
    'user_parameter/editParam',
    editParamAPI
)
export const deleteParam = createAsyncThunk(
    'user_parameter/deleteParam',
    deleteParamAPI
)

const initialState = {
    data: [],
    active: false
};

export const userParameterSlice = createSlice({
    name: 'user_parameter',
    initialState,
    reducers: {
        setActive(state, action) {
            state.active = !state.active
        }
    },
    extraReducers: builder => {
        builder
            .addCase(
                getParamsByUser.fulfilled, (state, action) => {
                    state.data = action.payload
                }
            )
            .addCase(
                createParam.fulfilled, (state, action) => {
                    state.data.push(action.payload);
                }
            )
            .addCase(
                editParam.fulfilled, (state, action) => {
                    state.data.push(action.payload);
                    state.data = [...state.data.filter(i => i.uuid !== action.payload.uuid), action.payload]
                }
            )
            .addCase(
                deleteParam.fulfilled, (state, action) => {
                    if (action.payload.success) {

                    }
                    state.data.push(action.payload);
                    state.data = [...state.data.filter(i => i.uuid !== action.payload.userParameter.uuid)]
                }
            )
    }
});

const { reducer } = userParameterSlice;
export const { setActive } = userParameterSlice.actions
export default reducer
