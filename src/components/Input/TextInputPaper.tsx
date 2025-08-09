import React, { forwardRef } from 'react';
import { ReturnKeyTypeOptions, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import COLORS from '../../constants/colors';

type TextInputPaperProps = {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
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
      activeUnderlineColor={props.activeUnderlineColor || COLORS.primary}
      activeOutlineColor={props.activeOutlineColor || COLORS.primary}
      outlineColor={props.outlineColor || '#d9d9d9'}
      style={[
        styles.defaultStyle,
        props.style,
        props.disabled && { backgroundColor: COLORS.backgroundColorInputDisabled, }, // xám đậm
      ]}
    />
  );
});

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: COLORS.backgroundColorInput,
  },
});

export default TextInputPaper;
