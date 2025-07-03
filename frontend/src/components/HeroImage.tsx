import { Box, Image } from "@chakra-ui/react";

type Props = {
  hero: { name: string; image: string };
  selected: boolean;
  onClick: (name: string) => void;
};

/**
 * HeroImage.tsx
 * 概要: オーバーウォッチのキャラクター画像を表示するコンポーネント
 *  特徴: 画像を丸く表示し、選択されている場合は枠線の色を変更
 *  使用方法: キャラクターの画像と選択状態を受け取り、クリック時にキャラクター名を返す
 */
export const HeroImage = ({ hero, selected, onClick }: Props) => (
  <Box overflow="hidden" p={0} mb={1}>
    <Image
      src={hero.image}
      alt={hero.name}
      borderRadius="full"
      border={selected ? "3px solid" : "2px solid"}
      cursor="pointer"
      onClick={() => onClick(hero.name)}
      borderColor={selected ? "orange.300" : "gray.300"} // 選択時:オレンジ系、未選択時:グレー系でコントラストUP
      boxSize="50px"
      mx="auto"
      bg="blue.50"
      transition="border-color 0.2s"
      boxShadow="none"
    />
  </Box>
);
