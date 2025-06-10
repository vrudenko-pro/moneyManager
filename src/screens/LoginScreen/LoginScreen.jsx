import React, { useState, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  BackButton,
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  Toast,
} from '../../components';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { loginUser } from '../../api/auth-api';
import { StateContext } from '../../state';
import { ScreenNames } from '../../constants';
import { styles } from './styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { loadExpense } = useContext(StateContext);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    const response = await loginUser({
      email: email.value,
      password: password.value,
    });
    if (response.error) {
      setError(response.error);
    }
    setLoading(false);

    navigation.navigate(ScreenNames.Dashboard);
    loadExpense(response.data);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}></View>
      <Button loading={loading} mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.replace(ScreenNames.RegisterScreen)}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
};

export default LoginScreen;
