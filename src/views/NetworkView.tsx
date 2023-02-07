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
import {INetworkData, setNetworkData} from '../store/slices/networkSlice';
import NetInfo from '@react-native-community/netinfo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {ScrollView} from 'react-native';

function NetworkView({
  isConnected,
  locationGranted,
}: {
  isConnected: Boolean | null;
  locationGranted: Boolean | null;
}): JSX.Element {
  const [error, setError] = useState<any | null>(null);
  const {data} = useSelector((state: RootState) => state.network);
  const dispatch = useDispatch();

  useEffect(() => {
    const getNetworkData = async () => {
      try {
        const syncData = await NetInfo.fetch('wifi');
        const newData: INetworkData = {
          //@ts-ignore
          bssid: syncData.details?.bssid,
          //@ts-ignore
          frequency: syncData.details?.frequency,
          //@ts-ignore
          ipAddress: syncData.details?.ipAddress,
          //@ts-ignore
          isConnectionExpensive: syncData.details?.isConnectionExpensive,
          //@ts-ignore
          linkSpeed: syncData.details?.linkSpeed,
          //@ts-ignore
          rxLinkSpeed: syncData.details?.rxLinkSpeed,
          //@ts-ignore
          ssid: syncData.details?.ssid,
          //@ts-ignore
          strength: syncData.details?.strength,
          //@ts-ignore
          subnet: syncData.details?.subnet,
          //@ts-ignore
          txLinkSpeed: syncData.details?.txLinkSpeed,
        };
        dispatch(setNetworkData(newData));
        return syncData;
      } catch (err) {
        setError(err);
        return err;
      }
    };

    getNetworkData();
  }, [locationGranted]);

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
                    Local Ip Address
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={data?.ipAddress ? data?.ipAddress : 'No Ip Address!'}
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
                    Subnet
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={data?.subnet ? data?.subnet : 'No SSID!'}
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
              data?.strength ? data?.strength.toString() : 'No Signal Strength!'
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
                    Link Speed
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.linkSpeed
                ? data?.linkSpeed.toString()
                : 'No Signal Strength!'
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
                    Link Speed (Rx)
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.rxLinkSpeed
                ? data?.rxLinkSpeed.toString()
                : 'No Signal Strength!'
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
                    Link Speed (Tx)
                  </Text>
                </Box>
              </Wrap>
            }
            secondaryText={
              data?.txLinkSpeed
                ? data?.txLinkSpeed.toString()
                : 'No Signal Strength!'
            }
          />
          <ListItem
            title={
              <Box>
                <Text variant="h6" color="#12123d">
                  Expensive Connection
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
                  data?.isConnectionExpensive
                    ? 'check-circle-outline'
                    : 'close-circle-outline'
                }
                color={data?.isConnectionExpensive ? 'green' : 'red'}
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
