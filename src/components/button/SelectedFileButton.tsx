import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import tw from 'twrnc';
import { Tooltip } from 'react-native-paper';
import { DocumentPickerAsset } from 'expo-document-picker';
import { X } from 'lucide-react-native';

interface SelectedFileButtonProps {
  file: DocumentPickerAsset;
  setFile?: React.Dispatch<React.SetStateAction<DocumentPickerAsset | null>>;
  setFiles?: React.Dispatch<React.SetStateAction<DocumentPickerAsset[]>>;
  index?: number;
  style?: string;
}

export default function SelectedFileButton({
  file,
  setFile,
  setFiles,
  index,
  style = ''
}: SelectedFileButtonProps) {
  const handleRemove = () => {
    if (setFile) {
      setFile(null);
    } else if (setFiles !== undefined && index !== undefined) {
      setFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Tooltip title={file?.name}>
      <TouchableOpacity
        style={[
          tw`flex-row items-center bg-gray-200 rounded-full px-3 py-1`,
          tw`${style}`
        ]}
        onPress={handleRemove}
      >
        <Text style={tw`text-sm mr-2`} numberOfLines={1}>
          {file.name}
        </Text>
        <View style={tw`p-1`}>
          <X size={16} color="#f44336" />
        </View>
      </TouchableOpacity>
    </Tooltip>
  );
}
