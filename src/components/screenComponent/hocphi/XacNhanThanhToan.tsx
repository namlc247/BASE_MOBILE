import React, { useState } from 'react';
import { Image, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Portal, Dialog, Chip, Divider, Button, Checkbox, TouchableRipple } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { LucideIcon } from '../../LucideIcon';
import NumberUtil from '../../../utils/numberUtils';
import BaseDialog from '../../dialog-base/BaseDialog';
import logoBIDV from "../../../accsets/image/logo_BIDV.png";
import logoMBBANK from "../../../accsets/image/logo_MBBANK.png";
import { useBaseDialog } from '../../../contexts/BaseDialogContext';

interface XacNhanThanhToanProps {
  phuongthuc: any;
  data: any;
  onConfirmThanhToan: (item: any) => void;
}

const XacNhanThanhToan: React.FC<XacNhanThanhToanProps> = ({
  phuongthuc,
  data,
  onConfirmThanhToan
}) => {
  const [isConfirm, setIsConfirm] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("phuongthuc", phuongthuc);
    console.log("XacNhanThanhToan", data);
  }, []);

  const totalPrice = data
    .reduce((sum: number, item: any) => sum + item.priceNumber, 0);

  return (
    <View style={tw`flex-1  flex-col`} >
      <View style={tw`flex-1 px-1 flex-col`}>
        <ScrollView
          style={tw`flex-1`}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          persistentScrollbar={true}
        >
          <Text style={tw`font-bold text-lg text-[#333] mb-3 px-1`}>
            Danh sách hóa đơn ({data.length})
          </Text>

          {data.map((item: any) => (
            <TouchableRipple
              key={item.id}
              borderless
              onPress={() => { }}
              style={tw`mt-3 bg-[${COLORS.backgroundColorGray}] p-3 rounded-lg flex-row items-center `}
            >
              <View style={tw`flex-row items-center flex-1 gap-3`}>
                {/* Checkbox */}
                {/* <View style={tw`p-1`}>
                  <Checkbox
                    status={selectedItems.includes(item.id) ? 'checked' : 'unchecked'}
                  />
                </View> */}

                {/* Thông tin */}
                <View style={tw`flex-1`}>
                  <Text style={tw`mb-1 text-base text-[#333]`}>
                    {item.title}
                  </Text>
                  <Text style={tw`font-500 text-base text-[${COLORS.primary}]`}>
                    {item.price}
                  </Text>
                </View>

                <View style={tw`p-1`}>
                  <LucideIcon icon={'ChevronDown'} color="#333" size={22} strokeWidth={1.5} />
                </View>
              </View>
            </TouchableRipple>
          ))}
        </ScrollView>
      </View>

      <Divider style={tw`my-2`} />


      <TouchableRipple
        borderless
        onPress={() => {
          setIsConfirm(!isConfirm);
        }}
        style={tw``}
      >
        <View style={tw`flex-row py-2 px-1 gap-3`}>
          <View>
            <Checkbox
              status={isConfirm ? 'checked' : 'unchecked'}
            />
          </View>

          <View style={tw`flex-1`}>
            <Text style={tw`text-base text-[#333]`}>
              Tôi đã hiểu và đồng ý với <Text style={tw`text-[${COLORS.primary}] font-bold`}>điều khoản và điều kiện</Text > và <Text style={tw`text-[${COLORS.primary}] font-bold`}>chính sách bảo mật thanh toán</Text>, bao gồm cả hạn mức và phí theo quy định
            </Text>
          </View>
        </View>
      </TouchableRipple>

      <Divider style={tw`my-2`} />

      <View style={tw`flex-row items-center justify-between py-2 px-1 gap-1`}>
        <View>
          <Text style={tw` font-500 text-[#666] mb-1`}>
            Tổng tiền thanh toán
          </Text>

          <Text style={tw`font-bold text-lg`}>
            {NumberUtil.formatNumber(totalPrice)} VND
          </Text>
        </View>


        <View>
          <Button
            style={tw`p-1`}
            mode="contained"
            disabled={!isConfirm}
            onPress={() => {
              onConfirmThanhToan("ok");
            }}
          >
            <Text style={tw`uppercase text-white`}>Xuất QR</Text>
          </Button>
        </View>

      </View>

    </View>
  );
};



export default XacNhanThanhToan;
