import React, { useEffect, useRef, useState } from 'react';
import { InteractionManager, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import tw from "twrnc";

interface DialogConfirmProps {
  title: string,
  content: string,
  textBtnOk: string,
  textBtnCancel: string,
  visible: boolean,
  onDismiss: () => void,
  onConfirm?: () => void,
  onCancel?: () => void
}

export function DialogConfirm({
  title = '',
  content = '',
  textBtnOk = '',
  textBtnCancel = '',
  visible,
  onDismiss,
  onConfirm = () => { },
  onCancel = () => { }
}: DialogConfirmProps) {
  return (
    <Portal>
      <Dialog style={tw`w-1/2 mx-auto bg-white`} visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={tw`text-xl font-bold`}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={tw`text-base`}>{content}</Text>
        </Dialog.Content>

        <Dialog.Actions style={tw`gap-5`}>
          <Button style={tw`bg-white`} onPress={() => {
            onConfirm();
            onDismiss();
          }}>
            <Text style={tw`text-[#3f6ad8]`}>{textBtnOk}</Text>
          </Button>
          <Button style={tw`bg-white`} onPress={() => {
            onCancel();
            onDismiss();
          }}>
            <Text style={tw`text-[#f44336]`}>{textBtnCancel}</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
