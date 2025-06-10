import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Background, Header, Button, Expense } from '../../components';
import { logoutUser } from '../../api/auth-api';
import { styles } from './styles';
import { ScreenNames } from '../../constants';
import { StateContext } from '../../state';

const Dashboard = ({ navigation }) => {
  const { userData } = useContext(StateContext);
  const onAddNewPress = () => navigation.navigate(ScreenNames.AddNewExpense);
  const sortedUserData = userData?.data?.sort((a, b) => a.date - b.date);

  return (
    <Background>
      <Header>Manage your money</Header>
      {sortedUserData?.length > 0 ? (
        <View style={styles.list}>
          <FlatList
            data={sortedUserData}
            renderItem={({ item }) => <Expense item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      ) : null}
      <View style={styles.button}>
        <Button style={styles.addNew} mode="outlined" onPress={onAddNewPress}>
          <Text style={styles.text}>Add new expense</Text>
        </Button>
        <Button mode="outlined" onPress={logoutUser}>
          Logout
        </Button>
      </View>
    </Background>
  );
};

export default Dashboard;
