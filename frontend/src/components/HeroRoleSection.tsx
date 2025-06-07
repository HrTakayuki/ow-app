import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { HeroImage } from "./HeroImage";

/**
 * ロールごとのセクション
 */
type Hero = { name: string; image: string };
type Props = {
  title: string;
  heroes: Hero[];
  selectedHeroes: string[];
  onHeroClick: (name: string) => void;
};

export const HeroRoleSection = ({
  title,
  heroes,
  selectedHeroes,
  onHeroClick,
}: Props) => (
  <Box mt={5} p={3} border="1px solid #ccc" borderRadius="md">
    <Heading size="md" mb={2}>
      {title}
    </Heading>
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
