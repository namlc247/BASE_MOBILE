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

interface PhuongThucThanhToanProps {
  onSelectPhuongThuc: (item: any) => void;
}

const menuItems = [
  {
    id: 'BIDV',
    image: logoBIDV,
    label: "BIDV",
    subLabel: "Thanh toán qua ngân hàng BIDV",
  },
  {
    id: 'MBBANK',
    image: logoMBBANK,
    label: "MBBANK",
    subLabel: "Thanh toán qua ngân hàng MBBANK",
  }
];

const PhuongThucThanhToan: React.FC<PhuongThucThanhToanProps> = ({
  onSelectPhuongThuc
}) => {

  React.useEffect(() => {

  }, []);


  return (
    <View style={tw`flex-1`} >
      <View style={tw`px-1`}>
        <Text style={tw`font-bold text-lg text-[#333] mb-3 px-1`}>
          Chọn phương thức thanh toán
        </Text>

        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableRipple
              borderless
              onPress={() => {
                onSelectPhuongThuc(item.id);
              }}
              style={tw`border-b border-gray-200`}
            >
              <View style={tw`flex-row gap-5 items-center py-3`}>
                <View style={tw`p-2 border border-[${COLORS.borderColorGray}] rounded-xl `}>
                  <View style={tw`w-12 h-12`}>
                    <Image
                      source={item.image}
                      style={tw`w-full h-full`}
                      resizeMode="contain" // hoặc "contain"
                    />
                  </View>
                </View>

                <View style={tw`flex-1`}>
                  <Text style={tw`text-base text-[#333] font-500`}>{item.label}</Text>
                  <Text style={tw`text-base text-[${COLORS.textInactive}]`}>{item.subLabel}</Text>
                </View>
              </View>
            </TouchableRipple>

            {/* Divider */}
            {/* {index < menuItems.length - 1 && <Divider style={tw`m-0`} />} */}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};



export default PhuongThucThanhToan;
