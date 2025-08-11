import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import BaseDialog from '../components/dialog-base/BaseDialog';
import { Portal } from 'react-native-paper';

interface BaseDialogItem {
  id: number;
  title: string;
  content?: ReactNode;
}

interface BaseDialogContextType {
  showBaseDialog: (title: string, content?: ReactNode) => number;
  closeBaseDialog: (id: number) => void;
  closeAllBaseDialogs: () => void;
}

const BaseDialogContext = createContext<BaseDialogContextType | undefined>(undefined);

export const BaseDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [baseDialogs, setBaseDialogs] = useState<BaseDialogItem[]>([]);

  const showBaseDialog = useCallback((title: string, content?: ReactNode): number => {
    const id = Date.now();
    setBaseDialogs(prev => [...prev, { id, title, content }]);
    return id;
  }, []);

  const closeBaseDialog = useCallback((id: number) => {
    setBaseDialogs(prev => prev.filter(Basedialog => Basedialog.id !== id));
  }, []);

  const closeAllBaseDialogs = useCallback(() => {
    setBaseDialogs([]);
  }, []);

  return (
    <BaseDialogContext.Provider value={{ showBaseDialog, closeBaseDialog, closeAllBaseDialogs }}>
      {children}
      <Portal>
        {baseDialogs.map(({ id, title, content }) => (
          <BaseDialog
            key={id}
            visible={true}
            titleDialog={title}
            onDismiss={() => closeBaseDialog(id)}
          >
            {content}
          </BaseDialog>
        ))}
      </Portal>
    </BaseDialogContext.Provider>
  );
};

export const useBaseDialog = (): BaseDialogContextType => {
  const context = useContext(BaseDialogContext);
  if (!context) {
    throw new Error('useBaseDialog must be used within a BaseDialogProvider');
  }
  return context;
};
