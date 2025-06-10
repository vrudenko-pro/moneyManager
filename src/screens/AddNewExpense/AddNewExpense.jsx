import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Background,
  Header,
  Button,
  TextInput,
  BackButton,
} from '../../components';
import { styles } from './styles';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import { addNewExpense, editExpense } from '../../api/expense-api';
import { StateContext } from '../../state';
import { getDate } from '../../core/utils';
import moment from 'moment';

const AddNewExpense = ({ navigation, route }) => {
  const { item } = route?.params || {};

  const OPTIONS = [
    { label: 'Food', value: 'food' },
    { label: 'Transport', value: 'transport' },
    { label: 'Bills', value: 'bills' },
  ];

  const [title, setTitle] = useState(item?.title || '');
  const [amount, setAmount] = useState(item?.amount || 0);
  const [category, setCategory] = useState(
    OPTIONS[item?.category] || OPTIONS[0],
  );
  const isEdit = !!item?.id;
  const initDateValue = isEdit ? new Date(item.date) : new Date();
  const [date, setDate] = useState(initDateValue);
  const [open, setOpen] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [amountError, setAmountError] = useState('');
  const { userData, addCurrentExpense, editCurrentExpense } =
    useContext(StateContext);

  const onAddNewPress = useCallback(async () => {
    if (!title) {
      setTitleError("Title can't be empty");
      return;
    }
    if (!amount) {
      setAmountError("Amount can't be empty");
      return;
    }
    const newData = await addNewExpense(userData.userId, {
      title,
      amount,
      category: category.value,
      date: date.getTime(),
    });
    addCurrentExpense(newData);
    navigation.goBack();
  }, [title, amount]);

  const onEditExpense = useCallback(async () => {
    const newData = await editExpense(userData.userId, item.id, {
      title,
      amount,
      category: category.value,
      date: date.getTime(),
    });
    editCurrentExpense(newData);
    navigation.goBack();
  }, [title, amount, category, date]);

  const convertedDate = item?.date
    ? getDate(item.date)
    : moment(date.getTime()).format('MMM Do YY');

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>{isEdit ? 'Edit expense' : 'Add new expense'}</Header>
      <TextInput
        label={isEdit ? 'Edit expense name' : 'Add new expense name'}
        returnKeyType="next"
        value={title}
        onChangeText={title => setTitle(title)}
        error={!!titleError}
        errorText={titleError}
        autoCapitalize="none"
      />
      <TextInput
        label="Amount"
        returnKeyType="next"
        value={amount}
        onChangeText={amount => setAmount(amount)}
        error={!!amountError}
        errorText={amountError}
        autoCapitalize="none"
        keyboardType="numeric"
      />
      <View style={{ width: '100%' }}>
        <SelectDropdown
          renderButton={() => (
            <View>
              <Text>{category?.label || OPTIONS[0].label}</Text>
            </View>
          )}
          renderItem={item => (
            <View style={{ height: 30 }}>
              <Text>{item.label}</Text>
            </View>
          )}
          data={OPTIONS}
          onSelect={selectedItem => setCategory(selectedItem)}
        />
      </View>
      <View style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{ justifyContent: 'flex-end' }}>
            <Text>Select date</Text>
          </TouchableOpacity>
          <Text>{convertedDate}</Text>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          style={styles.addNew}
          mode="outlined"
          onPress={item?.id ? onEditExpense : onAddNewPress}>
          <Text style={{ color: 'white' }}>
            {isEdit ? 'Edit expense' : 'Add new expense '}
          </Text>
        </Button>
      </View>
    </Background>
  );
};

export default AddNewExpense;
