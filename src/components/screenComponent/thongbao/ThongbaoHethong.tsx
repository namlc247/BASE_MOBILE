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

interface ThongbaoHethongProps {

}

const ThongbaoHethong: React.FC<ThongbaoHethongProps> = ({

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



export default ThongbaoHethong;
