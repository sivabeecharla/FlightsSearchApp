import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast, {
  BaseToast,
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import resources from '../resources';

// toast config
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: resources.colors.green_toaster,
        marginTop: hp('2%'),
        width: wp('90%'),
        borderRadius: 10,
      }}
      contentContainerStyle={{
        backgroundColor: resources.colors.green_toaster,
        width: wp('90%'),
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}
      renderLeadingIcon={() => (
        <MCIcon
          name="check-circle-outline"
          style={{
            backgroundColor: resources.colors.green_toaster,
            paddingTop: 15,
            paddingLeft: 10,
          }}
          size={30}
          color="#eeeeee"
        />
      )}
      text1Style={{
        fontSize: 14,
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#fff',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: resources.colors.red,
        marginTop: hp('2%'),
        width: wp('90%'),
        borderRadius: 10,
      }}
      contentContainerStyle={{
        backgroundColor: resources.colors.red,
        width: wp('90%'),
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}
      renderLeadingIcon={() => (
        <MIcon
          name="error-outline"
          style={{
            backgroundColor: resources.colors.red,
            paddingTop: 15,
            paddingLeft: 10,
          }}
          size={30}
          color="#eeeeee"
        />
      )}
      text1Style={{
        fontSize: 14,
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#fff',
      }}
    />
  ),

  info: (props: any) => (
    <InfoToast
      {...props}
      style={{borderLeftColor: '#3ee0e6'}}
      contentContainerStyle={{
        backgroundColor: '#3ee0e6',
      }}
      renderLeadingIcon={() => (
        <MCIcon
          name="information-outline"
          style={{
            backgroundColor: '#3ee0e6',
            paddingTop: 15,
            paddingLeft: 10,
          }}
          size={30}
          color="#eeeeee"
        />
      )}
      text1Style={{
        fontSize: 14,
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#fff',
      }}
    />
  ),
};

export const Toaster = {
  success: (data: string, text?: string) =>
    Toast.show({
      type: 'success',
      text1: data,
      text2: text,
    }),

  error: (data: string, text?: string) =>
    Toast.show({
      type: 'error',
      text1: data,
      text2: text,
    }),

  info: (data: string, text?: string) =>
    Toast.show({
      type: 'info',
      text1: data,
      text2: text,
    }),
};
