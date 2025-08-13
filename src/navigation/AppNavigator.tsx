import { NavigationContainer, NavigationContainerRef, useNavigationState } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { useAuthStore } from "../stores/authStore";
import { UserProvider } from "../contexts/UserContext";
import Toast from 'react-native-toast-message';
import MyToastUtils from "../utils/toastConfig";
import { WebSocketProvider } from "../contexts/WebSocketProvider";
import { NewsfeedProvider } from "../contexts/NewsfeedContext";
import { IntervalProvider } from "../contexts/IntervalProvider";
import { DialogConfirmProvider } from "../contexts/DialogConfirmContext";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import Login from "../screens/Login";

import COLORS from "../constants/colors";
import CalendarUser from "../screens/CalendarUser";
import { View } from "react-native";
import BottomBar from "../components/BottomBar";
import tw from "twrnc";
import ExpandableCalendarScreen from "../screens/expandableCalendarScreen";


import HocPhi from "../screens/HocPhi";
import ScreenWrapper from "../components/ScreenWrapper";
import { BaseDialogProvider } from "../contexts/BaseDialogContext";
import { LoadingProvider } from "../contexts/LoadingContext";
import HomePage from "../screens/HomePage";
import Settings from "../screens/Settings";



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary
  },
};

export type RootStackParamList = {
  Calendar: { main_id: number };
  Calendar_TT_Donvi: { main_id: number };
  Calendar_TT_Donvi_Duyetlich: { main_id: number };
  Notifications: { main_id: number };
  Meeting: { id_cuochopgiaoban: number };
  PhongHop: { khp_gid: number };
};

const Stack = createNativeStackNavigator();

const ProtectedRoutes = ({ navigationRef }:
  { navigationRef: React.RefObject<NavigationContainerRef<any>> }) => {
  const toggleMenu = (screen: string) => {
    navigationRef.current?.navigate(screen as never);
  };

  // const routeName = useNavigationState((state) => {
  //   if (!state || !state.routes || typeof state.index !== 'number') return '';
  //   return state.routes[state.index]?.name ?? '';
  // });

  return (
    <UserProvider>
      <WebSocketProvider>
        <NewsfeedProvider>
          <IntervalProvider>
            <PaperProvider theme={theme}>
              <DialogConfirmProvider>
                <BaseDialogProvider>
                  <ScreenWrapper navigationRef={navigationRef}>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="HomePage" component={HomePage} />
                      <Stack.Screen name="HocPhi" component={HocPhi} />
                      <Stack.Screen name="CalendarUser" component={CalendarUser} />
                      <Stack.Screen name="Settings" component={Settings} />
                    </Stack.Navigator>
                  </ScreenWrapper>

                  <View style={tw`bg-white border-t border-gray-200`}>
                    <BottomBar
                      toggleMenu={toggleMenu}
                    />
                  </View>
                </BaseDialogProvider>
              </DialogConfirmProvider>
            </PaperProvider>
          </IntervalProvider>
        </NewsfeedProvider>
      </WebSocketProvider>

    </UserProvider>
  );
};

const PublicRoutes = () => (
  <PaperProvider theme={theme}>
    <DialogConfirmProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </DialogConfirmProvider>
  </PaperProvider>
);

export const AppNavigator = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const { token, isLoading } = useAuthStore();

  return (
    <LoadingProvider >
      <NavigationContainer ref={navigationRef}>
        {/* <PaperProvider theme={theme}> */}
        {token && !isLoading ? <ProtectedRoutes navigationRef={navigationRef} /> : <PublicRoutes />}
        <Toast config={MyToastUtils.toastConfig} visibilityTime={3000} />
        {/* </PaperProvider> */}
      </NavigationContainer>
    </LoadingProvider>
  );
};
