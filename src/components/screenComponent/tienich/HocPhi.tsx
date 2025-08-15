import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleProp, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { Card, Divider, Searchbar, TouchableRipple } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { useBaseDialog } from '../../../contexts/BaseDialogContext';
import { LucideIcon } from '../../LucideIcon';
import { useUser } from '../../../contexts/UserContext';
import { useAuthStore } from '../../../stores/authStore';
import { useFocusEffect } from '@react-navigation/native';
import ChuaThanhToan from '../hocphi/ChuaThanhToan';
import DaThanhToan from '../hocphi/DaThanhToan';
import { TabBar, TabBarItem, TabView } from 'react-native-tab-view';

type MyRoute = {
  key: string;
  title: string;
};

const LazyPlaceholder = ({ route }: { route: MyRoute }) => (
  <View style={tw`flex-1 items-center justify-center`}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

interface HocPhiProps {
  showBaseDialog: (title: string, content: React.ReactNode) => void;
  closeAllBaseDialogs: () => void;
}

const HocPhi: React.FC<HocPhiProps> = ({
  showBaseDialog,
  closeAllBaseDialogs,
}) => {
  const layout = useWindowDimensions();
  const { userDetail, listImageGlobal } = useUser();


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
        return <ChuaThanhToan
          showBaseDialog={showBaseDialog}
          closeAllBaseDialogs={closeAllBaseDialogs}
          goToTab={goToTab}
        />;
      case 'daThanhToan':
        return <DaThanhToan />;
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
    <View style={tw`flex-1 flex-col gap-3`} >
      <View style={tw`flex-1`}>
        <View style={tw`h-full flex-col p-0 pt-0 gap-3 `}>
          <View style={tw`flex-1`}>
            {/* <Card style={tw`bg-white h-full`}>
              <Card.Content style={tw`p-3 h-full`}> */}
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
            {/* </Card.Content>
            </Card> */}


          </View>
        </View>
      </View>
    </View>
  );
};



export default HocPhi;
