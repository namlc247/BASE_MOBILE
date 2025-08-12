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
  TouchableWithoutFeedback,
} from 'react-native';
import Layout from "../components/Layout";
import tw from "twrnc";
import { Button, Card, DataTable, Divider, TextInput, TouchableRipple } from 'react-native-paper';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";
import { LucideIcon } from "../components/LucideIcon";
import COLORS from "../constants/colors";
import { SignalService } from "../services/signal/signal.service";
import WebSocketService from '../services/WebSocketService';
import { useAuthStore } from "../stores/authStore";


import BaseDialog from "../components/dialog-base/BaseDialog";
import AccountInfo from "../components/screenComponent/account/AccountInfo";
import { useBaseDialog } from "../contexts/BaseDialogContext";

const accountItems = [
  {
    icon: "PencilLine",
    label: "Cập nhật thông tin tài khoản",
    children: <AccountInfo />,
  },
  {
    icon: "FileUser",
    label: "Hồ sơ điện tử",
    children: null,
  },
  {
    icon: "LockKeyhole",
    label: "Đổi mật khẩu",
    children: null,
  },
  {
    icon: "MonitorSmartphone",
    label: "Quản lý thiết bị",
    children: null,
  },
  {
    icon: "Bell",
    label: "Cài đặt thông báo",
    children: null,
  },
  {
    icon: "TabletSmartphone",
    label: "Thay đổi số điện thoại",
    children: null,
  }
];

const appInfoItems = [
  {
    icon: "Album",
    label: "Điều khoản sử dụng ứng dụng",
    children: null,
  },
  {
    icon: "Album",
    label: "Chính sách quyền riêng tư",
    children: null,
  },
  {
    icon: "Info",
    label: "Phiên bản ứng dụng",
    children: <AccountInfo />,
  },
];

const helpItems = [
  {
    icon: "Book",
    label: "Hướng dẫn sử dụng",
    children: null,
  },
  {
    icon: "Phone",
    label: "Hotline hỗ trợ",
    children: null,
  },
];


