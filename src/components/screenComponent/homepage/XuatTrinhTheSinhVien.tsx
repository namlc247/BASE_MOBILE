import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Card, Divider, Searchbar, TouchableRipple } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { useBaseDialog } from '../../../contexts/BaseDialogContext';
import { LucideIcon } from '../../LucideIcon';
import logoApp from "../../../accsets/iconApp/logoApp.png";
import { useUser } from '../../../contexts/UserContext';


interface XuatTrinhTheSinhVienProps {

}

const XuatTrinhTheSinhVien: React.FC<XuatTrinhTheSinhVienProps> = ({

}) => {
  const { userDetail } = useUser();
  React.useEffect(() => {

  }, []);

  return (
    <View style={tw`flex-1 `}>
      <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-lg mb-3`}>
        <Card.Content style={tw`p-2`}>
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-9.5 h-9.5 rounded-full `}></View>

            <View style={tw`flex-1 flex-col justify-center items-center`}>
              <Text style={tw`text-[#444] font-bold`}>
                Học viện Kỹ thuật quân sự
              </Text>
              <Text style={tw`text-[#444] font-bold`}>
                Thẻ sinh viên
              </Text>
            </View>

            <View style={tw`w-9.5 h-9.5 rounded-full `}>
              <Image
                source={logoApp}
                style={tw`w-full h-full`}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={tw``}>
            <Divider style={tw`my-2 bg-[${COLORS.primary}]`} />
          </View>

          <View style={tw`flex-row items-center gap-6 mb-2`}>
            <View style={tw`w-24 h-32 rounded-lg border border-[${COLORS.primary}]`}></View>

            <View style={tw`flex-1 flex-col gap-1`}>
              <View style={tw`flex-row gap-1 items-center`}>
                <Text style={tw`font-medium text-[#444]`}>Họ tên:</Text>

                <View style={tw`flex-1`}>
                  <Text style={tw`uppercase text-[#444]`}>{userDetail?.fullname}</Text>

                </View>
              </View>

              <Text style={tw`text-[#444]`}>
                <Text style={tw`font-medium`}>Ngày sinh:</Text>  <Text style={tw`uppercase`}>04/02/2006</Text>
              </Text>
              <Text style={tw`text-[#444]`}>
                <Text style={tw`font-medium`}>Lớp:</Text>  <Text style={tw`uppercase`}>CNTT16B</Text>
              </Text>
              <Text style={tw`text-[#444]`}>
                <Text style={tw`font-medium`}>Niên khóa:</Text>  <Text style={tw`uppercase`}>2026 - 2031</Text>
              </Text>

              <View style={tw`flex-row gap-1 items-center`}>
                <Text style={tw`font-medium text-[#444]`}>Ngành:</Text>

                <View style={tw`flex-1`}>
                  <Text style={tw`text-[#444]`}>Công nghệ thông tin</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={tw``}>
            <Text style={tw`text-[#999] font-bold text-xs`}>
              <Text style={tw``}>Mã SV:</Text>  <Text style={tw`uppercase`}>16464215</Text>
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={tw`mt-2`}>
        <Text style={tw`text-[#444]`}>
          <Text style={tw`font-medium`}>Dân tộc:</Text>  <Text style={tw``}>Kinh</Text>
        </Text>
      </View>
    </View>
  );
};



export default XuatTrinhTheSinhVien;
