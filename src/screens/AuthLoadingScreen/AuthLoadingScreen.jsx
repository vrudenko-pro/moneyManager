import React, { useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { Background } from '../../components';
import { theme } from '../../core/theme';
import auth from '@react-native-firebase/auth';
import { ScreenNames } from '../../constants';
import { StateContext } from '../../state';
import { getUserData } from '../../api/expense-api';

const AuthLoadingScreen = ({ navigation }) => {
  const { setUserData } = useContext(StateContext);

  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      if (user) {
        const userData = await getUserData(user.uid);
        setUserData(userData);
        // User is logged in
        navigation.navigate(ScreenNames.Dashboard);
      } else {
        // User is not logged in
        navigation.navigate(ScreenNames.StartScreen);
      }
    });
  }, []);

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default AuthLoadingScreen;
