import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  Image,
  BackHandler,
  NativeModules,
  StatusBar,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../resources';
import {Pressable} from 'react-native';
import Signin from './Signin';
import Signup from './Signup';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternetConnection from '../components/NoInternetConnection';

const Login = () => {
  const netInfo = useNetInfo();
  const {StatusBarManager} = NativeModules;
  const [isSelected, setIsSelected] = useState('signin');

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          return true;
        },
      );
      return () => {
        backHandler.remove();
      };
    }, []),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: resources.colors.secondary,
      }}>
      <StatusBar barStyle={'default'} />

      <View
        style={{
          height: StatusBarManager.HEIGHT,
        }}
      />

      {netInfo.isConnected == false ? (
        <NoInternetConnection />
      ) : (
        <ScrollView nestedScrollEnabled={true}>
          <View>
            <Image
              source={resources.images.logo}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />

            <View style={styles.optionContainer}>
              <Pressable
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      isSelected == 'signin'
                        ? resources.colors.primary
                        : 'transparent',
                  },
                ]}
                onPress={() => {
                  setIsSelected('signin');
                }}>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        isSelected == 'signin'
                          ? resources.colors.white
                          : resources.colors.black_light,
                    },
                  ]}>
                  Login
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      isSelected == 'signup'
                        ? resources.colors.primary
                        : 'transparent',
                  },
                ]}
                onPress={() => {
                  setIsSelected('signup');
                }}>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        isSelected == 'signup'
                          ? resources.colors.white
                          : resources.colors.black_light,
                    },
                  ]}>
                  Register
                </Text>
              </Pressable>
            </View>

            {isSelected === 'signin' ? (
              <Signin setIsSelected={setIsSelected} />
            ) : (
              <Signup setIsSelected={setIsSelected} />
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
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
    backgroundColor: resources.colors.primary,
  },
  modalArrow: {
    width: wp('15%'),
    // backgroundColor: 'red',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: resources.colors.white,
    fontSize: hp('3%'),
    fontWeight: '600',
    marginLeft: wp('5%'),
    textTransform: 'capitalize',
  },
  optionContainer: {
    width: wp('90%'),
    height: hp('8%'),
    backgroundColor: resources.colors.background_light,
    borderRadius: 50,
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: wp('43%'),
    height: hp('6%'),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: hp('2%'),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: resources.colors.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
    marginLeft: wp('5%'),
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
});

export default Login;
