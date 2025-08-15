import React from 'react';
import { ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Portal, Dialog, Chip, Divider, Button, Checkbox, TouchableRipple } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { LucideIcon } from '../../LucideIcon';
import NumberUtil from '../../../utils/numberUtils';

const notifications = [
  {
    id: 1,
    day: '09',
    date: '08/2025',
    title: 'Bạn có 1 hóa đơn chưa thanh toán'
  },
];

interface ThongbaoTaikhoanProps {

}

const ThongbaoTaikhoan: React.FC<ThongbaoTaikhoanProps> = ({

}) => {

  React.useEffect(() => {

  }, []);


  return (
    <View style={tw`flex-1 flex-col mt-3`} >
      <View style={tw`flex-1`}>
        <ScrollView
          style={tw`flex-1`}
        >
          <View style={tw`flex-col gap-1 justify-between items-center mb-1`}>
            {notifications.map((item) => (
              <TouchableRipple
                key={item.id}
                borderless
                onPress={() => {
                  // console.log(`Clicked ${item.title}`);
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
    </View>
  );
};



export default ThongbaoTaikhoan;
