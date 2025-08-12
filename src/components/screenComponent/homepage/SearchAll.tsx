import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Divider, Searchbar, TouchableRipple } from 'react-native-paper';
import tw from "twrnc";
import COLORS from '../../../constants/colors';
import { useBaseDialog } from '../../../contexts/BaseDialogContext';
import { LucideIcon } from '../../LucideIcon';


const otherItems = [
  { id: 7, icon: 'PencilLine', label: 'Cập nhật thông tin tài khoản', type: 'dialog', },
  { id: 8, icon: 'FileUser', label: 'Hồ sơ điện tử', type: '' },
  { id: 9, icon: 'FileSpreadsheet', label: 'Nộp / Theo dõi đơn', type: '' },
];

interface SearchAllProps {
  data: any;
  handleClickItem: (item: any) => void;
}

const SearchAll: React.FC<SearchAllProps> = ({
  data,
  handleClickItem
}) => {
  const [searchText, setSearchText] = React.useState('');

  const dataAll = [...data, ...otherItems];

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return dataAll;
    return dataAll.filter((item: any) =>
      item.label?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  React.useEffect(() => {

  }, []);



  return (
    <View style={tw`flex-1 flex-col gap-3`} >
      <View style={tw``}>
        <Searchbar
          style={tw`border border-[${COLORS.primary}] bg-gray-100`}
          placeholder="Tìm kiếm"
          inputStyle={tw``}
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <View style={tw`flex-1`}>
        <ScrollView
          style={tw`flex-1`}
        >
          {filteredItems.map((item: any, index) => (
            <React.Fragment key={index}>
              <TouchableRipple
                borderless
                onPress={() => {
                  if (item.onPress) {
                    item.onPress();
                  } else {
                    handleClickItem(item);
                  }
                }}
              >
                <View style={tw`flex-row gap-3 items-center px-2 py-3`}>
                  <View style={tw`flex-row gap-3 items-center`}>
                    <LucideIcon icon={item.icon as any} color={COLORS.primary} size={26} strokeWidth={1.5} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-base text-[#444]`}>{item.label}</Text>
                  </View>
                </View>
              </TouchableRipple>

              {/* Divider */}
              {index < filteredItems.length - 1 && <Divider style={tw`m-0`} />}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};



export default SearchAll;
