import React from 'react';
import { View, Image, GestureResponderEvent } from 'react-native';
import { Tooltip, TouchableRipple } from 'react-native-paper';
import tw from 'twrnc';

import { BottomNavigation, Text } from 'react-native-paper';
import ActionButton from './button/ActionButton';
import { useNavigationState, useRoute } from '@react-navigation/native';
import COLORS from '../constants/colors';
import logoApp from "../accsets/iconApp/logoApp.png";

interface BottomBarProps {
  toggleMenu: (navigationTo: string) => void;
}

const BottomBar = React.memo(({
  toggleMenu
}: BottomBarProps) => {
  const routeName = useNavigationState((state) => {
    if (!state || !state.routes || typeof state.index !== 'number') return '';
    return state.routes[state.index]?.name ?? '';
  });
  // const route = useRoute();

  return (
    <View style={tw`flex-row items-center bg-white px-1 gap-1`}>
      <View style={tw`flex-1`}>
        {/* HomePage */}
        {/* ExpandableCalendarScreen */}
        <ActionButton
          icon={'House'}
          text="Trang chủ"
          isHightlight={routeName === "HomePage"}
          onPress={() => toggleMenu('HomePage')}
        />
      </View>

      <View style={tw`flex-1`}>
        <ActionButton
          icon={'LayoutGrid'}
          text="Tiện ích"
          isHightlight={routeName === "Tienich"}
          onPress={() => toggleMenu('Tienich')}
        />
      </View>


      {/* <View style={tw`-mt-3`}>
        <Image
          source={logoApp}
          style={tw`w-12 h-12 rounded-full  border border-[${COLORS.primary}]`}
        />
      </View> */}

      <View style={tw`flex-1`}>
        <ActionButton
          icon={'Bell'}
          text="Thông báo"
          isHightlight={routeName === "Thongbao"}
          onPress={() => toggleMenu('Thongbao')}
        />
      </View>

      <View style={tw`flex-1`}>
        <ActionButton
          icon={'Settings'}
          text="Cài đặt"
          isHightlight={routeName === "Settings"}
          onPress={() => toggleMenu('Settings')}
        />
      </View>
    </View>

  );
});

export default BottomBar;
