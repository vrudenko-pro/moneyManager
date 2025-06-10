import React from 'react';
import { View, Text } from 'react-native';
import {
  TextInput as Input,
  TextInputProps as PaperTextInputProps,
} from 'react-native-paper';
import { theme } from '../../core/theme';
import { styles } from './styles';

interface TextInputProps {
  errorText: string;
  description: string;
  props: PaperTextInputProps;
}

const TextInput = ({ errorText, description, ...props }: TextInputProps) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default TextInput;
