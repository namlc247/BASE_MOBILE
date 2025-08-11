import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogConfirm } from '../components/dialog-confirm/DialogConfirm';

type DialogConfirmOptions = {
  title: string;
  content: string;
  textBtnOk?: string;
  textBtnCancel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type DialogConfirmContextType = {
  showDialogConfirm: (options: DialogConfirmOptions) => void;
  hideDialogConfirm: () => void;
};

const DialogConfirmContext = createContext<DialogConfirmContextType | undefined>(undefined);

export const DialogConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<DialogConfirmOptions>({
    title: '',
    content: '',
    textBtnOk: 'Đồng ý',
    textBtnCancel: 'Hủy bỏ',
  });

  const showDialogConfirm = (newOptions: DialogConfirmOptions) => {
    setOptions(newOptions);
    setVisible(true);
  };

  const hideDialogConfirm = () => {
    setVisible(false);
  };

  return (
    <DialogConfirmContext.Provider value={{ showDialogConfirm, hideDialogConfirm }}>
      {children}
      <DialogConfirm
        visible={visible}
        onDismiss={hideDialogConfirm}
        title={options.title}
        content={options.content}
        textBtnOk={options.textBtnOk || 'Đồng ý'}
        textBtnCancel={options.textBtnCancel || 'Hủy'}
        onConfirm={() => {
          options.onConfirm?.();
          hideDialogConfirm();
        }}
        onCancel={() => {
          options.onCancel?.();
          hideDialogConfirm();
        }}
      />
    </DialogConfirmContext.Provider>
  );
};

export const useDialogConfirm = (): DialogConfirmContextType => {
  const context = useContext(DialogConfirmContext);
  if (!context) {
    throw new Error('useDialogConfirm must be used within a DialogConfirmProvider');
  }
  return context;
}; 
