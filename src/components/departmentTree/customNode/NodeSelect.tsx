import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { CheckboxValueType, NodeRowProps, TreeNode } from "react-native-tree-multi-select";
import { FontAwesome } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import tw from "twrnc";
import angle_downIcon from "../../../accsets/icon/angle_down.png";
import angle_rightIcon from "../../../accsets/icon/angle_right.png";
import IconButton from "../../button/IconButton";

const NodeSelect = React.memo(_NodeSelect);
export default NodeSelect;

const VerticalLine = () => (
  <View style={styles.verticalLineStyle} />
);

const Levels = ({
  levels
}: {
  levels: number;
}) => {
  return (
    <View style={tw`flex-row ml-1`}>
      {
        Array(levels).fill(null).map((_, i) => <VerticalLine key={i} />)
      }
    </View>
  );
};

interface Props extends NodeRowProps {
  treeViewRef: React.MutableRefObject<any>;
}

function _NodeSelect(props: Props) {
  const {
    node,
    level,
    checkedValue,
    isExpanded,
    onCheck,
    onExpand,
    treeViewRef
  } = props;

  const iconColor = isExpanded ? "black" : "#a1a1a1";

  function customCheckboxValueTypeToRNPaperType(
    customCheckboxValueType: CheckboxValueType
  ): 'checked' | 'unchecked' {
    if (customCheckboxValueType === 'indeterminate') {
      return 'unchecked';
    }
    return customCheckboxValueType ? 'checked' : 'unchecked';
  }

  function _onCheck() {
    treeViewRef.current?.unselectAll?.();
    onCheck();
  }

  return (
    <View style={tw`my-0.5 flex flex-row items-center justify-between`}>
      <View style={tw`flex-1 flex-row`}>
        <Levels levels={level} />

        {
          node.children?.length ? (
            <IconButton
              tooltip={isExpanded ? "Đóng" : "Mở"}
              source={isExpanded ? angle_downIcon : angle_rightIcon}
              onPress={onExpand}
              imageStyle="w-4 h-4"
            />
          ) : (
            <View style={tw`w-[36px] h-auto`} />
          )
        }

        {/* <RadioButton
          value={node.id}
          status={customCheckboxValueTypeToRNPaperType(checkedValue)}
          onPress={_onCheck}
          color={"#4059AD"}
        /> */}

        <TouchableOpacity
          style={tw`flex-1 p-2 ${customCheckboxValueTypeToRNPaperType(checkedValue) === 'checked' ? 'bg-[#e7effc]' : ''} rounded-md`}
          onPress={node.children?.length ? onExpand : _onCheck} >
          <View style={
            level === 0
              ? styles.textViewMarginNegative
              : styles.textView
          }>
            <Text style={tw`font-medium`}>{node.name}</Text>
            {/* {!node.children?.length && (
              <Text style={tw`ml-2 italic ${node.status == 'Chưa báo cáo' ? 'text-red-500' : 'text-blue-500'} `}>{node.status}</Text>
            )} */}
          </View>
        </TouchableOpacity>

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  verticalLineStyle: {
    height: '110%',
    marginStart: 25,
    // borderLeftWidth: 1,
    // borderColor: "lightgrey",
  },
  textView: {
    flexDirection: "row"
  },
  textViewMarginNegative: {
    flexDirection: "row",
    marginStart: -5
  },
});
