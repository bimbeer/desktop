import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import { db } from '../../firebase/firebase';
import ProfileInfoForm from './SetupFormSteps/ProfileInfoForm';
import ProfileDiscoverySettingsForm from './SetupFormSteps/ProfileDiscoverySettingsForm';
import ProfileFavBeerForm from './SetupFormSteps/ProfileFavBeerForm';

export default function SetupForm() {
  const userId = getUserFromLocalStorage();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formStep, setStep] = useState(1);
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState();
  const [geohash, setGeohash] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    description: '',
    gender: '',
    interest: '',
    location: '',
    range: 50,
    searchGlobal: false,
    searchLocal: false,
    beers: [],
  });
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(formStep + 1);
  };

  const handleBackStep = () => {
    setStep(formStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormSubmitting(true);
    let downloadURL;

    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(storageRef, selectedFile);
      downloadURL = await getDownloadURL(storageRef);
    }

    const userDocRef = doc(db, 'profile', userId);
    await setDoc(userDocRef, {
      ...profile,
      avatar: selectedFile ? downloadURL : profile.avatar,
      location: {
        label: city,
        position: {
          coordinates,
          geohash,
        },
      },
    });

    navigate('/profile');
  };

  useEffect(() => {
    const docRef = doc(db, 'profile', userId);

    async function fetchData() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    }
    fetchData();
  }, [userId]);

  return (
    <Flex minHeight="100vh" justify="center" align="center">
      <Box maxW="4xl" w="full">
        {formStep === 1 && (
          <ProfileInfoForm
            profile={profile}
            setProfile={setProfile}
            avatarPreview={profile.avatar}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            handleNextStep={handleNextStep}
          />
        )}
        {formStep === 2 && (
          <ProfileDiscoverySettingsForm
            profile={profile}
            setProfile={setProfile}
            city={profile.location}
            setCity={setCity}
            setGeohash={setGeohash}
            setCoordinates={setCoordinates}
            range={profile.range}
            searchGlobal={profile.searchGlobal}
            searchLocal={profile.searchLocal}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
        )}
        {formStep === 3 && (
          <ProfileFavBeerForm
            profile={profile}
            setProfile={setProfile}
            beers={profile.beers}
            handleBackStep={handleBackStep}
            handleSubmit={handleSubmit}
            isFormSubmitting={isFormSubmitting}
          />
        )}
      </Box>
    </Flex>
  );
}
