import React from 'react';
import { Snackbar } from 'react-native-paper';
import { View, Text } from 'react-native';
import { theme } from '../../core/theme';
import { styles } from './styles';

interface TextInputProps {
  message: string;
  onDismiss: () => void;
  type: string;
}

const Toast = ({ type = 'error', message, onDismiss }: TextInputProps) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        duration={3000}
        onDismiss={onDismiss}
        style={{
          backgroundColor:
            type === 'error' ? theme.colors.error : theme.colors.success,
        }}>
        <Text style={styles.content}>{message}</Text>
      </Snackbar>
    </View>
  );
};

export default Toast;
