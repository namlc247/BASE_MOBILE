import React from 'react';
import { Image, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';

interface IconRoundedButton {
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
}

export default function IconRoundedButton({
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
  activeColor = '#e7effc',
}: IconRoundedButton) {
  return (
    <TouchableOpacity
      style={tw`flex-row gap-x-1 justify-center items-center px-3 py-2 rounded-full shadow border border-gray-200
        ${isActive ? `bg-[${activeColor}] shadow-md` : 'bg-white'}
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
      <Text style={tw`font-medium ${textStyle}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
} 
