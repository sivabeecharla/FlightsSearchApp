import React from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../resources';

const NoDataComponent = () => {
  return (
    <View
      style={{
        width: wp('50%'),
        height: hp('40%'),
        marginHorizontal: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: resources.colors.button_orange,
          fontSize: hp('2.5%'),
          letterSpacing: 0.5,
        }}>
        No data to show
      </Text>
    </View>
  );
};

export default NoDataComponent;
