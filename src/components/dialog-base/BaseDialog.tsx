import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StatusBar, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Portal, Dialog } from 'react-native-paper';
import tw from "twrnc";
import { LucideIcon } from '../LucideIcon';
import COLORS from '../../constants/colors';

interface BaseDialogProps {
  visible: boolean;
  onDismiss: () => void;
  dialogStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  titleDialog?: string;
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  visible,
  onDismiss,
  dialogStyle,
  children,
  titleDialog = ""
}) => {
  return (
    <Portal>

      <Dialog
        style={[tw`w-full h-full mx-auto bg-white rounded-none bg-[${COLORS.primary}]`, dialogStyle]}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Content style={[
          tw`p-0 m-0 flex-col flex-1`,
        ]}>
          <View
            style={[
              tw`pt-4 pb-4 px-4`,
              { zIndex: 0 }
            ]}
          >
            {/* <LinearGradient
              colors={['#005f37', '#007946', '#009456', '#00af67', '#00cc77']}
              start={{ x: 0, y: 0 }} // to left bottom
              end={{ x: 0, y: 1 }}
              style={[
                tw`p-4 rounded-b-3xl`,
                { zIndex: 0 }
              ]}
            > */}
            <View style={tw`flex-row items-center gap-4`}>
              <TouchableOpacity
                style={tw`flex-row items-center p-2`}
                onPress={onDismiss}
              >
                <LucideIcon icon="ArrowLeft" color="#fff" size={26} strokeWidth={1.5} />
              </TouchableOpacity>

              <Text style={tw`text-lg font-bold text-[#fff] `}>
                {titleDialog}
              </Text>
            </View>
            {/* </LinearGradient> */}
          </View>

          <View style={tw`flex-1 bg-white rounded-t-3xl p-4`}>
            {children}
          </View>
        </Dialog.Content>

      </Dialog>
    </Portal>
  );
};

export default BaseDialog;
