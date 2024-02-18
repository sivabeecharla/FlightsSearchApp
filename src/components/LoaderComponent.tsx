import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import resources from '../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * Custom loader, which loads on specific area in the screen based on where you renders it, can be used whenever you are awaiting for some response
 * from external API or from some custom methods.
 * @returns
 */
const LoaderComponent = () => {
  return (
    <View
      style={{
        width: wp('90%'),
        height: hp('30%'),
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        marginHorizontal: wp('5%'),
        marginBottom: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
      <ActivityIndicator size={25} color={resources.colors.primary} />
    </View>
  );
};

export default LoaderComponent;
