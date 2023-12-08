import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        task: {
            title: '',
            desc: '',
            date: '',
            status: '',
        },
        showModalNotif: false,
    },
    reducers: {
        setTask: (state, action) => {
            state.task = action.payload;
        },
        setShowModalNotif: (state, action) => {
            state.showModalNotif = action.payload;
        },
    },
});

export const { setTask, setShowModalNotif } = taskSlice.actions;
const taskReducer = taskSlice.reducer;
export default taskReducer;