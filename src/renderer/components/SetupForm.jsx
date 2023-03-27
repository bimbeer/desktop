import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import { setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase/firebase';
import ProfileInfoForm from './SetupFormSteps/ProfileInfoForm';
import ProfileDiscoverySettingsForm from './SetupFormSteps/ProfileDiscoverySettingsForm';
import ProfileFavBeerForm from './SetupFormSteps/ProfileFavBeerForm';

export default function SetupForm() {
  const userId = getUserFromLocalStorage();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    about: '',
    gender: '',
    interest: '',
    location: '',
    range: 50,
    isGlobal: false,
    isLocal: false,
    selectedBeers: [],
  });
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
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
      avatar: downloadURL,
      location: city,
    });
    navigate('/profile');
  };

  return (
    <Flex minHeight="100vh" justify="center" align="center">
      <Box maxW="4xl" w="full">
        {step === 1 && (
          <ProfileInfoForm
            profile={profile}
            setProfile={setProfile}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <ProfileDiscoverySettingsForm
            profile={profile}
            setProfile={setProfile}
            city={city}
            setCity={setCity}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
        )}
        {step === 3 && (
          <ProfileFavBeerForm
            profile={profile}
            setProfile={setProfile}
            handleBackStep={handleBackStep}
            handleSubmit={handleSubmit}
            isFormSubmitting={isFormSubmitting}
          />
        )}
      </Box>
    </Flex>
  );
}
