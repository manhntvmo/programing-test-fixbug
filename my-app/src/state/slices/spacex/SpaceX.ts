import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import spacexApi from '../../../api/spacexApi';

export const fetchUserById = createAsyncThunk('flights/getFlights', async () => {
  try {
    const response = await spacexApi.get('');

    return response.data;
  } catch (err) {
    return err;
  }
});

interface Flights {
  flight_number: 109;
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
  };
  launch_success: boolean;
  upcoming: boolean;
};

interface SpaceX {
  flights: Flights[];
  status: string | null;
};

const initialState: SpaceX = {
  flights: [],
  status: null,
};

const spacexSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserById.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.flights = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export default spacexSlice.reducer;
