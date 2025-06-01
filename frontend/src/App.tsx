import "./App.css";
import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { owList } from "./components/data/owlist";

export function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        オーバーウォッチ キャラクター一覧
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={6}>
        {owList.map((hero) => (
          <Box
            key={hero.name}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            textAlign="center"
          >
            <Image
              src={hero.image} // 画像のパス
              alt={hero.name} // 画像のalt属性
              borderRadius="full" // 画像を丸く表示
              boxSize="80px" // 画像のサイズを指定
              mx="auto" // 中央揃え
              mb={2}
            />
            <Text fontWeight="bold">{hero.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {hero.role}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}
