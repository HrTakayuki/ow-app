import { Box, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type LabelTextProps = {
  label: string; // ラベル名
  children: ReactNode; // 表示するテキスト
  mb?: number | string; // マージンボトムの値（デフォルトは1）
  fontSize?: string; // フォントサイズ
  color?: string; // テキストカラー
  valueBg?: string; // 追加: 値部分の背景色
  valueColor?: string; // 追加: 値部分の文字色
};

/**
 * LabelText.tsx
 * 概要: ラベルとテキストを組み合わせたコンポーネント
 * 特徴: ラベルは太字、テキストは通常のフォントで表示
 * 使用方法: labelプロパティにラベル名、childrenに表示するテキストを渡す
 */
export const LabelText = ({
  label,
  children,
  mb = 3,
  fontSize = "md",
  color = "blue.200",
  valueBg = "blue.800", // ← デフォルトをblue.800に
  valueColor = "blue.100",
}: LabelTextProps) => (
  <Box mb={mb}>
    <Text
      fontSize="sm"
      color={color}
      fontWeight="bold"
      letterSpacing="wide"
      mb={1}
    >
      {label}
    </Text>
    <Box
      bg={valueBg}
      color={valueColor}
      fontWeight="bold"
      fontSize={fontSize}
      borderRadius="md"
      px={3}
      py={2}
      minH="32px"
      display="flex"
      alignItems="center" // ← これを追加
    >
      {children}
    </Box>
  </Box>
);
