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
import { Calendar } from 'react-native-calendars';
import CalendarUtils from "../utils/calendarUtils";
import { getTheme } from "../mocks/theme";
import HocPhi from "../components/screenComponent/tienich/HocPhi";
import LichCanhan from "../components/screenComponent/tienich/LichCanhan";
import { useBaseDialog } from "../contexts/BaseDialogContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AccountInfo from "../components/screenComponent/account/AccountInfo";

export default function Tienich() {
  const [isLoading, setIsLoading] = React.useState<any>(false);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const { showBaseDialog, closeAllBaseDialogs } = useBaseDialog();

  const menuThongtincanhan = [
    {
      id: 1, icon: 'User', label: 'Tài khoản', type: 'dialog',
      dialogItem: <AccountInfo />
    },
    { id: 2, icon: 'FileUser', label: 'Hồ sơ điện tử' },
    {
      id: 3, icon: 'FileUser', label: 'Lịch cá nhân', type: 'dialog',
      dialogItem: <LichCanhan />
    }
  ];

  const menuQuatrinhHoctap = [
    { id: 1, icon: 'BookOpen', label: 'Đằng ký tín chi' },
    {
      id: 2, icon: 'FileSearch', label: 'Tra cứu tài liệu'
    },
    { id: 3, icon: 'CalendarDays', label: 'Thời khóa biểu' }
  ];

  const menuHanhchinhDoanthe = [
    { id: 1, icon: 'FileSpreadsheet', label: 'Nộp / Theo dõi đơn' },
    {
      id: 2, icon: 'CreditCard', label: 'Học phí', type: 'dialog',
      dialogItem: <HocPhi
        showBaseDialog={showBaseDialog}
        closeAllBaseDialogs={closeAllBaseDialogs}
      />
    },
    { id: 3, icon: 'Users', label: 'Hoạt động đoàn thể' }
  ];

  React.useEffect(() => {
  }, []);

  useFocusEffect(
    useCallback(() => {

    }, [])
  );

  const handleMenuItemClick = (item: any) => {
    if (item.type === 'navigate') {
      closeAllBaseDialogs();
      navigation.navigate(item.navigateTo);
    } if (item.type === 'dialog') {
      showBaseDialog(
        item.label,
        item.dialogItem ? item.dialogItem : null
      )
    }
  }

  return (
    <Layout isLoading={isLoading}>
      <View style={tw`h-full flex-col p-4 pt-0 gap-3`}>
        <View style={tw`flex-1`}>
          <Card style={tw`bg-white h-full`}>
            <Card.Content style={tw`p-3 px-4 h-full`}>
              <View style={tw`flex-row`}>
                <ScrollView
                  style={tw`flex-1`}
                >
                  <View style={tw`flex-row gap-3 justify-between items-center`}>
                    <View>
                      <Text style={tw`font-bold text-base text-[#333]`}>
                        Thông tin cá nhân
                      </Text>
                    </View>

                    <View>
                    </View>
                  </View>

                  <View style={tw`flex-row flex-wrap items-start mt-1`}>
                    {menuThongtincanhan.map((item) => (
                      <View key={item.id} style={tw`w-1/3 p-2 px-1`}>
                        <TouchableRipple
                          borderless
                          onPress={() => {
                            handleMenuItemClick(item);
                          }}
                          style={tw`py-2 rounded-lg`}
                        >
                          <View style={tw`flex-col justify-center items-center gap-2.5`}>
                            <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-full`}>
                              <Card.Content style={tw`p-0`}>
                                <View style={tw`p-3 rounded-full`}>
                                  <LucideIcon icon={item.icon as any} color={COLORS.primary} size={24} strokeWidth={1.5} />
                                </View>
                              </Card.Content>
                            </Card>

                            <View style={tw`px-1`}>
                              <Text
                                style={tw`text-[#444] text-center`}
                                numberOfLines={2} // giới hạn tối đa 2 dòng
                                ellipsizeMode="tail"
                              >
                                {item.label}
                              </Text>
                            </View>
                          </View>
                        </TouchableRipple>
                      </View>
                    ))}
                  </View>

                  <View style={tw`flex-row gap-3 justify-between items-center mt-3`}>
                    <View>
                      <Text style={tw`font-bold text-base text-[#333]`}>
                        Quá trình học tập
                      </Text>
                    </View>

                    <View>
                    </View>
                  </View>

                  <View style={tw`flex-row flex-wrap items-start mt-1`}>
                    {menuQuatrinhHoctap.map((item) => (
                      <View key={item.id} style={tw`w-1/3 p-2 px-1`}>
                        <TouchableRipple
                          borderless
                          onPress={() => {
                            handleMenuItemClick(item);
                          }}
                          style={tw`py-2 rounded-lg`}
                        >
                          <View style={tw`flex-col justify-center items-center gap-2.5`}>
                            <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-full`}>
                              <Card.Content style={tw`p-0`}>
                                <View style={tw`p-3 rounded-full`}>
                                  <LucideIcon icon={item.icon as any} color={COLORS.primary} size={24} strokeWidth={1.5} />
                                </View>
                              </Card.Content>
                            </Card>

                            <View style={tw`px-1`}>
                              <Text
                                style={tw`text-[#444] text-center`}
                                numberOfLines={2} // giới hạn tối đa 2 dòng
                                ellipsizeMode="tail"
                              >
                                {item.label}
                              </Text>
                            </View>
                          </View>
                        </TouchableRipple>
                      </View>
                    ))}
                  </View>

                  <View style={tw`flex-row gap-3 justify-between items-center mt-3`}>
                    <View>
                      <Text style={tw`font-bold text-base text-[#333]`}>
                        Hành chính, đoàn thể
                      </Text>
                    </View>

                    <View>
                    </View>
                  </View>

                  <View style={tw`flex-row flex-wrap items-start mt-1`}>
                    {menuHanhchinhDoanthe.map((item) => (
                      <View key={item.id} style={tw`w-1/3 p-2 px-1`}>
                        <TouchableRipple
                          borderless
                          onPress={() => {
                            handleMenuItemClick(item);
                          }}
                          style={tw`py-2 rounded-lg`}
                        >
                          <View style={tw`flex-col justify-center items-center gap-2.5`}>
                            <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-full`}>
                              <Card.Content style={tw`p-0`}>
                                <View style={tw`p-3 rounded-full`}>
                                  <LucideIcon icon={item.icon as any} color={COLORS.primary} size={24} strokeWidth={1.5} />
                                </View>
                              </Card.Content>
                            </Card>

                            <View style={tw`px-1`}>
                              <Text
                                style={tw`text-[#444] text-center`}
                                numberOfLines={2} // giới hạn tối đa 2 dòng
                                ellipsizeMode="tail"
                              >
                                {item.label}
                              </Text>
                            </View>
                          </View>
                        </TouchableRipple>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </Layout>
  );
}
