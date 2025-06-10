import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';

export const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: isDark ? 'black' : theme.colors.surface,
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: getStatusBarHeight() + 10,
    },
  });
