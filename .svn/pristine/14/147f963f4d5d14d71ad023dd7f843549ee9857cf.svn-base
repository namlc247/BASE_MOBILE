import React from 'react';
import Toast, { SuccessToast, ErrorToast, BaseToast, ToastShowParams } from 'react-native-toast-message';

// Định nghĩa các style chung
const commonToastStyle = {
  borderRadius: 3,
  borderWidth: 0.5,
  // height: 45,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5  // Cho Android
};

const commonText1Style = {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#333',
  paddingBottom: 2
};

const commonText2Style = {
  fontSize: 14,
  fontWeight: '500' as const,
  color: '#333',
  flexWrap: 'wrap',
  // paddingBottom: 1
};

const commonContentContainerStyle = {
  paddingHorizontal: 10,
};

// Cấu hình màu sắc cho các loại toast
const toastColors = {
  success: '#2fa947',
  error: '#f44336',
  info: '#1e98d7',
  warning: '#f28900'
};

// Component tạo toast tùy chỉnh theo loại
const createToastComponent = (ToastComponent: typeof BaseToast, color: string) => (props: any) => (
  <ToastComponent
    {...props}
    style={{
      ...commonToastStyle,
      borderColor: color,
      borderLeftColor: color,
    }}
    contentContainerStyle={commonContentContainerStyle}
    text1Style={{ ...commonText1Style, color: color }}
    text2Style={commonText2Style}
  />
);

class MyToastUtils {
  static toastConfig = {
    success: createToastComponent(SuccessToast, toastColors.success),
    error: createToastComponent(ErrorToast, toastColors.error),
    info: createToastComponent(BaseToast, toastColors.info),
    warning: createToastComponent(BaseToast, toastColors.warning),
  }

  static show(toastItem: ToastShowParams) {
    requestAnimationFrame(() => {
      Toast.show(toastItem);
    });
  }
}

export default MyToastUtils;
