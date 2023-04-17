import React from 'react';
import { useParams } from 'react-router-dom';
import { HStack, Center } from '@chakra-ui/react';

import Sidebar from 'renderer/components/Sidebar';
import RecentChats from 'renderer/components/Messages/RecentChats';
import ChatBox from 'renderer/components/Messages/ChatBox';

export default function Messages() {
  const { pairId } = useParams();

  return (
    <>
      <Sidebar />
      <Center ml="100px" mr="20px">
        <HStack>
          <RecentChats />
          <ChatBox pairId={pairId} />
        </HStack>
      </Center>
    </>
  );
}
