/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { removeExpense } from '../../api/expense-api';
import { ScreenNames } from '../../constants';
import { StateContext } from '../../state';
import { Expense as ExpenseType } from '../../core/types';
import { getDate } from '../../core/utils';

interface ExpenseProps {
  item: ExpenseType;
}

const Expense = ({ item }: ExpenseProps) => {
  const { userData, deleteExpense } = useContext(StateContext);
  const navigation = useNavigation();
  const onDeletePress = useCallback(async () => {
    await removeExpense(userData.userId, item.id);
    deleteExpense(item.id);
  }, [deleteExpense, item.id, userData.userId]);

  const onEditPress = () =>
    navigation.navigate(ScreenNames.AddNewExpense, { item });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>{item.title}</Text>
        <Text>{`${item.amount} USD`}</Text>
        <TouchableOpacity onPress={onEditPress} style={styles.image}>
          <Image style={styles.img} source={require('../../assets/edit.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text>{item.category}</Text>
        <Text>{getDate(item.date)}</Text>
        <TouchableOpacity onPress={onDeletePress} style={styles.image}>
          <Image
            style={styles.img}
            source={require('../../assets/delete.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Expense;
