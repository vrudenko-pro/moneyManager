import React from 'react';
import { Text } from 'react-native-paper';
import { styles } from './styles';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <Text style={styles.header}>{children}</Text>;
};

export default Header;
