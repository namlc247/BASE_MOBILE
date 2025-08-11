import * as LucideIcons from "lucide-react-native";
import React from "react";
import Layout from "../components/Layout";
import tw from "twrnc";
import COLORS from "../constants/colors";

type Props = {
  icon: keyof typeof LucideIcons; // Tên icon
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const LucideIcon: React.FC<Props> = ({
  icon,
  size = 24,
  color = COLORS.textInactive,
  strokeWidth = 2,
}) => {
  const IconLucide = LucideIcons[icon] as React.ComponentType<any>;

  if (!IconLucide) {
    console.warn(`Icon ${icon} not found in lucide-react-native`);
    return null;
  }

  return <IconLucide size={size} color={color} strokeWidth={strokeWidth} />;
};
