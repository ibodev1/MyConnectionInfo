/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, Linking, ScrollView} from 'react-native';
import useSWR from 'swr';
import {
  Stack,
  Box,
  Text,
  VStack,
  ActivityIndicator,
  Wrap,
  ListItem,
} from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const API_KEY = '784d49642889445c91021284f17cc871';
const fetcher = (url: string) => axios.get(url).then(res => res.data);

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): JSX.Element {
  const [isConnected, setIsConnected] = useState<Boolean | null>(false);

  const {data, error} = useSWR(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}`,
    fetcher,
  );

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

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

  if (!data) {
    return (
      <Stack fill center bg="#fff">
        <ActivityIndicator size={100} color="black" />
      </Stack>
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <Stack fill center spacing={12} p={4}>
        <Wrap bg="#12123d" w="100%" radius={8} p={12} overflow="hidden">
          <Box mr={8}>
            <Image
              source={{uri: data?.flag.png}}
              style={{width: 75, height: 50}}
            />
          </Box>
          <Wrap fill center>
            <Text variant="h4" color="#fff">
              {isConnected
                ? data?.ip_address
                  ? data?.ip_address
                  : 'No IP Address!'
                : 'No Internet!'}
            </Text>
          </Wrap>
        </Wrap>
        {isConnected ? (
          <Box bg="#12123d" w="100%" overflow="hidden">
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
                  Linking.openURL(`geo:${data?.latitude},${data?.longitude}`);
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
              title="VPN"
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
          <VStack spacing={12} fill center>
            <Text variant="h5" color="red">
              Internet Connection Error!
            </Text>
            <Text variant="subtitle1">
              We need internet connection to use the app.
            </Text>
          </VStack>
        )}
      </Stack>
    </ScrollView>
  );
}

export default App;
