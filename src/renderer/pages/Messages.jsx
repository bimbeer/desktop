import * as React from 'react';
import ChatBox from 'renderer/components/ChatBox';
import Sidebar from 'renderer/components/Sidebar';

function Messages() {
  return (
    <>
      <Sidebar />
      <ChatBox />
    </>
  );
}
export default Messages;
