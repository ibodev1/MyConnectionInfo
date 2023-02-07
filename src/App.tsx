/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Image, PermissionsAndroid} from 'react-native';
import {Stack, Box, Text, Wrap, useTheme} from '@react-native-material/core';
import NetInfo from '@react-native-community/netinfo';
import PagerView from 'react-native-pager-view';
import ApiView from './views/ApiView';
import Tabs from './components/Tabs';
import WifiManager from 'react-native-wifi-reborn';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './store';
import {setIpAddress} from './store/slices/wifiDataSlice';
import NetworkView from './views/NetworkView';

function App(): JSX.Element {
  const {data, loading} = useSelector((state: RootState) => state.wifiData);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState<Boolean | null>(false);
  const [locationGranted, setLocationGranted] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState<Number | null>(0);
  const pagerViweRef = useRef(null);
  const theme = useTheme();
  theme.palette.primary.main = '#12123d';

  useEffect(() => {
    const checkLocationPermission = async () => {
      const locationGrantedResult: string = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      const isLocationGranted: Boolean =
        locationGrantedResult === PermissionsAndroid.RESULTS.GRANTED;
      setLocationGranted(isLocationGranted);
      try {
      } catch (error) {
        console.error(error);
      }
    };

    checkLocationPermission();
  }, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

      if (!state.isConnected) {
        WifiManager.getIP().then(
          ip => {
            dispatch(setIpAddress(ip));
          },
          () => {
            dispatch(setIpAddress('0.0.0.0'));
          },
        );
      }
    });
  }, [isConnected]);

  return (
    <Stack fill spacing={12} p={4} bg="#fff">
      <Wrap
        bg={theme.palette.primary.main}
        w="100%"
        radius={8}
        p={12}
        overflow="hidden">
        <Box mr={8}>
          {loading ? null : (
            <Image
              source={{uri: data?.flag.png}}
              style={{width: 75, height: 50}}
            />
          )}
        </Box>
        <Wrap fill center>
          <Text variant="h4" color="#fff">
            {loading
              ? 'Loading..'
              : data?.ip_address
              ? data?.ip_address
              : 'No IP Address!'}
          </Text>
        </Wrap>
      </Wrap>
      <Tabs pagerViweRef={pagerViweRef} currentPage={currentPage} />
      <PagerView
        ref={pagerViweRef}
        style={{flex: 1}}
        initialPage={0}
        orientation="horizontal"
        scrollEnabled
        onPageSelected={e => {
          const currentPosition: number = e.nativeEvent.position;
          setCurrentPage(
            typeof currentPosition === 'number' ? currentPosition : 0,
          );
        }}>
        <ApiView isConnected={isConnected} />
        <NetworkView isConnected={isConnected} />
      </PagerView>
    </Stack>
  );
}

export default App;
