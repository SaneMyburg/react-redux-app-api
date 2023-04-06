import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    return data.results;
  } catch (error) {
    return error.response.data
  }
});

const initialState = {
  entities: [],
  loading: 'idle',
} 

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   state.users = [...state.users, action.payload];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = 'failed';
    });

  }
});
export { fetchUsers}
export default usersSlice.reducer;