export default function Settings() {
  const { showBaseDialog } = useBaseDialog();
  const { userDetail, listImageGlobal } = useUser();
  const [isLoading, setIsLoading] = React.useState<any>(false);


  const logout = useAuthStore((state) => state.logout);

  const [text, setText] = React.useState("");

  const signalService = SignalService.getInstance();

  React.useEffect(() => {
  }, []);

  useFocusEffect(
    useCallback(() => {

    }, [])
  );

  const doLogOut = async () => {
    setIsLoading(true);
    signalService.localStore.reSet();
    WebSocketService.close();
    try {
      await logout();
    } catch (error) {
      // Có thể xử lý lỗi ở đây nếu cần
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout isLoading={isLoading}>

      <View style={tw`h-full flex-col p-4 pt-0 gap-3`}>
        <View style={tw`flex-row gap-2`}>

          <Card style={tw`bg-white flex-1 max-h-full`}>
            <Card.Content style={tw`p-3 px-4 max-h-full`}>
              <View style={tw`flex-row gap-4 items-center`}>
                <View>
                  <Image
                    source={listImageGlobal[userDetail?.image] ?? require('../accsets/avatarDefault.jpg')}
                    style={tw`w-12 h-12 rounded-full  border border-[${COLORS.primary}] mt-1`}
                  />
                </View>

                <View style={tw`flex-1 flex-col gap-0.5`}>
                  <Text style={tw`text-base font-500 uppercase text-[#444]`}>
                    {userDetail?.fullname}
                  </Text>
                  <Text style={tw`text-[#444]`}>
                    Mã sinh viên: <Text style={tw`text-[${COLORS.primary}] font-bold`}>16464215</Text>
                  </Text>
                  {/* <Text style={tw`text-[#444]`}>
                    Niên khóa: 2025 - 2029
                  </Text> */}
                  <Text style={tw`text-[#444]`}>
                    Lớp quản lý: <Text style={tw`text-[${COLORS.primary}] font-bold`}>CNTT16B</Text>
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

        </View>

        <View style={tw`flex-1`}>
          <Card style={tw`bg-white h-full`}>
            <Card.Content style={tw`p-3 px-4 h-full`}>
              <View style={tw`flex-row gap-4`}>
                <ScrollView
                  style={tw`flex-1`}
                >
                  <View style={tw`mb-1`}>
                    <Text style={tw`font-bold text-base text-[#333]`}>
                      Tài khoản
                    </Text>
                  </View>

                  <View style={tw`mb-3`}>
                    {accountItems.map((item: any, index) => (
                      <React.Fragment key={index}>
                        <TouchableRipple
                          borderless
                          onPress={() => {
                            if (item.onPress) {
                              item.onPress();
                            } else {
                              showBaseDialog(
                                item.label,
                                item.children
                              );


                            }
                          }}
                        >
                          <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                            <View style={tw`flex-row gap-3 items-center`}>
                              <LucideIcon icon={item.icon as any} color={COLORS.primary} size={26} strokeWidth={1.5} />
                            </View>
                            <View style={tw`flex-1`}>
                              <Text style={tw`text-base text-[#444]`}>{item.label}</Text>
                            </View>
                          </View>
                        </TouchableRipple>

                        {/* Divider */}
                        {index < accountItems.length - 1 && <Divider style={tw`m-0`} />}
                      </React.Fragment>
                    ))}
                  </View>

                  <View style={tw`mb-1`}>
                    <Text style={tw`font-bold text-base text-[#333]`}>
                      Ứng dụng
                    </Text>
                  </View>

                  <View style={tw`mb-3`}>
                    {appInfoItems.map((item: any, index) => (
                      <React.Fragment key={index}>
                        <TouchableRipple
                          borderless
                          onPress={() => {
                            if (item.onPress) {
                              item.onPress();
                            } else {
                              showBaseDialog(
                                item.label,
                                item.children
                              );


                            }
                          }}
                        >
                          <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                            <View style={tw`flex-row gap-3 items-center`}>
                              <LucideIcon icon={item.icon as any} color={COLORS.primary} size={26} strokeWidth={1.5} />
                            </View>
                            <View style={tw`flex-1`}>
                              <Text style={tw`text-base text-[#444]`}>{item.label}</Text>
                            </View>
                          </View>
                        </TouchableRipple>

                        {/* Divider */}
                        {index < appInfoItems.length - 1 && <Divider style={tw`m-0`} />}
                      </React.Fragment>
                    ))}
                  </View>

                  <View style={tw`mb-1`}>
                    <Text style={tw`font-bold text-base text-[#333]`}>
                      Hỗ trợ
                    </Text>
                  </View>

                  <View style={tw`mb-3`}>
                    {helpItems.map((item: any, index) => (
                      <React.Fragment key={index}>
                        <TouchableRipple
                          borderless
                          onPress={() => {
                            if (item.onPress) {
                              item.onPress();
                            } else {
                              showBaseDialog(
                                item.label,
                                item.children
                              );


                            }
                          }}
                        >
                          <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                            <View style={tw`flex-row gap-3 items-center`}>
                              <LucideIcon icon={item.icon as any} color={COLORS.primary} size={26} strokeWidth={1.5} />
                            </View>
                            <View style={tw`flex-1`}>
                              <Text style={tw`text-base text-[#444]`}>{item.label}</Text>
                            </View>
                          </View>
                        </TouchableRipple>

                        {/* Divider */}
                        {index < helpItems.length - 1 && <Divider style={tw`m-0`} />}
                      </React.Fragment>
                    ))}


                  </View>

                  <View style={tw`flex-1 mt-3`}>
                    <Button
                      style={tw`p-1 w-full`}
                      mode="contained"
                      onPress={() => {
                        doLogOut();
                      }}
                    >
                      <Text style={tw`uppercase text-white`}>Đăng xuất</Text>
                    </Button>
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

const renderHeaderItem = (text: string, style: string) => (
  <DataTable.Title style={tw`flex-row justify-center items-center ${style}`}>
    <Text style={tw`text-[#000] font-medium uppercase`}>{text}</Text>
  </DataTable.Title>
);
