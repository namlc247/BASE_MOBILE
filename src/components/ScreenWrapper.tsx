import React, { ReactNode, useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import BaseDialogNoti from './dialog-base/BaseDialogNoti';
import { Button, Text } from 'react-native-paper';
import ColorUtil from '../utils/colorUtil';
import COLORS from '../constants/colors';
import { LucideIcon } from './LucideIcon';
import { NavigationContainerRef } from '@react-navigation/native';
import { useBaseDialog } from '../contexts/BaseDialogContext';
import HocPhi from './screenComponent/tienich/HocPhi';


type ScreenWrapperProps = {
  navigationRef: React.RefObject<NavigationContainerRef<any>>;
  children: ReactNode;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ navigationRef, children }) => {
  const { showBaseDialog, closeAllBaseDialogs } = useBaseDialog();
  const [visible, setVisible] = useState(true);

  return (
    <View style={tw`flex-1`}>
      {/* Phần nội dung màn hình */}
      {children}


      <BaseDialogNoti
        visible={visible}
        onDismiss={() => setVisible(false)}
        dialogStyle={tw`w-9/10`}
      >
        <View style={tw``}>
          <View style={tw`flex-row mb-3`}>
            <View style={tw`bg-[${COLORS.backgroundColorGray}] p-3 rounded-full`}>
              <LucideIcon icon="CreditCard" color={COLORS.primary} size={26} strokeWidth={1.5} />
            </View>
          </View>

          <Text style={tw`font-bold text-xl mb-4`} >Thông báo thanh toán</Text>
          <Text style={tw`text-base mb-5`} >Bạn đang có 1 hóa đơn tới hạn thanh toán</Text>

          <View style={tw`flex-row gap-3`}>
            <Button
              style={tw`flex-1 shadow-none border border-[${COLORS.borderColorGray}]`}
              buttonColor={ColorUtil.lightenColor(COLORS.primary, 0.95)}
              mode="contained"
              onPress={() => setVisible(false)}
            >
              <Text style={tw`uppercase`}>Bỏ qua</Text>
            </Button>

            <Button
              style={tw`flex-1`}
              mode="contained"
              onPress={() => {
                // navigationRef.current?.navigate('HocPhi');
                // setVisible(false)
                showBaseDialog(
                  'Học phí',
                  <HocPhi
                    showBaseDialog={showBaseDialog}
                    closeAllBaseDialogs={closeAllBaseDialogs}
                  />
                );
                setVisible(false);
              }}
            >
              <Text style={tw`uppercase text-white`}>Thanh toán</Text>
            </Button>

          </View>
        </View>
      </BaseDialogNoti>


    </View>
  );
}

export default ScreenWrapper;
