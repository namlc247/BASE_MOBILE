import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import Layout from "../components/Layout";
import tw from "twrnc";
import { Card, DataTable, Divider, TextInput, TouchableRipple } from 'react-native-paper';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";
import { LucideIcon } from "../components/LucideIcon";
import COLORS from "../constants/colors";
import { SignalService } from "../services/signal/signal.service";
import WebSocketService from '../services/WebSocketService';
import { useAuthStore } from "../stores/authStore";
import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';
import CalendarUtils from "../utils/calendarUtils";
import ChuaThanhToan from "../components/screenComponent/hocphi/ChuaThanhToan";
import DaThanhToan from "../components/screenComponent/hocphi/DaThanhToan";

type MyRoute = {
  key: string;
  title: string;
};

const LazyPlaceholder = ({ route }: { route: MyRoute }) => (
  <View style={tw`flex-1 items-center justify-center`}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

export default function HocPhi() {
  const layout = useWindowDimensions();
  const { userDetail, listImageGlobal } = useUser();
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const logout = useAuthStore((state) => state.logout);

  const [text, setText] = React.useState("");


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'chuaThanhToan', title: 'Chưa thanh toán' },
    { key: 'daThanhToan', title: 'Đã thanh toán' },
  ]);

  React.useEffect(() => {
  }, []);

  useFocusEffect(
    useCallback(() => {

    }, [])
  );



  const renderLazyPlaceholder = ({ route }: { route: MyRoute }) => (
    <LazyPlaceholder route={route} />
  );

  const renderScene = ({ route }: { route: MyRoute }) => {
    switch (route.key) {
      case 'chuaThanhToan':
        return <ChuaThanhToan goToTab={goToTab} />;
      case 'daThanhToan':
        return <DaThanhToan />;
      default:
        return null;
    }
  };

  const goToTab = (tabIndex: number) => {
    setIndex(tabIndex);
  };

  return (
    <Layout isLoading={isLoading}>
      <View style={tw`h-full flex-col p-4 pt-0 gap-3 `}>
        <View style={tw`flex-1`}>
          <Card style={tw`bg-white h-full`}>
            <Card.Content style={tw`p-3 h-full`}>
              <TabView
                lazy
                navigationState={{ index, routes }}
                renderScene={renderScene} // Dùng switch thay vì SceneMap
                onIndexChange={setIndex}
                style={tw`h-full`}
                initialLayout={{ width: layout.width }}
                renderLazyPlaceholder={renderLazyPlaceholder}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: COLORS.primary }}
                    style={tw`bg-transparent shadow-none`}
                    activeColor={'#333'}
                    inactiveColor={'#aaa'}
                    pressColor="transparent"
                    renderTabBarItem={(props) => (
                      <TabBarItem
                        {...props}
                        labelStyle={tw`text-base font-bold`}
                      />
                    )}
                  />
                )}
              />
            </Card.Content>
          </Card>


        </View>
      </View>
    </Layout>
  );
}
