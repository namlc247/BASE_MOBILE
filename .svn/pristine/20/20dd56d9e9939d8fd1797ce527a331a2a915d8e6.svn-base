import React from 'react';
import { Image, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';

interface TextButton {
  source?: ImageSourcePropType;
  text?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: string;
  textStyle?: string;
  isActive?: boolean;
  activeColor?: string;
  textColor: string;
}

export default function TextButton({
  source,
  text,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled = false,
  activeOpacity = 0.2,
  style = '',
  textStyle = '',
  isActive = false,
  textColor = '',
}: TextButton) {
  return (
    <TouchableOpacity
      style={tw`flex-row gap-x-1 justify-center items-center px-1 py-1 rounded-full shadow border border-gray-200
        ${isActive ? 'bg-[' + textColor + ']' : 'bg-white'}
        ${disabled ? 'opacity-50' : ''} ${style}`}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      {source && (
        <Image
          source={source}
          style={tw`w-4.5 h-4.5`}
          resizeMode="contain"
        />
      )}
      <Text style={[
        tw`font-medium ${textStyle} ${isActive ? 'text-white' : ''}`,
        !isActive && { color: textColor }
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
} 
