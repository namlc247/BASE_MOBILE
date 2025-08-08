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
    <View style={tw`flex-row items-center bg-white`}>
      <View style={tw`flex-1`}>
        <ActionButton
          icon={'House'}
          text="Trang chủ"
          isHightlight={routeName === "ExpandableCalendarScreen"}
          onPress={() => toggleMenu('ExpandableCalendarScreen')}
        />
      </View>

      <View style={tw`flex-1`}>
        <ActionButton
          icon={'CreditCard'}
          text="Học phí"
          isHightlight={false}
          onPress={() => { }}
        />
      </View>


      {/* <View style={tw`-mt-1`}>
        <Image
          source={logoApp}
          style={tw`w-12 h-12 rounded-full  border border-[${COLORS.primary}] mt-1`}
        />
      </View> */}

      <View style={tw`flex-1`}>
        <ActionButton
          icon={'CalendarDays'}
          text="Lịch học"
          isHightlight={routeName === "CalendarUser"}
          onPress={() => toggleMenu('CalendarUser')}
        />
      </View>

      <View style={tw`flex-1`}>
        <ActionButton
          icon={'UserRound'}
          text="Cá nhân"
          isHightlight={routeName === "Account"}
          onPress={() => toggleMenu('Account')}
        />
      </View>
    </View>

  );
});

export default BottomBar;
