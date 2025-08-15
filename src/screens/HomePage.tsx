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
  Linking,
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
import ExpandableCalendarScreen from "./expandableCalendarScreen";
import { useBaseDialog } from "../contexts/BaseDialogContext";
import SearchAll from "../components/screenComponent/homepage/SearchAll";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import XuatTrinhTheSinhVien from "../components/screenComponent/homepage/XuatTrinhTheSinhVien";
import HocPhi from "../components/screenComponent/tienich/HocPhi";
import LichCanhan from "../components/screenComponent/tienich/LichCanhan";

const notifications = [
  {
    id: 1,
    day: '09',
    date: '08/2025',
    title: 'Thông báo danh sách trúng tuyển và kế hoạch nhập học cao học hệ dân sự năm 2025'
  },
  {
    id: 2,
    day: '08',
    date: '08/2025',
    title: 'Thông báo về việc tổ chức thi kết thúc học phần đợt học lại cho sinh viên dân sự trong Học kỳ hè năm học 2024-2025'
  },
  {
    id: 3,
    day: '07',
    date: '08/2025',
    title: 'Thông báo thi ngoại ngữ trình độ A1 A2 đợt tháng 08 năm 2025'
  },
  {
    id: 4,
    day: '07',
    date: '08/2025',
    title: 'Thông báo thi chuẩn đầu ra Ngoại ngữ (trình độ B1) cho học, viên sinh viên đợt tháng 8 năm 2025'
  },
  {
    id: 5,
    day: '30',
    date: '07/2025',
    title: 'Học viện Kỹ thuật quân sự thông báo Quyết định công nhận tốt nghiệp cho sinh viên dân sự đợt xét tháng 6 năm 2025'
  },
];

