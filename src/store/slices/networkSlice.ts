import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface INetworkData {
  ip: string | null;
  status: boolean | null;
  bssid: string | null;
  signalStrength: number | null;
  ssid: string | null;
  frequency: number | null;
}

const initialState: INetworkData = {
  ip: null,
  status: null,
  bssid: null,
  ssid: null,
  signalStrength: null,
  frequency: null,
};

export const networkSlice = createSlice({
  name: 'wifiData',
  initialState: {
    data: initialState,
  },
  reducers: {
    setNetworkData: (state, action: PayloadAction<INetworkData>) => {
      state.data = action.payload;
    },
  },
});

export const {setNetworkData} = networkSlice.actions;

export default networkSlice.reducer;
