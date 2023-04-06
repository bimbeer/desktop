/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import BimbeerCard from 'renderer/components/Dashboard/BimbeerCard.jsx';
import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import { Center, Spinner, Text, Flex, Card } from '@chakra-ui/react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import { db } from '../firebase/firebase';

export default function Dashboard() {
  const [profileData, setProfileData] = useState();
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isCardLoading, setIsCardLoading] = useState(true);

  useEffect(() => {
    const userId = getUserFromLocalStorage();
    const docRef = doc(db, 'profile', userId);

    async function fetchData() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getUsersWithMatchingBeersAndInterests() {
      setIsCardLoading(true);
      const userId = getUserFromLocalStorage();
      let matchedUsers = [];

      const genders = ['Man', 'Woman', 'Other'];
      const interests = [profileData.gender, 'All'];

      async function getMatchedUsers(gender, interest) {
        const beerChunks = [];
        for (let i = 0; i < profileData.beers.length; i += 10) {
          beerChunks.push(profileData.beers.slice(i, i + 10));
        }

        const promises = beerChunks.map(async (beers) => {
          let q;
          if (profileData.interest === 'All') {
            q = query(
              collection(db, 'profile'),
              where('beers', 'array-contains-any', beers),
              where('gender', '==', gender),
              where('__name__', '!=', userId),
              where('interest', '==', interest)
            );
          } else {
            q = query(
              collection(db, 'profile'),
              where('beers', 'array-contains-any', beers),
              where('interest', '==', profileData.gender),
              where('gender', '==', profileData.interest),
              where('__name__', '!=', userId)
            );
          }
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((document) => {
            matchedUsers.push(document.data());
          });
        });

        await Promise.all(promises);
      }

      const promises = [];
      for (const gender of genders) {
        for (const interest of interests) {
          promises.push(getMatchedUsers(gender, interest));
        }
      }
      await Promise.all(promises);

      matchedUsers = [...new Set(matchedUsers)];
      setUsers(matchedUsers);
      setIsCardLoading(false);
    }

    if (profileData) {
      getUsersWithMatchingBeersAndInterests();
    }
  }, [profileData]);

  const handleUserAction = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((prevIndex) => prevIndex + 1);
    }
  };

  const renderContent = () => {
    if (isCardLoading) {
      return (
        <Center h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.700"
            color="yellow.500"
            size="xl"
          />
        </Center>
      );
    }
    if (users.length > 0) {
      return (
        <BimbeerCard
          key={users[currentUserIndex].username}
          user={users[currentUserIndex]}
          onUserAction={handleUserAction}
        />
      );
    }
    return (
      <Flex
        display={isCardLoading ? 'none' : 'flex'}
        minH="100vh"
        align="center"
        justify="center"
        ml="100px"
        mr="20px"
      >
        <Card p={10} bg="whiteAlpha.100" maxW={650}>
          <Center>
            <Text color="white">
              It seems like we have no suggestions ready for you at the moment,
              consider enabling global search or wait for new people!
            </Text>
          </Center>
        </Card>
      </Flex>
    );
  };

  return (
    <>
      <Sidebar />
      {renderContent()}
    </>
  );
}
