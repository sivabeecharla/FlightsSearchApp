import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  NativeModules,
} from 'react-native';
import resources from '../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubHeaderProps} from '../types/types';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Header: React.FC<SubHeaderProps> = ({title, onPress, backArrow}) => {
  return (
    <View
      style={[
        styles.header,
        Platform.OS == 'ios'
          ? resources.gStyles.boxShadow
          : resources.gStyles.headerShadow,
        {
          backgroundColor: resources.colors.white,
        },
      ]}>
      {backArrow && (
        <TouchableOpacity style={styles.modalArrow}>
          <AntIcon
            name="arrowleft"
            size={hp('3%')}
            color={resources.colors.black}
            onPress={onPress}
          />
        </TouchableOpacity>
      )}
    
      <Text style={[styles.headerText,{
        textAlign: backArrow ? 'left' :'center'
      }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: wp('100%'),
    height: hp('8%'),
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: hp('2%'),
  },
  modalArrow: {
    height: hp('8%'),
    justifyContent: 'center',
    flex:2.6
  },
  headerText: {
    color: resources.colors.black,
    fontSize: hp('2.5%'),
    fontWeight: '600',
    flex:4,
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
});

export default Header;
