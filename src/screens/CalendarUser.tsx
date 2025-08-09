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
import { Calendar } from 'react-native-calendars';
import CalendarUtils from "../utils/calendarUtils";

export default function CalendarUser() {
  const { userDetail, listImageGlobal } = useUser();
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const logout = useAuthStore((state) => state.logout);

  const [text, setText] = React.useState("");


  const [selectedDate, setSelectedDate] = useState<any>();

  // Dữ liệu custom: ngày được đánh dấu và chọn
  const markedDates = {
    '2025-08-10': { marked: true, dotColor: 'red' },
    '2025-08-11': { selected: true, selectedColor: '#4CAF50' },
    '2025-08-12': { marked: true, dotColor: 'blue' },
    [selectedDate?.dateString]: { selected: true, selectedColor: '#2196F3' },
  };

  React.useEffect(() => {
  }, []);

  useFocusEffect(
    useCallback(() => {

    }, [])
  );



  return (
    <Layout isLoading={isLoading}>
      <View style={tw`h-full flex-col pb-0 gap-3`}>
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
                  <Calendar
                    // Hiển thị đánh dấu và chọn ngày
                    markedDates={markedDates}
                    // Sự kiện khi chọn ngày
                    onDayPress={(day: any) => {
                      console.log('Ngày được chọn:', day);
                      setSelectedDate(day);
                    }}
                    // Tuỳ chỉnh theme
                    theme={{
                      selectedDayBackgroundColor: '#00adf5',
                      todayTextColor: '#00adf5',
                      arrowColor: '#00adf5',
                    }}
                  />

                  {selectedDate && (
                    <Text style={styles.selectedText}>Ngày đã chọn: {CalendarUtils.customFormatDate(selectedDate.timestamp, 'DD/MM/YYYY')}</Text>
                  )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
