import React, { useState } from 'react';
import { Image, TouchableOpacity, ImageSourcePropType, Text } from 'react-native';
import tw from 'twrnc';
import FileUtils from '../../utils/fileUtils';
import { Tooltip } from 'react-native-paper';

interface DownloadFileButton {
  fileName: string;
  style?: string;
}

export default function DownloadFileButton({
  fileName,
  style = ''
}: DownloadFileButton) {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <Tooltip title={fileName}>
      <TouchableOpacity
        onPress={async () => {
          setIsDownloading(true);
          await FileUtils.downladFileByName(fileName);
          setIsDownloading(false);
        }}
        disabled={isDownloading}
      >
        <Text
          style={[
            tw`text-[#5478c4] ${isDownloading ? 'opacity-80' : ''}`,
            tw`${style}`
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {isDownloading ? 'Đang tải...' : fileName}
        </Text>
      </TouchableOpacity>
    </Tooltip>
  );
} 
