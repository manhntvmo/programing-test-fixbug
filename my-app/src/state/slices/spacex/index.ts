import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import spacexApi from '../../../api/spacexApi';
import { IFlight } from '../../../services/flight-services/flight.interface';

export const fetchListFlights = createAsyncThunk('flights/getFlights', async () => {
  try {
    const response = await spacexApi.get('');

    return response.data;
  } catch (err) {
    throw err;
  }
});

interface SpaceX {
  flights: IFlight[];
  status: string | null;
  error?: any;
}

const initialState: SpaceX = {
  flights: [],
  status: null,
};

const spacexSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchListFlights.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchListFlights.fulfilled, (state, action) => {
      state.flights = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchListFlights.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export default spacexSlice.reducer;
