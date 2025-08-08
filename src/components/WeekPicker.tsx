import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import tw from "twrnc";
import this_week from "../accsets/icon/this_week.png";

import IconRoundedButton from './button/IconRoundedButton';
import CalendarUtils from '../utils/calendarUtils';

interface WeekPickerProps {
  onWeekChange: (week: number) => void;
}

export default function WeekPicker({ onWeekChange }: WeekPickerProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(CalendarUtils.getWeekNumber(new Date()));
  const [isPickerVisible, setPickerVisible] = React.useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const weeks = CalendarUtils.generateWeeks();

  React.useEffect(() => {
    onWeekChange(CalendarUtils.getWeekNumber(new Date()));
  }, []);

  const changeWeek = (week: number) => {
    setSelectedWeek(week);
    onWeekChange(week);
  }

  React.useEffect(() => {
    if (isPickerVisible) {
      setTimeout(() => {
        const selectedIndex = weeks.findIndex(week => week.value === selectedWeek);
        if (selectedIndex !== -1) {
          scrollViewRef.current?.scrollTo({
            y: selectedIndex * 50,
            animated: false
          });
        }
      }, 100);
    }
  }, [isPickerVisible]);

  return (
    <View style={tw`flex-row items-center`}>
      <IconRoundedButton
        source={this_week}
        text="Tuần này"
        onPress={() => changeWeek(CalendarUtils.getWeekNumber(new Date()))}
      />

      <View style={tw`flex-row items-center ml-2`}>
        <TouchableOpacity
          style={tw`p-1 rounded-full border border-gray-300`}
          onPress={() => changeWeek(Math.max(1, selectedWeek - 1))}
        >
          <ChevronLeft size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          style={tw`mx-3 py-2 bg-white min-w-[180px]`}
        >
          <Text style={tw`pb-1 text-black border-b border-gray-400 font-medium text-center`}>
            Tuần {selectedWeek} ({CalendarUtils.getWeekDates(selectedWeek)})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`p-1 rounded-full border border-gray-300`}
          onPress={() => changeWeek(Math.min(52, selectedWeek + 1))}
        >
          <ChevronRight size={20} color="#000" />
        </TouchableOpacity>

        <Modal
          visible={isPickerVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setPickerVisible(false)}
        >
          <TouchableOpacity
            style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
            activeOpacity={1}
            onPress={() => setPickerVisible(false)}
          >
            <View style={tw`bg-white rounded-lg w-96`}>
              <ScrollView
                ref={scrollViewRef}
                style={tw`max-h-120`}
              >
                {weeks.map((week) => (
                  <TouchableOpacity
                    key={week.value}
                    style={tw`p-4 border-b border-gray-200`}
                    onPress={() => {
                      changeWeek(week.value);
                      setPickerVisible(false);
                    }}
                  >
                    <Text style={tw`text-center ${selectedWeek === week.value
                      ? 'text-blue-500 font-bold'
                      : week.value === CalendarUtils.getWeekNumber(new Date())
                        ? 'text-red-500'
                        : 'text-black'
                      }`}>
                      {week.label} ({CalendarUtils.getWeekDates(week.value)})
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}
