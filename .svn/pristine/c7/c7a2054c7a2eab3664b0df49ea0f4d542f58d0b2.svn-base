import React from 'react';
import {
  NodeRowProps,
  TreeView,
  type TreeNode,
  type TreeViewRef
} from 'react-native-tree-multi-select';

import { TouchableOpacity } from 'react-native';
import tw from "twrnc";
import NodeMultiSelect from './customNode/NodeMultiSelect';
import MyTreeUtils from '../../utils/treeUtils';

interface DepartmentTreeMultiSelectProps {
  treeData: any[];
  searchText?: string;
  idsToExpand?: string[];
  preselectedIds?: string[];
  onSelectionChange?: (data: { deptIdData: any[], deptNameData: any[], personIdData: any[], personNameData: any[] }) => void;
  codeBuildTreeStart: string;
}

// 1. Tách các callback functions ra khỏi component chính
const treeViewCallbacks = {
  expandAll: (ref: TreeViewRef) => ref.expandAll?.(),
  collapseAll: (ref: TreeViewRef) => ref.collapseAll?.(),
  expandNodes: (ref: TreeViewRef, ids: string[]) => ref.expandNodes?.(ids),
  collapseNodes: (ref: TreeViewRef, ids: string[]) => ref.collapseNodes?.(ids),
  selectAll: (ref: TreeViewRef) => ref.selectAll?.(),
  unselectAll: (ref: TreeViewRef) => ref.unselectAll?.(),
  selectAllFiltered: (ref: TreeViewRef) => ref.selectAllFiltered?.(),
  unselectAllFiltered: (ref: TreeViewRef) => ref.unselectAllFiltered?.(),
};

const MemoizedDepartmentTreeMultiSelect = React.memo(TreeView);

export function DepartmentTreeMultiSelect({
  treeData = [],
  searchText = '',
  idsToExpand = [],
  preselectedIds = [],
  onSelectionChange,
  codeBuildTreeStart,
}: DepartmentTreeMultiSelectProps) {
  const treeViewRef = React.useRef<TreeViewRef | null>(null);

  // 2. Memoize data transformation
  const transformedTreeData = React.useMemo(() => {
    // return typeBuildTree === 'department'
    //   ? buildFileTree(treeData, codeBuildTreeStart)
    //   : buildFileTreeNhomTraoDoi(treeData, codeBuildTreeStart);

    return MyTreeUtils.buildFileTree(treeData, codeBuildTreeStart);
  }, [treeData, codeBuildTreeStart]);

  // 3. Tối ưu useEffect với debounce cho search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      treeViewRef.current?.setSearchText(searchText, ["name"]);
    }, 300); // debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  // 4. Tối ưu handleSelectionChange
  const handleSelectionChange = React.useCallback(
    (checkedIds: string[], indeterminateIds: string[]) => {
      const combinedIds = [...new Set([...checkedIds])];
      const filteredData = MyTreeUtils.filterTreeItemByIds(treeData, combinedIds);
      onSelectionChange?.(filteredData);
    },
    [treeData, onSelectionChange]
  );

  // 5. Memoize NodeMultiSelect component
  const CustomNodeRow = React.useCallback((props: NodeRowProps) => (
    <NodeMultiSelect {...props} />
  ), []);

  // Thêm useEffect để xử lý idsToExpand
  React.useEffect(() => {
    if (idsToExpand.length > 0 && treeViewRef.current) {
      treeViewCallbacks.expandNodes(treeViewRef.current, idsToExpand);
    }
  }, [idsToExpand]);

  return (
    <MemoizedDepartmentTreeMultiSelect
      ref={treeViewRef}
      data={transformedTreeData}
      onCheck={handleSelectionChange}
      onExpand={React.useCallback((expandedIds: string[]) => {

      }, [])}
      preselectedIds={preselectedIds}
      CustomNodeRowComponent={CustomNodeRow}

    // ExpandCollapseTouchableComponent={
    //   ({ children, ...props }) => (
    //     <TouchableOpacity {...props} style={tw`items-center rounded-full w-9.5 h-9.5 bg-gray-100 border border-gray-200 py-2 px-3`}>
    //       {children}
    //     </TouchableOpacity>
    //   )
    // }
    // selectionPropagation={{
    //   toChildren: true,
    // }}
    // checkBoxViewStyleProps={{
    //   textProps: {
    //     style: {
    //       fontSize: 14,
    //     },
    //   },
    //   checkboxParentViewStyle: {
    //     height: 42,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //   },
    //   textTouchableStyle: {
    //     height: 42,
    //     marginVertical: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //   },
    // }}
    />
  );
}
