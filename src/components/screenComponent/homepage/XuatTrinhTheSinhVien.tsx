import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Card, Divider, Searchbar, TouchableRipple } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { useBaseDialog } from '../../../contexts/BaseDialogContext';
import { LucideIcon } from '../../LucideIcon';
import logoApp from "../../../accsets/iconApp/logoApp.png";
import anh_the from "../../../accsets/image/anh_the.jpg";
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
      {/* <Card style={tw`bg-[${COLORS.backgroundColorInput}] rounded-lg mb-3 shadow-none`}>
        <Card.Content style={tw`p-2 shadow-none`}> */}
      <View style={tw`p-3 bg-[${COLORS.backgroundColorInput}] rounded-lg mb-3 border border-[${COLORS.borderColorGray}]`}>
        <View style={tw`flex-row items-center gap-2`}>
          <View style={tw`w-9.5 h-9.5 rounded-full `}></View>

          <View style={tw`flex-1 flex-col justify-center items-center`}>
            <Text style={tw`text-[#444] font-bold uppercase mb-0.5`}>
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
          <Divider style={tw`my-2 mb-3 bg-[${COLORS.primary}] h-0.25`} />
        </View>

        <View style={tw`flex-row items-center gap-6 mb-2`}>
          <View style={tw`w-24 h-32  overflow-hidden`}>
            <Image
              source={anh_the}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          </View>

          <View style={tw`flex-1 flex-col gap-1`}>
            <View style={tw`flex-row gap-1 items-center`}>
              <Text style={tw`font-medium text-[#444]`}>Họ tên:</Text>

              <View style={tw`flex-1`}>
                {/* <Text style={tw`uppercase text-[#444]`}>{userDetail?.fullname}</Text> */}
                <Text style={tw`uppercase text-[#444]`}>Đỗ Thành An</Text>

              </View>
            </View>

            <Text style={tw`text-[#444]`}>
              <Text style={tw`font-medium`}>Ngày sinh:</Text>  <Text style={tw`uppercase`}>04/02/2006</Text>
            </Text>
            <Text style={tw`text-[#444]`}>
              <Text style={tw`font-medium`}>Lớp:</Text>  <Text style={tw`uppercase`}>CNTT16B</Text>
            </Text>

            <View style={tw`flex-row gap-1 items-center`}>
              <Text style={tw`font-medium text-[#444]`}>Ngành:</Text>

              <View style={tw`flex-1`}>
                <Text style={tw`text-[#444]`}>Công nghệ thông tin</Text>
              </View>
            </View>

            <Text style={tw`text-[#444]`}>
              <Text style={tw`font-medium`}>Niên khóa:</Text>  <Text style={tw`uppercase`}>2026 - 2031</Text>
            </Text>


          </View>
        </View>

        <View style={tw``}>
          <Text style={tw`text-[#999] font-bold text-xs`}>
            <Text style={tw``}>Mã SV:</Text>  <Text style={tw`uppercase`}>16464215</Text>
          </Text>
        </View>
      </View>
      {/* </Card.Content>
      </Card> */}

      <View style={tw`mt-2`}>
        <Text style={tw`text-[#444]`}>
          <Text style={tw`font-bold `}>Căn cước / CMND:</Text>  <Text style={tw``}>1206013316</Text>
        </Text>
      </View>

      <View style={tw`flex-row mt-2`}>
        <Text style={tw`flex-1 text-[#444]`}>
          <Text style={tw`font-bold `}>Dân tộc:</Text>  <Text style={tw``}>Kinh</Text>
        </Text>

        <Text style={tw`flex-1 text-[#444]`}>
          <Text style={tw`font-bold `}>Giới tính:</Text>  <Text style={tw``}>Nam</Text>
        </Text>
      </View>

      <View style={tw`mt-2`}>
        <Text style={tw`text-[#444]`}>
          <Text style={tw`font-bold `}>Nơi sinh:</Text>  <Text style={tw``}>Hà Nội</Text>
        </Text>
      </View>

      <View style={tw`mt-2`}>
        <Text style={tw`text-[#444]`}>
          <Text style={tw`font-bold `}>Địa chỉ:</Text>  <Text style={tw``}>Quận Hoàng Mai, Hà Nội</Text>
        </Text>
      </View>
    </View>
  );
};



export default XuatTrinhTheSinhVien;
