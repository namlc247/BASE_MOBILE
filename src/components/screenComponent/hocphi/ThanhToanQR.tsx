import React, { useState } from 'react';
import { Image, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Portal, Dialog, Chip, Divider, Button, Checkbox, TouchableRipple, Tooltip } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { LucideIcon } from '../../LucideIcon';
import NumberUtil from '../../../utils/numberUtils';
import BaseDialog from '../../dialog-base/BaseDialog';
import logoBIDV from "../../../accsets/image/logo_BIDV.png";
import logoMBBANK from "../../../accsets/image/logo_MBBANK.png";
import { useBaseDialog } from '../../../contexts/BaseDialogContext';
import logoVietQR from "../../../accsets/image/VietQR_Logo.png";
import TEST_QR from "../../../accsets/image/qr_test.jpeg";
import { useLoading } from '../../../contexts/LoadingContext';

interface ThanhToanQRProps {
  phuongthuc: any;
  data: any;
  onConfirmXacNhan: (item: any) => void;
}

const ThanhToanQR: React.FC<ThanhToanQRProps> = ({
  phuongthuc,
  data,
  onConfirmXacNhan
}) => {
  const { showLoading, hideLoading } = useLoading();
  const totalSeconds = 15 * 60; // 15 phút
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  React.useEffect(() => {
    console.log("phuongthuc", phuongthuc);
    console.log("ThanhToanQR", data);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

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
            Giao dịch hết hạn sau:
            <Text style={tw`text-[${COLORS.primary}] font-bold`}>
              {` ${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`}
            </Text>
          </Text>


          <View
            style={tw`mt-3 bg-[${COLORS.backgroundColorGray}] p-4 rounded-xl flex-col`}
          >
            <View style={tw`flex-row items-center justify-between flex-1 gap-3 mb-1`}>
              <View style={tw``}>
                <Text style={tw`text-base text-[#333]`}>
                  Tài khoản nhận
                </Text>
              </View>
              <View style={tw``}>
                <Text style={tw`font-500 text-base text-[#333]`}>
                  8801066383
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center justify-between flex-1 gap-3`}>
              <View style={tw``}>
                <Text style={tw`text-base text-[#333]`}>
                  Tổng tiền
                </Text>
              </View>
              <View style={tw``}>
                <Text style={tw`font-bold text-lg`}>
                  {NumberUtil.formatNumber(totalPrice)} VND
                </Text>
              </View>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-center flex-1 gap-3`}>
            <View style={tw``}>
              <Image
                source={logoVietQR}
                style={[tw`w-20`, { height: undefined, aspectRatio: 1 }]} // aspectRatio giúp giữ tỉ lệ
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={tw`flex-row items-center justify-center flex-1 gap-3`}>
            <View style={tw`border border-[${COLORS.borderColorGray}] rounded-xl p-1`}>
              <Image
                source={TEST_QR}
                style={[tw`w-55`, { height: undefined, aspectRatio: 1 }]} // aspectRatio giúp giữ tỉ lệ
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={tw`flex-row items-center justify-around flex-1 gap-3 mt-8 px-9`}>
            <Tooltip title={'Tải xuống'}>
              <TouchableRipple
                borderless
                onPress={() => { }}
                style={tw`p-4 bg-[${COLORS.backgroundColorGray}] rounded-full border border-[${COLORS.borderColorGray}]`}
              >
                <LucideIcon icon={'Download'} color="#333" size={26} strokeWidth={1.5} />
              </TouchableRipple>
            </Tooltip>

            <Tooltip title={'Chia sẻ'}>
              <TouchableRipple
                borderless
                onPress={() => { }}
                style={tw`p-4 bg-[${COLORS.backgroundColorGray}] rounded-full border border-[${COLORS.borderColorGray}]`}
              >
                <LucideIcon icon={'Share2'} color="#333" size={26} strokeWidth={1.5} />
              </TouchableRipple>
            </Tooltip>
          </View>
        </ScrollView>
      </View>


      <Divider style={tw`my-2`} />

      <View style={tw`flex-row items-center justify-between py-2 px-1 gap-1`}>
        <View style={tw`flex-1`}>
          <Button
            style={tw`p-1 w-full`}
            mode="contained"
            onPress={() => {
              showLoading();
              setTimeout(() => {
                onConfirmXacNhan("ok");
                hideLoading();
              }, 1000); // 1000 ms = 1s
            }}
          >
            <Text style={tw`uppercase text-white`}>Xác nhận thanh toán</Text>
          </Button>
        </View>

      </View>

    </View>
  );
};



export default ThanhToanQR;
