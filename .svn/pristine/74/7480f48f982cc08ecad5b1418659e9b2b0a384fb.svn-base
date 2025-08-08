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

export default function Account() {
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

  const doLogOut = () => {
    signalService.localStore.reSet();
    WebSocketService.close();
    logout();
  };


  return (
    <Layout isLoading={isLoading}>
      <View style={tw`h-full flex-col p-2 pb-0 gap-3`}>
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
                    Mã sinh viên: 178205
                  </Text>
                  {/* <Text style={tw`text-[#444]`}>
                    Niên khóa: 2025 - 2029
                  </Text> */}
                  <Text style={tw`text-[#444]`}>
                    Học kỳ I <Text style={tw`text-[#339933]`}>(Đã thanh toán học phí)</Text>
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
                  style={tw`h-full`}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  showsHorizontalScrollIndicator={false}
                  persistentScrollbar={true}
                >
                  <TouchableRipple borderless onPress={() => { }}>
                    <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                      <View style={tw`flex-row gap-3 items-center`}>
                        <LucideIcon icon="Info" color={COLORS.primary} size={26} strokeWidth={1.5} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-base text-[#444]`}>Thông tin sinh viên</Text>
                      </View>
                    </View>
                  </TouchableRipple>

                  <Divider style={tw`m-0`} />

                  <TouchableRipple borderless onPress={() => { }}>
                    <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                      <View style={tw`flex-row gap-3 items-center`}>
                        <LucideIcon icon="LockKeyhole" color={COLORS.primary} size={26} strokeWidth={1.5} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-base text-[#444]`}>Đổi mật khẩu</Text>
                      </View>
                    </View>
                  </TouchableRipple>

                  <Divider style={tw`m-0`} />

                  <TouchableRipple borderless onPress={() => { }}>
                    <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                      <View style={tw`flex-row gap-3 items-center`}>
                        <LucideIcon icon="Album" color={COLORS.primary} size={26} strokeWidth={1.5} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-base text-[#444]`}>Điều khoản sử dụng</Text>
                      </View>
                    </View>
                  </TouchableRipple>

                  <Divider style={tw`m-0`} />

                  <TouchableRipple borderless onPress={() => { }}>
                    <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                      <View style={tw`flex-row gap-3 items-center`}>
                        <LucideIcon icon="Album" color={COLORS.primary} size={26} strokeWidth={1.5} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-base text-[#444]`}>Chính sách bảo vệ DLCN</Text>
                      </View>
                    </View>
                  </TouchableRipple>

                  <Divider style={tw`m-0`} />

                  <TouchableRipple borderless onPress={() => { }}>
                    <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                      <View style={tw`flex-row gap-3 items-center`}>
                        <LucideIcon icon="Info" color={COLORS.primary} size={26} strokeWidth={1.5} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-base text-[#444]`}>Thông tin ứng dụng</Text>
                      </View>
                    </View>
                  </TouchableRipple>

                  <Divider style={tw`m-0`} />

                  <TouchableRipple
                    borderless
                    onPress={doLogOut}>
                    <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                      <View style={tw`flex-row gap-3 items-center`}>
                        <LucideIcon icon="LogOut" color={COLORS.primary} size={26} strokeWidth={1.5} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-base text-[#444]`}>Đăng xuất</Text>
                      </View>
                    </View>
                  </TouchableRipple>
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
