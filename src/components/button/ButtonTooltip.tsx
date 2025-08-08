import React from 'react';
import { View, Image, GestureResponderEvent } from 'react-native';
import { Tooltip, TouchableRipple } from 'react-native-paper';
import tw from 'twrnc';

interface ButtonTooltipProps {
  icon: any;
  tooltip: string;
  onPress?: (event: GestureResponderEvent) => void;
  iconStyle?: string;
  touchableStyle?: string;
}

const ButtonTooltip = React.memo(({
  icon,
  tooltip,
  onPress = () => { },
  iconStyle = '',
  touchableStyle = '',
}: ButtonTooltipProps) => {
  return (
    <View style={tw`rounded-full`}>
      <Tooltip title={tooltip}>
        <TouchableRipple
          borderless
          rippleColor="#d0dcfb"
          onPress={onPress}
          style={tw`p-2 rounded-full ${touchableStyle}`}
        >
          <View style={tw`flex-col justify-center items-center`}>
            <Image source={icon} style={tw`w-6 h-6 ${iconStyle}`} />
          </View>
        </TouchableRipple>
      </Tooltip>
    </View>
  );
});

export default ButtonTooltip;
