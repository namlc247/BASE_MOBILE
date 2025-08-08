import React, { forwardRef } from 'react';
import { ReturnKeyTypeOptions, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import COLORS from '../../constants/colors';

type TextInputPaperProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
  mode?: 'flat' | 'outlined';
  left?: React.ReactNode;
  right?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  selectionColor?: string;
  underlineColor?: string;
  activeUnderlineColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  textColor?: string;
  dense?: boolean;
  multiline?: boolean;
  onFocus?: (args: any) => void;
  onBlur?: (args: any) => void;
  editable?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: ReturnKeyTypeOptions;
  blurOnSubmit?: boolean;
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
  outlineStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<TextStyle>;
  underlineStyle?: StyleProp<ViewStyle>;
};

// 👇 Sử dụng forwardRef để hỗ trợ ref đúng cách
const TextInputPaper = forwardRef<any, TextInputPaperProps>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref} // truyền ref trực tiếp vào TextInput của react-native-paper
      style={[styles.defaultStyle, props.style]}
    />
  );
});

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: COLORS.backgroundColorInput,
  },
});

export default TextInputPaper;
