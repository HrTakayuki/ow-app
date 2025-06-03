import "./App.css";
import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { owList } from "./data/owlist";
import { useState } from "react";

export function App() {
  //選択中のキャラ名の配列を状態として管理
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  //キャラをクリックした時の処理
  const herosSelect = (heroName: string) => {
    // 既に選択されている場合は選択を解除
    setSelectedHeroes(
      (prev) =>
        prev.includes(heroName)
          ? prev.filter((n) => n !== heroName) // 既に選択→解除
          : [...prev, heroName] // 未選択→追加
    );
  };
  return (
    // オーバーウォッチのキャラクター一覧を表示するコンポーネント
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
            borderColor={
              selectedHeroes.includes(hero.name) ? "blue.400" : "gray.200"
            }
            onClick={() => herosSelect(hero.name)} // キャラをクリックした時の処理
          >
            <Image
              src={hero.image} // 画像のパス
              alt={hero.name} // 画像のalt属性
              borderRadius="full" // 画像を丸く表示
              boxSize="80px" // 画像のサイズを指定
              mx="auto" // 中央揃え
              mb={1}
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
