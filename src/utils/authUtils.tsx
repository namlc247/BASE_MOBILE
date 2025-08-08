import md5 from "react-native-md5";

export const md5EndCode = (str: string) => {
  return md5.hex_md5(str);
};
