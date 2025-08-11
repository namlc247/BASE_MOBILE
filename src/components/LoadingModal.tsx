import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import COLORS from '../constants/colors';

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

export default function LoadingModal({ visible, message = 'Đang tải...' }: LoadingModalProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-5 rounded-lg items-center`}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={tw`mt-2 text-gray-600`}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
} 
