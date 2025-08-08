import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Portal, Dialog } from 'react-native-paper';
import tw from "twrnc";

interface BaseDialogProps {
  visible: boolean;
  onDismiss: () => void;
  dialogStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  visible,
  onDismiss,
  dialogStyle,
  children,
}) => {
  return (
    <Portal>
      <Dialog style={[tw`w-1/2 mx-auto bg-white rounded-xl`, dialogStyle]} visible={visible} onDismiss={onDismiss}>
        {children}
      </Dialog>
    </Portal>
  );
};

export default BaseDialog;
