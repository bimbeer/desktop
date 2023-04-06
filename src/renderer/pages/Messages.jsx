import * as React from 'react';
import ChatBox from 'renderer/components/Messages/ChatBox';
import Sidebar from 'renderer/components/Sidebar';

export default function Messages() {
  return (
    <>
      <Sidebar />
      <ChatBox />
    </>
  );
}
