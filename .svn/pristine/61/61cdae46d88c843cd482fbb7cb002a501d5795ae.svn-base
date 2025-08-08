import {
  Dimensions,
  ScrollView,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import React from "react";
import tw from "twrnc";

// Types & Interfaces
interface TableHeader {
  label: string;
  value: string;
}

interface TableProps<T> {
  headers: TableHeader[];
  data: T[];
  styles?: {
    container?: ViewStyle;
    headerCell?: ViewStyle;
    headerText?: TextStyle;
    cell?: ViewStyle;
    cellText?: TextStyle;
  };
}

type TableData = Record<string, string | number | null | undefined>;

const isValidData = (data: unknown): data is TableData => {
  return typeof data === "object" && data !== null;
};

const Table = <T extends TableData>({
  headers,
  data,
  styles = {},
}: TableProps<T>) => {
  // Lấy chiều rộng màn hình
  const screenWidth = Dimensions.get("window").width;

  // Tính toán chiều rộng mỗi cột bằng cách chia đều
  const columnWidth = screenWidth / headers.length;

  const renderCell = (
    content: string | number | null | undefined,
    isHeader = false
  ): React.ReactElement => {
    const textStyle = isHeader ? styles.headerText : styles.cellText;

    return (
      <Text
        style={[
          tw`${isHeader ? "font-bold" : ""} text-gray-800`,
          { width: columnWidth - 2 }, // Trừ đi border
          textStyle,
        ]}
        numberOfLines={1}
      >
        {content?.toString() || ""}
      </Text>
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      style={[styles.container, { width: "100%" }]}
    >
      <View style={{ width: screenWidth }}>
        {/* Header Row */}
        <View style={tw`flex-row bg-gray-200`}>
          {headers.map(header => (
            <View
              key={header.value}
              style={[
                tw`p-3 border border-gray-300 justify-center`,
                { width: columnWidth },
                styles.headerCell,
              ]}
            >
              {renderCell(header.label, true)}
            </View>
          ))}
        </View>

        {/* Data Rows */}
        {data.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={tw`flex-row ${
              rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            {headers.map(header => (
              <View
                key={`${rowIndex}-${header.value}`}
                style={[
                  tw`p-3 border border-gray-300 justify-center`,
                  { width: columnWidth },
                  styles.cell,
                ]}
              >
                {renderCell(row[header.value])}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

interface TableWrapperProps<T> extends Omit<TableProps<T>, "data"> {
  data: Array<Record<string, any>>;
}

const TableWrapper = <T extends TableData>({
  headers,
  data,
  ...props
}: TableWrapperProps<T>) => {
  const normalizeData = (rawData: Array<Record<string, any>>): T[] => {
    const template = headers.reduce((acc, header) => {
      acc[header.value] = "";
      return acc;
    }, {} as Record<string, string>);

    return rawData.map(row => {
      const normalizedRow = { ...template };
      Object.keys(row).forEach(key => {
        const header = headers.find(h => h.value === key);
        if (header) {
          normalizedRow[header.value] = row[key];
        }
      });
      return normalizedRow as T;
    });
  };

  const normalizedData = normalizeData(data);

  return (
    <View>
      <Table headers={headers} data={normalizedData} {...props} />
    </View>
  );
};

export default TableWrapper;
