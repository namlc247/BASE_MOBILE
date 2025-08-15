import React, { useState } from 'react';
import { Image, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Portal, Dialog, Chip, Divider, Button, Checkbox, TouchableRipple } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { LucideIcon } from '../../LucideIcon';
import NumberUtil from '../../../utils/numberUtils';
import BaseDialog from '../../dialog-base/BaseDialog';
import PhuongThucThanhToan from './PhuongThucThanhToan';
import { useBaseDialog } from '../../../contexts/BaseDialogContext';
import XacNhanThanhToan from './XacNhanThanhToan';
import BaseDialogNoti from '../../dialog-base/BaseDialogNoti';
import TEST_QR from "../../../accsets/image/qr_test.jpeg";
import ThanhToanQR from './ThanhToanQR';
import MyToastUtils from '../../../utils/toastConfig';

const chips = [
  { id: 1, label: 'Năm I' },
  { id: 2, label: 'Năm II' },
  { id: 3, label: 'Năm III' },
  { id: 4, label: 'Năm IV' },
  { id: 5, label: 'Năm V' },
];

const data = [
  { id: 1, title: 'Hóa đơn Học kỳ I', priceNumber: 4000000, price: NumberUtil.formatNumber(4000000) + " VND" },
  { id: 2, title: 'Hóa đơn Học kỳ II', priceNumber: 3500000, price: NumberUtil.formatNumber(3500000) + " VND" },
];

interface ChuaThanhToanProps {
  goToTab: (index: number) => void;
  showBaseDialog: (title: string, content: React.ReactNode) => void;
  closeAllBaseDialogs: () => void;
}

const ChuaThanhToan: React.FC<ChuaThanhToanProps> = ({
  goToTab,
  showBaseDialog,
  closeAllBaseDialogs,
}) => {
  const [selectedChips, setSelectedChips] = React.useState<any[]>([]);
  const [visibleQR, setVisibleQR] = useState(false);

  const [checkedHoaDon, setCheckedHoaDon] = React.useState(true);

  const [selectedItemId, setSelectedItemId] = React.useState<any[]>([]);

  React.useEffect(() => {
    setSelectedChips([1]);
  }, []);



  const toggleChip = (id: number) => {
    if (selectedChips.includes(id)) {
      setSelectedChips(selectedChips.filter(chipId => chipId !== id));
    } else {
      setSelectedChips([...selectedChips, id]);
    }
  };

  const toggleSelect = (id: any) => {
    setSelectedItemId((prev) =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const totalPrice = data
    .filter(item => selectedItemId.includes(item.id))
    .reduce((sum, item) => sum + item.priceNumber, 0);

  const selectedHoadon = data
    .filter(item => selectedItemId.includes(item.id));


  const handleShowPhuongThucThanhToan = () => {
    showBaseDialog(
      'Thanh toán',
      <PhuongThucThanhToan
        onSelectPhuongThuc={(phuongthuc: any) => {
          setTimeout(() => {
            handleShowXacNhanThanhToan(phuongthuc);
          }, 150);
          // handleShowXacNhanThanhToan(phuongthuc);
        }}
      />
    );
  }

  const handleShowXacNhanThanhToan = (phuongthuc: any) => {
    showBaseDialog(
      'Xác nhận thanh toán',
      <XacNhanThanhToan
        phuongthuc={phuongthuc}
        data={selectedHoadon}
        onConfirmThanhToan={(item: any) => {
          setTimeout(() => {
            handleShowQR(phuongthuc);
          }, 150);
          // handleShowQR(phuongthuc);
        }}
      />
    );
  }

  const handleShowQR = (phuongthuc: any) => {
    showBaseDialog(
      'Thanh toán với QR',
      <ThanhToanQR
        phuongthuc={phuongthuc}
        data={selectedHoadon}
        onConfirmXacNhan={(item: any) => {
          closeAllBaseDialogs();

          MyToastUtils.show({
            type: 'success',
            text2: `Thanh toán thành công`,
          });
          goToTab(1);
        }}
      />
    );
  }

  return (
    <View style={tw`flex-1 flex-col mt-3`} >
      <View style={tw`flex-1`}>
        <ScrollView
          style={tw`flex-1`}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          persistentScrollbar={true}
        >
          <View style={tw`px-1`}>
            <Text style={tw` font-500 text-[#666]`}>
              Danh sách năm học ({selectedChips.length})
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex-row mt-3 gap-3`}>
              {chips.map(chip => (
                <Chip
                  key={chip.id}
                  selected={selectedChips.includes(chip.id)}
                  onPress={() => toggleChip(chip.id)}
                  selectedColor={COLORS.primary}
                  style={[
                    tw`my-1 py-0.5 bg-[${COLORS.backgroundColorGray}] border border-[${COLORS.borderColorGray}]`,
                    tw`${selectedChips.includes(chip.id) ? `border-[${COLORS.primary}} bg-[${COLORS.backgroundColorInput}]` : ''}`
                  ]}
                >
                  <Text
                    style={[
                      tw`font-normal text-[${COLORS.textInactive}]`,
                      tw`${selectedChips.includes(chip.id) ? `text-[${COLORS.primary}} font-500` : ''}`
                    ]}
                  >
                    {chip.label}
                  </Text>
                </Chip>
              ))}
            </View>
          </ScrollView>

          <View style={tw`px-1 mt-3`}>
            <Text style={tw`font-500 text-[#666]`}>
              Danh sách hóa đơn ({selectedItemId.length})
            </Text>
          </View>


          {data.map((item) => (
            <TouchableRipple
              key={item.id}
              borderless
              onPress={() => toggleSelect(item.id)}
              style={tw`mt-3 bg-[${COLORS.backgroundColorGray}] p-3 rounded-lg flex-row items-center `}
            >
              <View style={tw`flex-row items-center flex-1 gap-3`}>
                {/* Checkbox */}
                <View style={tw`p-1`}>
                  <Checkbox
                    status={selectedItemId.includes(item.id) ? 'checked' : 'unchecked'}
                  />
                </View>

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

      <View style={tw``}>
        {/* <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-base`}>
            Tổng tiền
          </Text>

          <Text style={tw`font-500 text-base`}>
            4.000.000 VND
          </Text>
        </View> */}

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
              disabled={selectedItemId.length === 0}
              onPress={() => {
                setTimeout(() => {
                  handleShowPhuongThucThanhToan();
                }, 150);
                // handleShowPhuongThucThanhToan();
              }}
            >
              <Text style={tw`uppercase text-white`}>Thanh toán</Text>
            </Button>
          </View>

        </View>
      </View>

    </View>
  );
};



export default ChuaThanhToan;
