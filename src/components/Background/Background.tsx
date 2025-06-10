import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  useColorScheme,
} from 'react-native';
import { getStyles } from './styles';

type BackgroundProps = {
  children: React.ReactNode;
};

const Background = ({ children }: BackgroundProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const image = require('../../assets/background_dot.png');
  const styles = getStyles(isDarkMode);

  return (
    <ImageBackground
      source={image}
      resizeMode="repeat"
      style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Background;
