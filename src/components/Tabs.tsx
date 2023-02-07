/* eslint-disable react-native/no-inline-styles */
import {
  Flex,
  HStack,
  Pressable,
  Text,
  useTheme,
} from '@react-native-material/core';
import React from 'react';

interface ITab {
  title: string;
  page: number;
}

const TabList: ITab[] = [
  {
    title: 'Connection',
    page: 0,
  },
  {
    title: 'Network',
    page: 1,
  },
];

function Tabs({
  pagerViweRef,
  currentPage,
}: {
  pagerViweRef: any;
  currentPage: Number | null;
}) {
  const theme = useTheme();
  return (
    <HStack>
      {TabList.map((element, index) => {
        return (
          <Pressable
            key={index}
            style={{flex: 1}}
            onPress={() => {
              pagerViweRef.current?.setPage(element.page);
            }}>
            <Flex
              center
              h={44}
              borderBottom={2}
              borderColor={
                currentPage === element.page
                  ? theme.palette.primary.main
                  : '#ddd'
              }>
              <Text>{element.title}</Text>
            </Flex>
          </Pressable>
        );
      })}
    </HStack>
  );
}

export default Tabs;
