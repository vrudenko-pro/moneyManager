import { StyleSheet } from 'react-native';
import { theme } from '../../core/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.inverseOnSurface,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { width: 20, height: 20 },
});
