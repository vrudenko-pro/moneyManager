import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';

const Logo = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const image = require('../../assets/logo.png');

  return <Image source={image} style={styles.image} />;
};

export default Logo;
