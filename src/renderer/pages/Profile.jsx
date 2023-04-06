import * as React from 'react';
import ProfilePanel from 'renderer/components/Profile/ProfilePanel';
import Sidebar from 'renderer/components/Sidebar';

export default function Profile() {
  return (
    <>
      <Sidebar />
      <ProfilePanel />
    </>
  );
}
