import React, { useCallback, useEffect, useRef, useState } from "react";
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
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import Layout from "../components/Layout";
import tw from "twrnc";
import { Badge, Card, DataTable, Divider, TextInput, TouchableRipple } from 'react-native-paper';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";
import { LucideIcon } from "../components/LucideIcon";
import COLORS from "../constants/colors";
import { SignalService } from "../services/signal/signal.service";
import WebSocketService from '../services/WebSocketService';
import { useAuthStore } from "../stores/authStore";
import { Calendar } from 'react-native-calendars';
import CalendarUtils from "../utils/calendarUtils";
import { getTheme } from "../mocks/theme";
import ChuaThanhToan from "../components/screenComponent/hocphi/ChuaThanhToan";
import DaThanhToan from "../components/screenComponent/hocphi/DaThanhToan";
import { useBaseDialog } from "../contexts/BaseDialogContext";
import { TabBar, TabBarItem, TabView } from "react-native-tab-view";
import ThongbaoTaikhoan from "../components/screenComponent/thongbao/ThongbaoTaikhoan";
import ThongbaoHethong from "../components/screenComponent/thongbao/ThongbaoHethong";

type MyRoute = {
  key: string;
  title: string;
  count?: number;
};

const LazyPlaceholder = ({ route }: { route: MyRoute }) => (
  <View style={tw`flex-1 items-center justify-center`}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

export default function Thongbao() {
  const { showBaseDialog, closeAllBaseDialogs } = useBaseDialog();
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const layout = useWindowDimensions();
  const { userDetail, listImageGlobal } = useUser();


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'taikhoan', title: 'Tài khoản', count: 1 },
    { key: 'hethong', title: 'Hệ thống', count: 0 },
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
      case 'taikhoan':
        return <ThongbaoTaikhoan />;
      case 'hethong':
        return <ThongbaoHethong />;
      default:
        return null;
    }
  };

  const goToTab = (tabIndex: number) => {
    setIndex(tabIndex);
  };

  React.useEffect(() => {

  }, []);


  return (
    <Layout isLoading={isLoading}>
      <View style={tw`h-full flex-col p-4 pt-0 gap-3`}>
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
                        badge={({ route }) =>
                          route.count && route.count > 0 ? <Badge>{route.count}</Badge> : <></>
                        }
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



const styles = StyleSheet.create({
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginVertical: 10
  // },
  // headerTitle: { fontSize: 16, fontWeight: 'bold', marginRight: 6 },
});
