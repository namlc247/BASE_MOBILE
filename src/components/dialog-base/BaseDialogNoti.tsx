import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Portal, Dialog } from 'react-native-paper';
import tw from "twrnc";

interface BaseDialogNotiProps {
  visible: boolean;
  onDismiss: () => void;
  dialogStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const BaseDialogNoti: React.FC<BaseDialogNotiProps> = ({
  visible,
  onDismiss,
  dialogStyle,
  children,
}) => {
  return (
    <Portal>
      <Dialog style={[tw`mx-auto bg-white rounded-xl`, dialogStyle]} visible={visible} onDismiss={onDismiss}>

        <Dialog.Content>
          {children}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default BaseDialogNoti;
