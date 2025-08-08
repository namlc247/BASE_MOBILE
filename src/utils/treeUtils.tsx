import { TreeNode } from "react-native-tree-multi-select";

class MyTreeUtils {
  static filterTreeItemByIds(treeData: any[], listId: string[]): { deptIdData: any[], deptNameData: any[], personIdData: any[], personNameData: any[] } {
    const idSet = new Set(listId);
    const deptIdData: any[] = [];
    const deptNameData: any[] = [];
    const personIdData: any[] = [];
    const personNameData: any[] = [];

    treeData.forEach(item => {
      if (idSet.has(item.id.toString())) {
        if (item.typeNote === 1) {
          deptIdData.push(item.id.toString());
          deptNameData.push(item.text || item.fullName);
        } else if (item.typeNote === 2) {
          personIdData.push(item.id.toString());
          personNameData.push(item.text || item.fullName);
        }
      }
    });

    return { deptIdData, deptNameData, personIdData, personNameData };
  }

  static buildFileTree(obj: any[], level: string): TreeNode[] {
    return obj
      .filter((o) =>
        o.code.startsWith(level + ".") &&
        (o.code.match(/\./g) || []).length === (level.match(/\./g) || []).length + 1
      )
      .map((o) => {
        let node: TreeNode = {
          id: o.id.toString(),
          name: o.text || o.fullName,
          code: o.code,
          typeNote: o.typeNote,
          chucVuST: o.chucVuST,
        };

        const children = obj.filter((so) => so.code.startsWith(o.code + "."));
        if (children.length > 0) {
          node.children = this.buildFileTree(children, o.code);
        }
        return node;
      });
  }

  static buildFileTreeBCGB(obj: any[], level: string): TreeNode[] {
    return obj
      .filter((o) =>
        o.codeBuildTree.startsWith(level + ".") &&
        (o.codeBuildTree.match(/\./g) || []).length === (level.match(/\./g) || []).length + 1
      )
      .map((o) => {
        let node: TreeNode = {
          id: o.departmentCode,
          name: o.departmentName,
          codeBuildTree: o.codeBuildTree,
          status: o.status,
          isMaster: o.isMaster,
        };

        const children = obj.filter((so) => so.codeBuildTree.startsWith(o.codeBuildTree + "."));
        if (children.length > 0) {
          node.children = this.buildFileTreeBCGB(children, o.codeBuildTree);
        }
        return node;
      });
  }

  static buildFileTreeComment(obj: any[], level: string): any[] {
    return obj
      .filter((o) =>
        o.code.startsWith(level + ".") &&
        (o.code.match(/\./g) || []).length === (level.match(/\./g) || []).length + 1
      )
      .map((o) => {
        let node: TreeNode = {
          id: o.id.toString(),
          name: o.text,
          text: o.text,
          code: o.code,
          time: o.time,
          level: o.level,
          department: o.department,
          numberOfChild: o.numberOfChild,
          file_name: o.file_name,
          user: o.user,
          parent_id: o.parent_id,
          image: o.image,
          chucVuST: o.chucVuST,
          quanHamST: o.quanHamST,
          fileUrl: o.fileUrl,
          comment_userDepartment: o.comment_userDepartment,
          showReplies: o.showReplies,
        };

        const children = obj.filter((so) => so.code.startsWith(o.code + "."));
        if (children.length > 0) {
          node.children = this.buildFileTreeComment(children, o.code);
        }
        return node;
      });
  }

  static buildFileTreeInChat(obj: any[], level: string): TreeNode[] {
    return obj
      .filter((o) =>
        o.code.startsWith(level + ".") &&
        (o.code.match(/\./g) || []).length === (level.match(/\./g) || []).length + 1
      )
      .map((o) => {
        let node: TreeNode = {
          id: o.id.toString(),
          name: o.text || o.fullName,
          item: o.text,
          code: o.code,
          typeNote: o.typeNote,
          chucVuST: o.chucVuST,
        };

        const children = obj.filter((so) => so.code.startsWith(level + "."));
        if (children && children.length > 0) {
          node.children = this.buildFileTreeInChat(children, o.code);
        }
        return node;
      });
  }
}

export default MyTreeUtils;
