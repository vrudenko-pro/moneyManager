import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

type BackButtonProps = {
  goBack: () => void;
};

const BackButton = ({ goBack }: BackButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const image = require('../../assets/arrow_back.png');

  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image style={styles.image} source={image} />
    </TouchableOpacity>
  );
};

export default BackButton;
