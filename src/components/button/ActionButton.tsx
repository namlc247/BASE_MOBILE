import { Home, House, Settings, Settings2 } from 'lucide-react-native';
import React from 'react';
import { View, Text, Image, GestureResponderEvent, ImageSourcePropType } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import tw from 'twrnc';
import { LucideIcon } from '../LucideIcon';
import * as LucideIcons from "lucide-react-native";
import ColorUtil from '../../utils/colorUtil';
import COLORS from '../../constants/colors';

type ActionButtonProps = {
  icon: keyof typeof LucideIcons;
  text: string;
  defaultColor?: string;
  colorHightlight?: string;
  isHightlight?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  defaultColor = "#666666",
  colorHightlight = COLORS.primary,
  isHightlight = false,
  onPress
}) => {

  return (
    <View style={tw`rounded-lg py-1`}>
      <TouchableRipple
        borderless
        onPress={onPress || (() => { })}
        style={tw`p-1 rounded-lg`}
      >
        <View style={tw`flex-col justify-center items-center`}>
          <View
            style={[
              tw`px-2 py-1 rounded-xl`,
              { backgroundColor: isHightlight ? ColorUtil.lightenColor(colorHightlight, 0.90) : "transparent" },
            ]}
          >
            <LucideIcon
              icon={icon}
              color={isHightlight ? colorHightlight : defaultColor}
              strokeWidth={1.5}
            />
          </View>
          <Text
            style={tw` ${isHightlight ? "font-500" : ""} text-sm mt-1 text-[${isHightlight ? colorHightlight : defaultColor}]`}>
            {text}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default ActionButton;
