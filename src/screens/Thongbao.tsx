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

export default function Thongbao() {
  const [isLoading, setIsLoading] = React.useState<any>(false);

  React.useEffect(() => {
  }, []);

  useFocusEffect(
    useCallback(() => {

    }, [])
  );


  return (
    <Layout isLoading={isLoading}>
      <View style={tw`h-full flex-col p-4 pt-0 gap-3`}>
        <View style={tw`flex-1`}>
          <Card style={tw`bg-white h-full`}>
            <Card.Content style={tw`p-3 px-4 pt-0 h-full`}>
              <View style={tw``}>

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
