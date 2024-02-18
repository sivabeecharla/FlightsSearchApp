import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardType} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput as TextBox} from 'react-native-paper';
import resources from '../resources';
import {TextInputBoxProps} from '../types/types';

/**
 * Customized TextInput component of react-native-paper
 * @param {string} value hold the value in text input.
 * @param {string} label  displays text input label.
 * @param {string} placeholder displays text input placeholder.
 * @param {(val: string) => void} onChangeText function which will be called when text is changed in text input.
 * @param {React.Ref<TextInput>} textRef reference to the text input
 * @param {function} setFocus sets focus to the next input if any
 * @param {boolean} isError if yes, sets red border around the text input.
 * @param {string} type specifies the text input type.
 * @param {boolean} isEditable determines whether the text input is editable or not.
 * @param {string} width specifies the width of the text input.
 * @param {KeyboardType} keyboardType specifies what keyboard type should be displayed when input is focused.
 * @returns
 */
const TextInputBox: React.FC<TextInputBoxProps> = ({
  value,
  label,
  placeholder,
  onChangeText,
  textRef,
  setFocus,
  isError,
  type,
  isEditable,
  width,
  keyboardType,
}) => {
  const [isSecure, setIsSecure] = useState(type == 'Password' ? true : false);

  let left =
    type == 'Name' ? (
      <TextBox.Icon
        icon={'account'}
        size={20}
        color={'#000'}
        style={{
          marginTop: hp('1%'),
        }}
      />
    ) : type == 'Email' ? (
      <TextBox.Icon
        icon={'email'}
        size={20}
        color={'#000'}
        style={{
          marginTop: hp('1%'),
        }}
      />
    ) : type == 'Password' ? (
      <TextBox.Icon
        icon={'lock'}
        size={20}
        color={'#000'}
        style={{
          marginTop: hp('1%'),
        }}
      />
    ) : undefined;

  let right =
    type == 'Password' ? (
      <TextBox.Icon
        icon={isSecure ? 'eye' : 'eye-off'}
        size={20}
        color={'#000'}
        style={{
          marginTop: hp('2%'),
        }}
        onPress={() => setIsSecure(!isSecure)}
      />
    ) : type == 'Name' ? null : type == 'Email' ? null : undefined;

  const styles = StyleSheet.create({
    txtInpStyle: {
      width: wp('90%'),
      marginHorizontal: wp('4%'),
      color: resources.colors.black,
    },
    txtInpOutStyle: {
      borderWidth: 0.5,
      borderRadius: 10,
    },
  });

  return (
    <TextBox
      ref={textRef}
      mode="outlined"
      label={label}
      placeholder={placeholder}
      placeholderTextColor={resources.colors.black_light}
      editable={isEditable}
      keyboardType={keyboardType}
      style={[
        styles.txtInpStyle,
        {
          marginTop: hp('1%'),
          width: width != ''? wp(width) : 100,
        },
      ]}
      outlineStyle={[
        styles.txtInpOutStyle,
        {
          borderColor: isError ? resources.colors.red : '#000',
        },
      ]}
      contentStyle={{
        color: resources.colors.black,
        paddingRight: right == undefined ? 0 : undefined,
      }}
      textAlignVertical="auto"
      textColor="#000"
      secureTextEntry={isSecure}
      onChangeText={onChangeText}
      error={isError}
      left={left}
      right={right}
      returnKeyType={'next'}
      returnKeyLabel={'next'}
      onSubmitEditing={setFocus}
      value={value}
      numberOfLines={1}
      multiline={false}
      // outlineColor={resources.colors.green_5}
      // activeOutlineColor={resources.colors.green}
    />
  );
};

export default TextInputBox;
