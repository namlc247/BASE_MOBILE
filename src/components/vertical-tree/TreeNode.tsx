import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import tw from "twrnc";
import CalendarUtils from "../../utils/calendarUtils";
import { CircleUserRound, Clock, MapPin } from "lucide-react-native";

// style mặc định
const SPACE_NODE_VERTICAL = 20;
const SPACE_NODE_HORIZONTAL = 5;
const LINE_WIDTH = 1.5;
const LINE_COLOR = "#ccc";
const BORDER_RADIUS = 5;
const NODE_WIDTH = 120;

// Định nghĩa kiểu dữ liệu cho node
export interface TreeNodeData {
  id: string;
  title: string;
  parent?: { id: string };
  time?: string;
  name?: string;
  department?: string;
  imageUrl?: string;
  imageSource?: any;
  styleNode?: string;
  expanded?: boolean;
  children?: TreeNodeData[];
}

// Props của TreeNode
interface TreeNodeProps {
  node: TreeNodeData;
  isClickable?: boolean;
  nodeWidth?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  isClickable,
  nodeWidth = NODE_WIDTH
}) => {
  const styles = StyleSheet.create({
    container: { alignItems: "center" },

    node: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      padding: 10,
      backgroundColor: "#fff",
      borderRadius: BORDER_RADIUS,
      width: nodeWidth,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      borderWidth: LINE_WIDTH,
      borderColor: LINE_COLOR,
    },

    text: { color: "#333", fontWeight: "bold" },


    success: {
      backgroundColor: "#ecfbf4",
      borderColor: "#17cb73",
    },

    successText: {
      color: "#17cb73",
    },

    disabled: {
      backgroundColor: "#f2f2f2",
    },

    disabledText: {
      color: "#888",
    },

    info: {
      backgroundColor: "#eef9ff",
      borderColor: "#1fb0ff",
    },

    infoText: {
      color: "#1fb0ff",
    },

    danger: {
      backgroundColor: "#feeff0",
      borderColor: "#f43f46",
    },

    dangerText: {
      color: "#f43f46",
    },

    childrenContainer: {
      flexDirection: "row",
      marginTop: 2 * SPACE_NODE_VERTICAL,
      position: "relative",
    },

    paddingNodeX: {
      paddingHorizontal: SPACE_NODE_HORIZONTAL
    },

    childWrapper: { alignItems: "center", marginHorizontal: 0 },

    lineVertical: {
      width: LINE_WIDTH,
      height: SPACE_NODE_VERTICAL,
      backgroundColor: LINE_COLOR,
      position: "absolute",
      top: -SPACE_NODE_VERTICAL,
      left: "50%",
    },

    bottomLineVertical: {
      width: LINE_WIDTH,
      height: SPACE_NODE_VERTICAL,
      backgroundColor: LINE_COLOR,
      position: "absolute",
      top: -2 * SPACE_NODE_VERTICAL,
      left: "50%",
    },

    boxBefore: {
      width: "50%",
      height: SPACE_NODE_VERTICAL,
      position: "absolute",
      top: -SPACE_NODE_VERTICAL,
      left: 0,
      borderTopWidth: LINE_WIDTH,
      borderTopColor: LINE_COLOR
    },

    boxBeforeLast: {
      borderRightWidth: LINE_WIDTH,
      borderRightColor: LINE_COLOR,
      borderTopRightRadius: BORDER_RADIUS
    },

    boxAfter: {
      width: "50%",
      height: SPACE_NODE_VERTICAL,
      position: "absolute",
      top: -SPACE_NODE_VERTICAL,
      left: "50%",
      borderTopWidth: LINE_WIDTH,
      borderTopColor: LINE_COLOR,
      borderLeftWidth: LINE_WIDTH,
      borderLeftColor: LINE_COLOR
    },

    boxAfterFirst: {
      borderTopLeftRadius: BORDER_RADIUS
    },
  });

  const [expanded, setExpanded] = useState<boolean>(node.expanded ?? true);

  return (
    <View >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => isClickable ? setExpanded(!expanded) : null}
          style={[
            tw`gap-2`,
            styles.node,
            node.styleNode === "success" && styles.success,
            node.styleNode === "disabled" && styles.disabled,
            node.styleNode === "info" && styles.info,
            node.styleNode === "danger" && styles.danger
          ]}>

          {node.imageSource ? (
            <View style={[tw`mt-1`]}>
              <Image
                source={node.imageSource}
                style={tw`w-8.8 h-8.8 rounded-full border-2 border-[#bad2f7]`}
              />
            </View>
          ) : (
            <View style={[tw`mt-1`]}>
              <View
                style={tw`w-8.8 h-8.8 bg-[#fff] rounded-full border-2 border-[#bad2f7]`}
              >
              </View>
            </View>
          )}

          <View style={[tw`flex-1 flex-col gap-1`]}>
            <Text style={[
              styles.text,
              node.styleNode === "success" && styles.successText,
              node.styleNode === "disabled" && styles.disabledText,
              node.styleNode === "info" && styles.infoText,
              node.styleNode === "danger" && styles.dangerText
            ]}>
              {node.title}
            </Text>
            <View style={[tw`flex-row gap-1 items-center`]}>
              <Clock size={16} color="#888" />
              <Text style={[
                tw`text-xs font-medium`,
                styles.disabledText
              ]}>
                {CalendarUtils.customFormatDate(node.time)}
              </Text>
            </View>

            <View style={[tw`flex-row gap-1 items-center`]}>
              <CircleUserRound size={16} color="#888" />
              <Text style={[
                tw`text-xs font-medium`,
                styles.disabledText
              ]}>
                {node.name}
              </Text>
            </View>

            <View style={[tw`flex-row gap-1 items-center`]}>
              <MapPin size={16} color="#888" />
              <Text style={[
                tw`text-xs font-medium`,
                styles.disabledText
              ]}>
                {node.department}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {expanded && node.children && node.children.length > 0 && (
          <View style={styles.childrenContainer}>
            <View style={styles.bottomLineVertical} />
            {node.children.map((child, index) => (
              <View key={child.id} style={styles.childWrapper}>

                {node.children && index !== 0 &&
                  <View style={[styles.boxBefore, index === node.children.length - 1 && styles.boxBeforeLast]} />
                }

                {node.children && index !== node.children.length - 1 &&
                  <View style={[styles.boxAfter, index === 0 && styles.boxAfterFirst]} />
                }

                {node.children && node.children.length == 1 &&
                  <View style={styles.lineVertical} />
                }

                <View style={styles.paddingNodeX}>
                  <TreeNode
                    node={child}
                    isClickable={isClickable}
                    nodeWidth={nodeWidth}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

    </View >
  );
};

export default TreeNode;
