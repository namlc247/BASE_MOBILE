import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { CheckboxValueType, NodeRowProps, TreeNode } from "react-native-tree-multi-select";
import { FontAwesome } from '@expo/vector-icons';
import { Checkbox, RadioButton } from "react-native-paper";
import tw from "twrnc";
import IconButton from "../../button/IconButton";
import angle_downIcon from "../../../accsets/icon/angle_down.png";
import angle_rightIcon from "../../../accsets/icon/angle_right.png";

const NodeMultiSelect = React.memo(_NodeMultiSelect);
export default NodeMultiSelect;

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
  checkedIds?: string[];
}

function _NodeMultiSelect(props: Props) {
  const {
    node,
    level,
    checkedValue,
    isExpanded,
    onCheck,
    onExpand,
    checkedIds
  } = props;

  function customCheckboxValueTypeToRNPaperType(
    customCheckboxValueType: CheckboxValueType
  ) {
    return customCheckboxValueType === 'indeterminate'
      ? 'indeterminate'
      : customCheckboxValueType
        ? 'checked'
        : 'unchecked';
  }

  function customRadioButtonValueTypeToRNPaperType(
    customRadioButtonValueType: CheckboxValueType
  ): 'checked' | 'unchecked' {
    if (customRadioButtonValueType === 'indeterminate') {
      return 'unchecked';
    }
    return customRadioButtonValueType ? 'checked' : 'unchecked';
  }

  return (
    <View style={tw`my-0.5 flex flex-row items-center justify-between`}>
      <View style={tw`flex-1 flex-row items-center`}>
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

        {
          node.typeNote == 1 ? (
            <Checkbox
              status={customCheckboxValueTypeToRNPaperType(checkedValue)}
              onPress={onCheck}
              color={"#4059AD"}
            />
          ) : (
            <RadioButton
              value={node.id}
              status={customRadioButtonValueTypeToRNPaperType(checkedValue)}
              onPress={onCheck}
              color={"#4059AD"}
            />
          )
        }


        <TouchableOpacity style={tw`flex-1 py-1 h-full rounded-md`} onPress={onCheck}>
          <View style={tw`flex-col`}>
            <Text style={tw`${node.typeNote == 1 ? 'font-medium' : ''}`}>{node.name}</Text>
            {
              node.typeNote == 2 && (
                <View>
                  <Text style={tw`text-xs text-gray-500`}>{node.chucVuST}</Text>
                </View>
              )
            }
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
});
