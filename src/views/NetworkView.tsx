/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  ListItem,
  Stack,
  Text,
  VStack,
  Wrap,
} from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import WifiManager from 'react-native-wifi-reborn';
import {INetworkData, setNetworkData} from '../store/slices/networkSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {ScrollView} from 'react-native';

function NetworkView({
  isConnected,
}: {
  isConnected: Boolean | null;
}): JSX.Element {
  const [error, setError] = useState<any | null>(null);
  const {data} = useSelector((state: RootState) => state.network);
  const dispatch = useDispatch();

  useEffect(() => {
    const getNetworkData = async () => {
      try {
        const ip = (await WifiManager.getIP()) || null;
        const status = (await WifiManager.connectionStatus()) || null;
        const bssid = (await WifiManager.getBSSID()) || null;
        const signalStrength =
          (await WifiManager.getCurrentSignalStrength()) || null;
        const ssid = (await WifiManager.getCurrentWifiSSID()) || null;
        const frequency = (await WifiManager.getFrequency()) || null;
        const syncData: INetworkData = {
          ip,
          status,
          bssid,
          ssid,
          signalStrength,
          frequency,
        };
        dispatch(setNetworkData(syncData));
        return syncData;
      } catch (err) {
        setError(err);
        return err;
      }
    };

    getNetworkData();
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

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      {isConnected ? (
        <Box w="100%" overflow="hidden">
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="information"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Ip Address
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={data?.ip ? data?.ip : 'No Ip Address!'}
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="information"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Bssid
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={data?.bssid ? data?.bssid : 'No BSSID!'}
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="information"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Ssid
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={data?.ssid ? data?.ssid : 'No SSID!'}
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="information"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Frequency
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.frequency ? data?.frequency.toString() : 'No FREQUENCY!'
            }
          />
          <ListItem
            title={
              <Wrap fill center>
                <Box mr={10}>
                  <MaterialCommunityIcons
                    name="information"
                    size={18}
                    color="#12123d"
                  />
                </Box>
                <Box>
                  <Text variant="h6" color="#12123d">
                    Signal Strength
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.signalStrength
                ? data?.signalStrength.toString()
                : 'No Signal Strength!'
            }
          />
          <ListItem
            title={
              <Box>
                <Text variant="h6" color="#12123d">
                  Status
                </Text>
              </Box>
            }
            leading={
              <MaterialCommunityIcons
                name="alert-rhombus"
                size={24}
                color="#12123d"
              />
            }
            trailing={
              <MaterialCommunityIcons
                name={
                  data?.status ? 'check-circle-outline' : 'close-circle-outline'
                }
                color={data?.status ? 'green' : 'red'}
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

export default NetworkView;
