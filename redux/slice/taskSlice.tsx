import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        task: {
        title: '',
        desc: '',
        date: '',
        },
    },
    reducers: {
        setTask: (state, action) => {
            state.task = action.payload;
        },
    },
});

export const { setTask } = taskSlice.actions;
const taskReducer = taskSlice.reducer;
export default taskReducer;