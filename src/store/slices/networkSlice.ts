import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface INetworkData {
  bssid: string | null;
  frequency: number | null;
  ipAddress: string | null;
  isConnectionExpensive: boolean | null;
  linkSpeed: number | null;
  rxLinkSpeed: number | null;
  ssid: string | null;
  strength: number | null;
  subnet: string | null;
  txLinkSpeed: number | null;
}

const initialState: INetworkData = {
  bssid: null,
  frequency: null,
  ipAddress: null,
  isConnectionExpensive: null,
  linkSpeed: null,
  rxLinkSpeed: null,
  ssid: null,
  strength: null,
  subnet: null,
  txLinkSpeed: null,
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
