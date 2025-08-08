import React from 'react';
import {
  NodeRowProps,
  TreeView,
  type TreeNode,
  type TreeViewRef
} from 'react-native-tree-multi-select';

import { TouchableOpacity, View } from 'react-native';
import tw from "twrnc";
import NodeSelect from './customNode/NodeSelect';
import MyTreeUtils from '../../utils/treeUtils';

interface DepartmentTreeBCGBProps {
  treeData: any[];
  searchText?: string;
  idsToExpand?: string[];
  preselectedIds?: string[];
  selectedItems?: (checkedIds: any[]) => void;
  codeBuildTreeStart?: string;
  selectedId?: string;
}

export function DepartmentTreeBCGB({ treeData = [], searchText = '', idsToExpand = [], preselectedIds = [], selectedItems, codeBuildTreeStart = '0.1', selectedId = '' }: DepartmentTreeBCGBProps) {
  const treeViewRef = React.useRef<TreeViewRef | null>(null);
  const [checkedIds, setCheckedIds] = React.useState([]);
  React.useEffect(() => {
    triggerSearch(searchText)
  }, [searchText]);

  React.useEffect(() => {
    expandNodes(idsToExpand)
  }, [idsToExpand]);

  React.useEffect(() => {
    treeViewRef.current?.unselectAll?.();
    treeViewRef.current?.selectNodes?.([selectedId]);
  }, [selectedId]);

  // It's recommended to use debounce for the search function (refer to the example app)
  function triggerSearch(text: string) {
    // Pass search text to the tree along with the keys on which search is to be done(optional)
    treeViewRef.current?.setSearchText(text, ["name"]);
  }

  // Callback functions for check and expand state changes:
  const handleSelectionChange = React.useCallback(
    (checkedIds: string[], indeterminateIds: string[]) => {
      selectedItems?.(checkedIds);
    },
    [treeData, selectedItems]
  );

  const handleExpanded = (expandedIds: string[]) => {
    // NOTE: Do something with updated expandedIds here
  };

  // Expand collapse calls using ref
  const expandAllPress = () => treeViewRef.current?.expandAll?.();
  const collapseAllPress = () => treeViewRef.current?.collapseAll?.();
  const expandNodes = (idsToExpand: string[]) => treeViewRef.current?.expandNodes?.(
    idsToExpand
  );
  const collapseNodes = (idsToCollapse: string[]) => treeViewRef.current?.collapseNodes?.(
    idsToCollapse
  );

  // Multi-selection function calls using ref
  const onSelectAllPress = () => treeViewRef.current?.selectAll?.();
  const onUnselectAllPress = () => treeViewRef.current?.unselectAll?.();
  const onSelectAllFilteredPress = () => treeViewRef.current?.selectAllFiltered?.();
  const onUnselectAllFilteredPress = () => treeViewRef.current?.unselectAllFiltered?.();
  const selectNodes = (idsToExpand: string[]) => treeViewRef.current?.selectNodes?.(['']);
  const unselectNodes = (idsToCollapse: string[]) => treeViewRef.current?.unselectNodes?.(
    ['']
  );

  return (
    // ... Remember to keep a fixed height for the parent. Read Flash List docs to know why
    <TreeView
      ref={treeViewRef}
      data={MyTreeUtils.buildFileTreeBCGB(treeData, codeBuildTreeStart)}
      onCheck={handleSelectionChange}
      onExpand={handleExpanded}
      preselectedIds={preselectedIds}
      selectionPropagation={{
        toChildren: false,
      }}
      CustomNodeRowComponent={(props: NodeRowProps) => (
        <NodeSelect
          treeViewRef={treeViewRef}
          {...props} />
      )}
      treeFlashListProps={{
        extraData: checkedIds
      }}
    />
  );
}
