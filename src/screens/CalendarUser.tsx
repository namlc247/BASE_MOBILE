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

const accountItems: { [key: string]: any[] } = {
  "2025-08-12": [
    {
      time: "08:00",
      label: "Toán ứng dụng",
    },
    {
      time: "13:30",
      label: "Cơ sở toán học cho tin học",
    },
  ],
  "2025-08-13": [
    {
      time: "08:00",
      label: "Kỹ thuật điều khiển và tự động hóa",
    },
    {
      time: "10:00",
      label: "Kỹ thuật điện tử",
    },
    {
      time: "13:30",
      label: "Chỉ huy, quản lý kỹ thuật",
    }
  ],
  "2025-08-14": [
    {
      time: "08:00",
      label: "Kỹ thuật rađa - dẫn đường",
    },
    {
      time: "13:30",
      label: "Kỹ thuật cơ khí",
    }
  ]
};

export default function CalendarUser() {
  const { userDetail, listImageGlobal } = useUser();
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const logout = useAuthStore((state) => state.logout);

  const [text, setText] = React.useState("");
  const today = CalendarUtils.customFormatDate(new Date(), 'YYYY-MM-DD');

  const theme = useRef(getTheme());
  const [selectedDate, setSelectedDate] = useState<string>(today);

  // Dữ liệu custom: ngày được đánh dấu và chọn
  const markedDates = {
    [today]: { selected: true, selectedColor: "#008ebf" },
    [selectedDate]: { selected: true, selectedColor: COLORS.primary },
  };

  React.useEffect(() => {
  }, []);

  useFocusEffect(
    useCallback(() => {

    }, [])
  );

  const renderHeader = useCallback(
    (date?: XDate) => {
      return (
        <View style={tw`flex-row justify-center items-center mb-2`}>
          <Text style={tw`text-base font-bold uppercase m-1 mt-2 text-[${COLORS.primary}]`}>{date?.toString('MMMM yyyy')}</Text>
        </View>
      );
    },
    []
  );


  return (
    <Layout isLoading={isLoading}>
      <View style={tw`h-full flex-col p-4 pt-0 gap-3`}>
        <View style={tw`flex-1`}>
          <Card style={tw`bg-white h-full`}>
            <Card.Content style={tw`p-3 px-4 pt-0 h-full`}>
              <View style={tw`flex-1 flex-col gap-3`}>
                <Calendar
                  style={tw`p-0 m-0`}
                  // Hiển thị đánh dấu và chọn ngày
                  renderHeader={renderHeader}
                  markedDates={markedDates}
                  firstDay={1}
                  // Sự kiện khi chọn ngày
                  onDayPress={(day: any) => {
                    console.log('Ngày được chọn:', day);
                    setSelectedDate(day.dateString);
                  }}
                  // Tuỳ chỉnh theme
                  theme={theme.current}
                />

                <View style={tw`px-2`}>
                  <Text style={tw`text-sm font-bold text-[#999]`}>
                    Ngày {CalendarUtils.customFormatDate(selectedDate, 'DD/MM/YYYY')}
                  </Text>
                </View>

                <ScrollView
                  style={tw`flex-1`}
                >
                  <View style={tw`flex-col gap-3`}>
                    {accountItems[selectedDate]?.map((item: any, index) => (
                      <React.Fragment key={index}>
                        <TouchableRipple
                          borderless
                          onPress={() => {

                          }}
                          style={tw`bg-[${COLORS.backgroundColorGray}] rounded-xl border border-[${COLORS.borderColorGray}]`}
                        >
                          <View style={tw`flex-row gap-4 items-center px-3 py-2`}>
                            <View style={tw``}>
                              <Text style={tw`text-base font-bold text-[#444]`}>{item.time}</Text>
                            </View>
                            <View style={tw`flex-1`}>
                              <Text style={tw`text-base text-[#444]`}>{item.label}</Text>
                            </View>
                          </View>
                        </TouchableRipple>
                      </React.Fragment>
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



const styles = StyleSheet.create({
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginVertical: 10
  // },
  // headerTitle: { fontSize: 16, fontWeight: 'bold', marginRight: 6 },
});
