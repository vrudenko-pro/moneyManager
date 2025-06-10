import { StyleSheet } from 'react-native';
import { theme } from '../../core/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
