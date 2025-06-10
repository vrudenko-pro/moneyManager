import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { RegisteredStyle, ViewStyle } from 'react-native';
import { theme } from '../../core/theme';
import { styles } from './styles';

type ButtonProps = {
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  style: RegisteredStyle<ViewStyle>;
  children: React.ReactNode;
};

const Button = ({ mode, style, children, ...props }: ButtonProps) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}>
      {children}
    </PaperButton>
  );
};

export default Button;
