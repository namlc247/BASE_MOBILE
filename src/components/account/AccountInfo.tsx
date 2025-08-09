import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Portal, Dialog, Card, TextInput, Button } from 'react-native-paper';
import tw from "twrnc";
import { LucideIcon } from '../LucideIcon';
import COLORS from '../../constants/colors';
import TextInputPaper from '../Input/TextInputPaper';
import ColorUtil from '../../utils/colorUtil';

interface AccountInfoProps {
  // visible: boolean;
  // onDismiss: () => void;
  // dialogStyle?: StyleProp<ViewStyle>;
  // children?: React.ReactNode;
  // titleDialog?: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  // visible,
  // onDismiss,
  // dialogStyle,
  // children,
  // titleDialog = ""
}) => {
  const [fullName, setFullName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("admin@gmail.com");
  const [year, setYear] = useState("2025 - 2029");

  return (
    <View style={tw`flex-1`}>

      <ScrollView
        style={tw`h-full`}
        contentContainerStyle={tw`h-full`}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-[#666] mb-3 pl-1`}>
            Họ tên
          </Text>

          <TextInputPaper
            value={fullName}
            placeholder="Nhập họ và tên"
            onChangeText={setFullName}
            autoCapitalize="none"
            mode="outlined"
            style={tw`bg-[${COLORS.backgroundColorInputGray}]`}
            outlineStyle={tw`rounded-2xl`}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-[#666] mb-3 pl-1`}>
            Ngày sinh
          </Text>

          <TextInputPaper
            value={birthDay}
            placeholder="dd/MM/yyyy"
            onChangeText={setBirthDay}
            autoCapitalize="none"
            mode="outlined"
            style={tw`bg-[${COLORS.backgroundColorInputGray}]`}
            outlineStyle={tw`rounded-2xl`}
            right={
              <TextInput.Icon
                icon={() => (
                  <LucideIcon icon={'CalendarDays'} color="#666" size={22} strokeWidth={1.5} />
                )}
                onPress={() => { }}
              />
            }
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-[#666] mb-3 pl-1`}>
            Số điện thoại
          </Text>

          <TextInputPaper
            value={phone}
            placeholder="Nhập số điện thoại"
            onChangeText={setPhone}
            autoCapitalize="none"
            mode="outlined"
            style={tw`bg-[${COLORS.backgroundColorInputGray}]`}
            outlineStyle={tw`rounded-2xl`}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-[#666] mb-3 pl-1`}>
            Địa chỉ Email
          </Text>

          <TextInputPaper
            value={email}
            placeholder="Nhập địa chỉ email"
            onChangeText={setEmail}
            autoCapitalize="none"
            mode="outlined"
            style={tw`bg-[${COLORS.backgroundColorInputGray}]`}
            outlineStyle={tw`rounded-2xl`}
            disabled={true}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-[#666] mb-3 pl-1`}>
            Niên khóa
          </Text>

          <TextInputPaper
            value={year}
            placeholder="Nhập niên khóa"
            onChangeText={setYear}
            autoCapitalize="none"
            mode="outlined"
            style={tw`bg-[${COLORS.backgroundColorInputGray}]`}
            outlineStyle={tw`rounded-2xl`}
            disabled={true}
          />
        </View>

        <View style={tw`flex-row justify-center gap-3 mt-4`}>
          <Button
            style={tw`w-full rounded-xl`}
            mode="contained"
          >
            <Text style={tw`uppercase font-bold`}>Cập nhật</Text>
          </Button>
        </View>
      </ScrollView>

    </View>
  );
};

export default AccountInfo;
