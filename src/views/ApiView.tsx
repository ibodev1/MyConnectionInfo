/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Linking, ScrollView} from 'react-native';
import {
  Stack,
  Box,
  Text,
  VStack,
  ActivityIndicator,
  Wrap,
  ListItem,
} from '@react-native-material/core';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  setIpAddress,
  setWifiData,
  setLoading,
} from '../store/slices/wifiDataSlice';
import type {RootState} from '../store';
import {useEffect} from 'react';
import WifiManager from 'react-native-wifi-reborn';

const API_KEY = '784d49642889445c91021284f17cc871';

function ApiView({isConnected}: {isConnected: Boolean | null}): JSX.Element {
  const [error, setError] = useState<any | null>(null);
  const {data, loading} = useSelector((state: RootState) => state.wifiData);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWifiData = async () => {
      dispatch(setLoading(true));
      try {
        const {data: responseData} = await axios.get(
          `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}`,
        );
        dispatch(setWifiData(responseData));
        dispatch(setLoading(false));
        return responseData;
      } catch (err: any) {
        setError(err);
        WifiManager.getIP().then(
          ip => {
            dispatch(setIpAddress(ip));
          },
          () => {
            dispatch(setIpAddress('0.0.0.0'));
          },
        );
        return err;
      }
    };

    getWifiData();
  }, []);

  if (error) {
    return (
      <Stack fill spacing={4} p={4} bg="#fff">
        <VStack center bg="#ff0000" w="100%" h="50%" radius={8} fill>
          <Box>
            <Text variant="h1" color="#fff">
              Error!
            </Text>
          </Box>
          <Box mr={8}>
            <MaterialCommunityIcons name="alert" size={38} color="white" />
          </Box>
          <Box>
            <Text variant="h6" color="#fff">
              {error ? error.toString() : null}
            </Text>
          </Box>
        </VStack>
      </Stack>
    );
  }

  if (loading) {
    return (
      <Stack fill center bg="#fff">
        <ActivityIndicator size={100} color="black" />
      </Stack>
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      {isConnected ? (
        <Box w="100%" overflow="hidden">
          <ListItem
            onPress={() => {
              if (data && data.latitude && data.longitude) {
                Linking.openURL(
                  `geo:${data?.latitude},${data?.longitude}?q=${
                    data?.city + ' ' + data?.country
                  }`,
                );
              }
            }}
            onLongPress={() => {
              if (data && data.latitude && data.longitude) {
                console.log(data);
                // Linking.openURL(`geo:${data?.latitude},${data?.longitude}`);
              }
            }}
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Location
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.city && data?.country
                ? data?.city +
                  '[' +
                  data?.region_iso_code +
                  ']/' +
                  data?.country +
                  ' (' +
                  data?.country_code +
                  ')' +
                  ' [' +
                  data?.continent +
                  '/' +
                  data?.continent_code +
                  '] - ' +
                  data?.postal_code
                : 'No Location!'
            }
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="server-network"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Autonomous System
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.connection.autonomous_system_organization
                ? data?.connection.autonomous_system_organization +
                  ' (' +
                  data?.connection.autonomous_system_number +
                  ')'
                : 'No Autonomous System!'
            }
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="tools"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Connection Type
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.connection.connection_type
                ? data?.connection.connection_type
                : 'No Connection Type!'
            }
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="account-wrench"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Internet Service Provider
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.connection.isp_name
                ? data?.connection.isp_name
                : 'No Internet Service Provider!'
            }
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="domain"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Organization
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.connection.organization_name
                ? data?.connection.organization_name
                : 'No Organization!'
            }
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="clock-time-nine"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Timezone
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.timezone
                ? data?.timezone.name +
                  ' (' +
                  data?.timezone.abbreviation +
                  ')' +
                  ' - ' +
                  data?.timezone.current_time
                : 'No Timezone!'
            }
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="cash-multiple"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Currency
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.currency
                ? data?.currency.currency_name +
                  ' (' +
                  data?.currency.currency_code +
                  ')'
                : 'No Timezone!'
            }
          />
          <ListItem
            title={
              <Box>
                <Text variant="h6" color="#12123d">
                  VPN
                </Text>
              </Box>
            }
            leading={
              <MaterialCommunityIcons name="key" size={24} color="#12123d" />
            }
            trailing={
              <MaterialCommunityIcons
                name={
                  data?.security.is_vpn
                    ? 'check-circle-outline'
                    : 'close-circle-outline'
                }
                color={data?.security.is_vpn ? 'green' : 'red'}
                size={24}
              />
            }
          />
        </Box>
      ) : (
        <VStack spacing={12} fill center mt={12}>
          <Text variant="h5" color="red">
            Internet Connection Error!
          </Text>
          <Text variant="subtitle1">
            We need internet connection to use the app.
          </Text>
        </VStack>
      )}
    </ScrollView>
  );
}

export default ApiView;
