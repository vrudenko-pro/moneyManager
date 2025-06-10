import { StyleSheet } from 'react-native';
import { theme } from '../../core/theme';

export const styles = StyleSheet.create({
  addNew: {
    backgroundColor: theme.colors.secondary,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  list: { flex: 1, width: '100%' },
  text: { color: theme.colors.surface },
});
