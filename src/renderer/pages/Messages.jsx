import React from 'react';
import { useParams } from 'react-router-dom';

import ChatBox from 'renderer/components/Messages/ChatBox';
import Sidebar from 'renderer/components/Sidebar';

export default function Messages() {
  const { pairId } = useParams();

  return (
    <>
      <Sidebar />
      <ChatBox pairId={pairId} />
    </>
  );
}
