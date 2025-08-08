import React from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import FileUtils from '../../utils/fileUtils';
import CalendarUtils from '../../utils/calendarUtils';

const NotificationItemComponent = ({ notification, listImageNewsFeed, clickThongBao }: any) => {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={[
        tw`flex-row items-center p-2 border-b border-gray-300 hover:bg-[#7A96D2FF]/10`,
        tw`${notification.view_status === 1 && !notification.isViewed ? 'bg-[#f3ead8]' : ''}`
      ]}
      onPress={() => clickThongBao(notification)}
    >
      <View style={tw`w-full items-center flex-row gap-x-2 py-1`}>
        <View style={tw``}>
          <Image
            source={
              notification.image_userCreated
                ? listImageNewsFeed[notification.image_userCreated]
                : require('../../accsets/avatarDefault.jpg')
            }
            style={tw`w-9.5 h-9.5 rounded-full border-2 border-[#bad2f7] `}
          />
        </View>

        <View style={tw`flex-row gap-x-2 flex-1 `}>
          <View style={tw`flex-col flex-1 justify-center`}>
            <Text style={tw`font-medium text-[#5478c4]`}>
              {notification.vaiTro == 3 ? 'TT' : 'Đ/c'} {notification.user_createdST} đã {notification.action}:
            </Text>

            {notification.tieu_de && (
              <Text
                style={tw`font-medium text-gray-800`}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {notification.tieu_de}
              </Text>
            )}

            {notification.noi_dung && (
              <View style={tw``}>
                {FileUtils.containsHtml(notification?.noi_dung || '') ? (
                  <></>
                  // <RenderHtml
                  //   contentWidth={width}
                  //   source={{ html: notification?.noi_dung || '' }}
                  //   tagsStyles={FileUtils.renderHtmlStyle}
                  // />
                ) : (
                  <Text style={tw`text-gray-600`} numberOfLines={1}
                    ellipsizeMode="tail">{notification?.noi_dung}</Text>
                )}
              </View>
            )}

          </View>

          <View style={tw`flex-col items-end ml-2`}>
            <Text style={tw`text-xs text-gray-500`}>
              {CalendarUtils.formatDateToDDMMYYYY(notification.time_created)}
            </Text>
            <Text style={tw`text-xs text-gray-500 pb-1`}>
              {CalendarUtils.formatScheduleTimeToHHmm(notification.time_created)}
            </Text>
            {notification.view_status === 1 && !notification.isViewed && (
              <View style={tw`w-2 h-2 mt-1 rounded-full bg-blue-500`} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const NotificationItem = React.memo(NotificationItemComponent); 
