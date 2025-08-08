import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogConfirm } from '../components/dialog-confirm/DialogConfirm';

type DialogOptions = {
  title: string;
  content: string;
  textBtnOk?: string;
  textBtnCancel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type DialogContextType = {
  showDialog: (options: DialogOptions) => void;
  hideDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<DialogOptions>({
    title: '',
    content: '',
    textBtnOk: 'Đồng ý',
    textBtnCancel: 'Hủy bỏ',
  });

  const showDialog = (newOptions: DialogOptions) => {
    setOptions(newOptions);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <DialogConfirm
        visible={visible}
        onDismiss={hideDialog}
        title={options.title}
        content={options.content}
        textBtnOk={options.textBtnOk || 'Đồng ý'}
        textBtnCancel={options.textBtnCancel || 'Hủy'}
        onConfirm={() => {
          options.onConfirm?.();
          hideDialog();
        }}
        onCancel={() => {
          options.onCancel?.();
          hideDialog();
        }}
      />
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogConfirmProvider');
  }
  return context;
}; 
