import React from 'react';
import { Background, Logo, Header, Button, Paragraph } from '../../components';
import { ScreenNames } from '../../constants';

const StartScreen = ({ navigation }) => {
  const onLoginPress = () => navigation.navigate(ScreenNames.LoginScreen);

  const onRegisterPress = () => navigation.navigate(ScreenNames.RegisterScreen);

  return (
    <Background>
      <Logo />
      <Header>Money Manager</Header>
      <Paragraph>The easiest way to save your money</Paragraph>
      <Button mode="contained" onPress={onLoginPress}>
        Login
      </Button>
      <Button mode="outlined" onPress={onRegisterPress}>
        Sign Up
      </Button>
    </Background>
  );
};

export default StartScreen;
