/**
 * キャラ画像と画像クリック処理
 */
import { Box, Image } from "@chakra-ui/react";

type Props = {
  hero: { name: string; image: string };
  selected: boolean;
  onClick: (name: string) => void;
};

export const HeroImage = ({ hero, selected, onClick }: Props) => (
  <Box
    overflow="hidden" // 枠を超えた部分は見えない
    p={0}
    mb={1}
  >
    <Image
      src={hero.image} // 画像のパス
      alt={hero.name} // 画像のalt属性
      borderRadius="full" // 画像を丸く表示
      border={selected ? "2px solid" : "1px solid"}
      cursor="pointer"
      onClick={() => onClick(hero.name)} // キャラをクリックした時の処理
      borderColor={selected ? "rgb(61, 123, 247)" : "gray.300"}
      boxSize="50px" // 画像のサイズを指定
      mx="auto" // 中央揃え
    />
  </Box>
);
