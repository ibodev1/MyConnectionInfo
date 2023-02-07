import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Connection {
  autonomous_system_organization: string;
  autonomous_system_number: number;
  connection_type: string;
  isp_name: string;
  organization_name: string;
}

export interface Timezone {
  name: string;
  abbreviation: string;
  current_time: string;
}

export interface Currency {
  currency_name: string;
  currency_code: string;
}

export interface Security {
  is_vpn: Boolean;
}

export interface Flag {
  png: string;
}

export type IpAddress = string;

export interface IWifiData {
  ip_address: IpAddress;
  city: string;
  country: string;
  country_code: string;
  region_iso_code: string;
  continent: string;
  continent_code: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  connection: Connection;
  timezone: Timezone;
  currency: Currency;
  security: Security;
  flag: Flag;
}

const initialState: IWifiData = {
  ip_address: '',
  city: '',
  country: '',
  country_code: '',
  region_iso_code: '',
  continent: '',
  continent_code: '',
  postal_code: '',
  latitude: 0,
  longitude: 0,
  connection: {
    autonomous_system_number: 0,
    autonomous_system_organization: '',
    connection_type: '',
    isp_name: '',
    organization_name: '',
  },
  currency: {
    currency_code: '',
    currency_name: '',
  },
  timezone: {
    abbreviation: '',
    current_time: '',
    name: '',
  },
  security: {
    is_vpn: false,
  },
  flag: {
    png: 'https://static.abstractapi.com/country-flags/US_flag.png',
  },
};

export const wifiDataSlice = createSlice({
  name: 'wifiData',
  initialState: {
    data: initialState,
    loading: true,
  },
  reducers: {
    setWifiData: (state, action: PayloadAction<IWifiData>) => {
      const data = action.payload;
      const newState: IWifiData = {
        ip_address: data.ip_address,
        city: data.city,
        country: data.country,
        country_code: data.country_code,
        continent: data.continent,
        continent_code: data.continent_code,
        connection: data.connection,
        currency: data.currency,
        postal_code: data.postal_code,
        latitude: data.latitude,
        longitude: data.longitude,
        region_iso_code: data.region_iso_code,
        security: data.security,
        timezone: data.timezone,
        flag: {
          png: data.flag.png,
        },
      };
      state.data = newState;
    },
    setIpAddress: (state, action: PayloadAction<IpAddress>) => {
      state.data.ip_address = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setWifiData, setIpAddress, setLoading} = wifiDataSlice.actions;

export default wifiDataSlice.reducer;
