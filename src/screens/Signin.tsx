import React, {useState, useRef, useEffect} from 'react';
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
import {SignInProps} from '../types/types';
import {emailValidator, passwordValidator} from '../services/Validators';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/LoaderComponent';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toaster} from '../services/Toaster';
import {stackProps} from '../navigators/types';
import LoaderComponent from '../components/LoaderComponent';

const Signin: React.FC<SignInProps> = () => {
  const navigation = useNavigation<stackProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordValid = passwordValidator(password);
  const emailValid = emailValidator(email);

  const _validateFields = () => {
    if (emailValid) {
      _handleLogin();
    } else {
      setEmailError(!emailValid);
      setPassError(!passwordValid);
    }
  };

  const _handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
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
        <LoaderComponent />
      ) : (
        <>
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
            <Text style={styles.loginBtnTxt}>Log in</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 10,
    width: '100%',
    height: hp('8%'),
    backgroundColor: '#fff',
  },
  modalArrow: {
    width: wp('15%'),
    // backgroundColor: 'red',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: hp('3%'),
    fontWeight: '600',
    marginLeft: wp('5%'),
  },
  txtInpStyle: {
    width: wp('90%'),
    height: hp('7%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    color: resources.colors.secondary,
  },
  txtInpOutStyle: {
    borderColor: resources.colors.secondary,
    borderWidth: 0.5,
    color: resources.colors.green,
    borderRadius: 10,
  },
  fpPress: {
    // backgroundColor: 'red',
    width: wp('40%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp('2%'),
    marginTop: hp('2%'),
  },
  fpText: {
    color: resources.colors.primary,
    fontSize: hp('2%'),
    fontWeight: '600',
  },
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
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  loginTxt: {
    color: resources.colors.green,
    fontSize: hp('2%'),
    fontWeight: '300',
    marginTop: hp('3%'),
    alignSelf: 'center',
    letterSpacing: 1.5,
  },
  loginSignupTxt: {
    color: resources.colors.primary,
    fontWeight: '600',
  },
  errorText: {
    color: resources.colors.red,
    fontSize: hp('2%'),
    fontWeight: '400',
    marginLeft: wp('5%'),
    marginTop: hp('1.5%'),
  },
  googleBtn: {
    backgroundColor: resources.colors.white,
    width: wp('90%'),
    height: hp('7%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp('3%'),
    flexDirection: 'row',
    paddingStart: wp('15%'),
  },
  boxShadow: {
    shadowColor: resources.colors.shadowColor,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  headerShadow: {
    elevation: 10,
    shadowColor: resources.colors.shadowColor,
  },
  googleText: {
    color: resources.colors.primary,
    fontSize: hp('2.3%'),
    letterSpacing: 0.6,
    paddingLeft: wp('3%'),
  },
});

export default Signin;
