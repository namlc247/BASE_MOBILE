import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import TreeNode, { TreeNodeData } from "./TreeNode";


interface VerticalTreeProps {
  treeData: TreeNodeData[];
  isClickableNode?: boolean;
  NODE_WIDTH?: number;
  listImage?: { [key: string]: any };
}

const VerticalTree: React.FC<VerticalTreeProps> = ({ treeData, isClickableNode, listImage, NODE_WIDTH }) => {
  const [updatedTreeData, setUpdatedTreeData] = useState<TreeNodeData[]>(treeData);

  const updateImageSources = (nodes: TreeNodeData[]): TreeNodeData[] => {
    if (listImage) {
      return nodes.map(node => ({
        ...node,
        imageSource: node.imageUrl ? listImage[node.imageUrl] : null,
        children: node.children ? updateImageSources(node.children) : undefined,
      }));
    } else {
      return nodes;
    }
  };

  useEffect(() => {
    if (treeData?.length > 0) {
      setUpdatedTreeData(updateImageSources(treeData));
    }
  }, [listImage, treeData]);

  return (
    <View style={styles.container}>
      {updatedTreeData.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          isClickable={isClickableNode}
          nodeWidth={NODE_WIDTH}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
    gap: 20,
  },
});

export default VerticalTree;
