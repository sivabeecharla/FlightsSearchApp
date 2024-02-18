import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../resources';
import TextInputBox from '../components/TextInputBox';
import {Keyboard} from 'react-native';
import {SignUpProps} from '../types/types';
import {emailValidator, passwordValidator} from '../services/Validators';
import auth from '@react-native-firebase/auth';
import {Toaster} from '../services/Toaster';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {stackProps} from '../navigators/types';
import LoaderComponent from '../components/LoaderComponent';

const Signup: React.FC<SignUpProps> = () => {
  const navigation = useNavigation<stackProps>();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passRef = useRef<TextInput | null>(null);
  const emailValid = emailValidator(email);
  const passwordValid = passwordValidator(password);

  useFocusEffect(
    useCallback(() => {
      const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardVisible(true);
      });
      const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardVisible(false);
      });
      return () => {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
      };
    }, []),
  );

  const _validateFields = () => {
    if (passwordValid && emailValid) {
      _handleSignup();
    } else {
      setPassError(!passwordValid);
      setEmailError(!emailError);

    }
  };

  const _handleSignup = async () => {
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await AsyncStorage.setItem(
        resources.constants.userData,
        JSON.stringify({name: name}),
      );
      Toaster.success('Registration successful');
      setIsLoading(false);
      navigation.replace('Home');

    } catch (error) {
      setIsLoading(false);
      Toaster.error(error.message);
    }
  };

  return (
    <View>
      {isLoading ? (
        <LoaderComponent/>
      ) : (
        <>
          <TextInputBox
            label="Name"
            placeholder="Name"
            type="Name"
            isEditable={true}
            keyboardType="default"
            onChangeText={value => {
              setName(value);
            }}
            value={name}
            textRef={nameRef}
            setFocus={() => emailRef.current?.focus()}
            isError={nameError}
            width="90%"
          />

          <TextInputBox
            label="Email"
            placeholder="Email"
            type="Email"
            isEditable={true}
            keyboardType='email-address'
            onChangeText={value => {
              setEmail(value);
              if (emailValidator(value)) {
                setEmailError(false);
              } else {
                setEmailError(true);
              }
            }}
            value={email}
            textRef={emailRef}
            setFocus={() => {
              passRef.current?.focus();
            }}
            isError={emailError}
            width="90%"
          />

          {emailError && email.length == 0 && (
            <Text style={styles.errorText}>
              {resources.appConstants.Invalid_Email}
            </Text>
          )}

          {emailError && email.length > 0 && !emailValid && (
            <Text style={styles.errorText}>
              {resources.appConstants.Invalid_Email}
            </Text>
          )}

          <TextInputBox
            label="Password"
            placeholder="Password"
            type="Password"
            isEditable={true}
            keyboardType="default"
            onChangeText={value => {
              setPassword(value);
              if (passwordValidator(value)) {
                setPassError(false);
              } else {
                setPassError(true);
              }
            }}
            value={password}
            textRef={passRef}
            setFocus={() => {}}
            isError={passError}
            width="90%"
          />
          {passError && password.length == 0 && (
            <Text style={styles.errorText}>
              {resources.appConstants.Invalid_Password}
            </Text>
          )}

          {passError && password.length > 0 && !passwordValid && (
            <Text style={styles.errorText}>
              {resources.appConstants.PasswordError}
            </Text>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={_validateFields}>
            <Text style={styles.loginBtnTxt}>Create Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: resources.colors.button_orange,
    width: wp('90%'),
    height: hp('7%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  loginBtnTxt: {
    color: resources.colors.white,
    fontSize: hp('2.2%'),
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  errorText: {
    color: resources.colors.red,
    fontSize: hp('2%'),
    fontWeight: '400',
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
  },
});
export default Signup;
