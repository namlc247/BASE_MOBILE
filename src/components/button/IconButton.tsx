import React from 'react';
import { Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Tooltip } from 'react-native-paper';
import tw from 'twrnc';

interface IconButton {
  source: ImageSourcePropType;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: string;
  imageStyle?: string;
  tooltip: string;
}

export default function IconButton({
  source,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled = false,
  activeOpacity = 0.2,
  style = '',
  imageStyle = '',
  tooltip = ''
}: IconButton) {
  return (
    <Tooltip title={tooltip}>
      <TouchableOpacity
        style={tw`flex-row items-center px-2 py-2 bg-white rounded-full shadow border border-gray-200 ${disabled ? 'opacity-50' : ''} ${style}`}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        activeOpacity={activeOpacity}
      >
        <Image
          source={source}
          style={tw`w-4.5 h-4.5 ${imageStyle}`}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Tooltip>
  );
} 