export default function HomePage() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const { showBaseDialog, closeAllBaseDialogs } = useBaseDialog();
  const { userDetail, listImageGlobal } = useUser();
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const logout = useAuthStore((state) => state.logout);

  const [text, setText] = React.useState("");


  const [selectedDate, setSelectedDate] = useState('');

  const menuItems = [
    {
      id: 1, icon: 'CreditCard', label: 'Học phí', type: 'dialog',
      dialogItem: <HocPhi
        showBaseDialog={showBaseDialog}
        closeAllBaseDialogs={closeAllBaseDialogs}
      />
    },
    { id: 2, icon: 'BookOpen', label: 'Đăng ký tín chỉ' },
    { id: 3, icon: 'CalendarDays', label: 'Thời khóa biểu' },
    { id: 4, icon: 'Users', label: 'Hoạt động đoàn thể' },
    {
      id: 5, icon: 'CalendarFold', label: 'Lịch cá nhân', type: 'dialog',
      dialogItem: <LichCanhan />
    },
    { id: 6, icon: 'FileSearch', label: 'Tra cứu tài liệu' },
  ];

  // Dữ liệu custom: ngày được đánh dấu và chọn
  const markedDates = {
    '2025-08-10': { marked: true, dotColor: 'red' },
    '2025-08-11': { selected: true, selectedColor: '#4CAF50' },
    '2025-08-12': { marked: true, dotColor: 'blue' },
    [selectedDate]: { selected: true, selectedColor: '#2196F3' },
  };

  React.useEffect(() => {
  }, []);

  useFocusEffect(
    useCallback(() => {

    }, [])
  );


  const handleSearch = () => {
    showBaseDialog(
      'Tìm kiếm',
      <SearchAll
        data={menuItems}
        handleClickItem={(item: any) => {
          handleMenuItemClick(item);
        }}
      />,
    );
  }

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
        <View style={tw`flex-row gap-2`}>

          <Card style={tw`bg-white flex-1 max-h-full`}>
            <Card.Content style={tw`p-3 px-4 max-h-full`}>
              <View style={tw``}>
                <View style={tw`flex-row gap-4 justify-center items-center mb-4`}>
                  <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-full`}>
                    <Card.Content style={tw`p-0`}>
                      <TouchableRipple
                        borderless
                        onPress={() => { }}
                        style={tw`w-9.5 h-9.5 rounded-full `}>

                        <Image
                          source={listImageGlobal[userDetail?.image] ?? require('../accsets/avatarDefault.jpg')}
                          style={tw`w-full h-full`}
                          resizeMode="contain"
                        />

                      </TouchableRipple>
                    </Card.Content>
                  </Card>

                  <View style={tw`flex-1 flex-col gap-0.5`}>
                    <Text style={tw`text-base text-center font-bold uppercase text-[#444] mb-1`}>
                      {userDetail?.fullname}
                    </Text>
                    <Text style={tw`text-[#444] text-center text-xs`}>
                      MÃ SV: 16464215
                    </Text>
                  </View>

                  <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-full`}>
                    <Card.Content style={tw`p-0`}>
                      <TouchableRipple
                        borderless
                        onPress={() => {
                          handleSearch();
                        }}
                        style={tw`p-2 rounded-full`}>
                        <LucideIcon icon={'Search'} color={COLORS.primary} size={22} strokeWidth={1.5} />
                      </TouchableRipple>
                    </Card.Content>
                  </Card>
                </View>

                <View style={tw`flex-row gap-3 justify-center items-center`}>
                  <View style={tw`flex-1`}>
                    <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-lg`}>
                      <Card.Content style={tw`p-0`}>
                        <TouchableRipple
                          borderless
                          onPress={() => {
                            showBaseDialog(
                              'Xuất trình thẻ sinh viên',
                              <XuatTrinhTheSinhVien />
                            )
                          }}
                          style={tw`p-2 rounded-lg`}>
                          <View style={tw`flex-row justify-center items-center gap-2`}>
                            <View>
                              <LucideIcon icon={'IdCard'} color={COLORS.primary} size={30} strokeWidth={1.25} />
                            </View>

                            <View style={tw`flex-1 text-[#333]`}>
                              <Text style={tw`text-xs font-500 text-[#444] mb-0.5`}>
                                Xuất trình
                              </Text>
                              <Text style={tw`text-xs font-500 text-[#444]`}>
                                Thẻ sinh viên
                              </Text>
                            </View>
                          </View>
                        </TouchableRipple>

                      </Card.Content>
                    </Card>
                    {/* <View style={tw`w-full p-3 rounded-lg border border-[${COLORS.primary}] bg-[${COLORS.backgroundColorInput}] flex-row justify-center items-center`}>
                    </View> */}
                  </View>

                  <View style={tw`flex-1`}>
                    <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-lg`}>
                      <Card.Content style={tw`p-0`}>
                        <TouchableRipple
                          borderless
                          onPress={() => { }}
                          style={tw`p-2 rounded-lg`}>
                          <View style={tw`flex-row justify-center items-center gap-2`}>
                            <View>
                              <LucideIcon icon={'ScanLine'} color={COLORS.primary} size={24} strokeWidth={1.5} />
                            </View>

                            <View style={tw`flex-1`}>
                              <Text style={tw`text-xs font-500 text-[#444] mb-0.5`}>
                                Mã QR
                              </Text>
                              <Text style={tw`text-xs font-500 text-[#444]`}>
                                Định danh điện tử
                              </Text>
                            </View>
                          </View>
                        </TouchableRipple>
                      </Card.Content>
                    </Card>
                  </View>
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
                  <View style={tw`flex-row gap-3 justify-between items-center`}>
                    <View>
                      <Text style={tw`font-bold text-base text-[#333]`}>
                        Tiện ích yêu thích
                      </Text>
                    </View>

                    <View>
                      <TouchableRipple
                        borderless
                        onPress={() => { }}
                        style={tw`p-2 rounded-lg`}>
                        <View style={tw`flex-row gap-2 items-center`}>
                          <Text style={tw` text-[#333]`}>
                            Chỉnh sửa
                          </Text>

                          <View>
                            <LucideIcon icon={'PencilLine'} color={COLORS.primary} size={18} strokeWidth={1.5} />
                          </View>
                        </View>

                      </TouchableRipple>
                    </View>
                  </View>

                  <View style={tw`flex-row flex-wrap items-start`}>
                    {menuItems.map((item) => (
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

                  {/* <View style={tw`flex-row gap-3 justify-between items-center mb-1`}>
                    <View>
                      <Text style={tw`font-bold text-base text-[#333]`}>
                        Trang thông tin học viện
                      </Text>
                    </View>

                    <View>
                      <TouchableRipple
                        borderless
                        onPress={() => {
                          Linking.openURL('https://mta.edu.vn/');
                        }}
                        style={tw`p-2 rounded-lg`}>
                        <View style={tw`flex-row gap-2 items-center`}>
                          <View>
                            <LucideIcon icon={'MousePointer2'} color={COLORS.primary} size={18} strokeWidth={1.5} />
                          </View>

                          <Text style={tw` text-[#333]`}>
                            Xem thêm
                          </Text>
                        </View>

                      </TouchableRipple>
                    </View>
                  </View>

                  <View style={tw`flex-col justify-between items-center mb-1`}>
                    {notifications.map((item) => (
                      <TouchableRipple
                        key={item.id}
                        borderless
                        onPress={() => {
                          console.log(`Clicked ${item.title}`);
                        }}
                        style={tw`flex-row p-1.5 rounded-xl`}
                      >
                        <View style={tw`flex-1 flex-row gap-4 items-center`}>

                          <View style={tw`flex-col gap-0.5 items-center py-1 px-2 bg-[${COLORS.primary}] rounded-xl`}>
                            <Text style={tw`font-bold text-white`}>{item.day}</Text>
                            <Text style={tw`font-500 text-white text-sm`}>{item.date}</Text>
                          </View>

                          <View style={tw`flex-1`}>
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              style={{ lineHeight: 22 }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      </TouchableRipple>
                    ))}
                  </View> */}

                  <View style={tw`flex-row gap-3 justify-between items-center mb-1`}>
                    <View>
                      <Text style={tw`font-bold text-base text-[#333]`}>
                        Thông báo từ Học viện
                      </Text>
                    </View>

                    <View>
                      <TouchableRipple
                        borderless
                        onPress={() => {

                        }}
                        style={tw`p-2 rounded-lg`}>
                        <View style={tw`flex-row gap-2 items-center`}>
                          <Text style={tw` text-[#333]`}>
                            Xem thêm
                          </Text>

                          <View>
                            <LucideIcon icon={'MousePointer2'} color={COLORS.primary} size={18} strokeWidth={1.5} />
                          </View>
                        </View>

                      </TouchableRipple>
                    </View>
                  </View>

                  <View style={tw`flex-col gap-1 justify-between items-center mb-1`}>
                    {notifications.map((item) => (
                      <TouchableRipple
                        key={item.id}
                        borderless
                        onPress={() => {
                          console.log(`Clicked ${item.title}`);
                        }}
                        style={tw`flex-row p-1.5 rounded-xl`}
                      >
                        <View style={tw`flex-1 flex-row gap-4 items-center`}>
                          {/* Ngày tháng */}
                          <View style={tw`flex-col gap-0.5 items-center py-1 px-2 bg-[${COLORS.primary}] rounded-xl`}>
                            <Text style={tw`font-bold text-white`}>{item.day}</Text>
                            <Text style={tw`font-500 text-white text-sm`}>{item.date}</Text>
                          </View>

                          {/* Nội dung */}
                          <View style={tw`flex-1`}>
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              style={{ lineHeight: 22 }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      </TouchableRipple>
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
