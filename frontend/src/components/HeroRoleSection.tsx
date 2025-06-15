import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { HeroImage } from "./HeroImage";

type Hero = { name: string; image: string };
type Props = {
  title: string;
  heroes: Hero[];
  selectedHeroes: string[];
  onHeroClick: (name: string) => void;
};

/**
 *  HeroRoleSection.tsx
 *  概要: オーバーウォッチのキャラクターをロールごとに表示するセクションコンポーネント
 */
export const HeroRoleSection = ({
  title,
  heroes,
  selectedHeroes,
  onHeroClick,
}: Props) => (
  <Box
    mt={0}
    mb={4}
    p={3}
    border="1px solid rgb(235, 235, 235)"
    borderRadius="md"
  >
    <Text fontWeight="bold" color="gray.600" mb={1}>
      {title}
    </Text>
    <SimpleGrid templateColumns="repeat(auto-fill, minmax(50px, 1fr))" gap={1}>
      {heroes.map((hero) => (
        <HeroImage
          key={hero.name}
          hero={hero}
          selected={selectedHeroes.includes(hero.name)}
          onClick={onHeroClick}
        />
      ))}
    </SimpleGrid>
  </Box>
);
