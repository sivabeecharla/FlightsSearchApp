import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import resources from '../resources';

const NoInternetConnection = () => {
  return (
    <View
      style={{
        width: wp('95%'),
        height: hp('30%'),
        borderRadius: 10,
        marginHorizontal: wp('2.5%'),
        marginTop: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: resources.colors.button_orange,
          fontSize: hp('2%'),
          letterSpacing: 0.5,
        }}>
        No Internet Connection
      </Text>
    </View>
  );
};

export default NoInternetConnection;
