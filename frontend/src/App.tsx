import "./App.css";
import { Text } from "@chakra-ui/react";
import { owList } from "./data/owlist";
import { useState } from "react";
import { HeroRoleSection } from "./components/HeroRoleSection";

export function App() {
  //選択中のキャラ名の配列を状態として管理
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  //キャラをクリックした時の処理
  const handleHeroClick = (heroName: string) => {
    // 既に選択されている場合は選択を解除
    setSelectedHeroes(
      (prev) =>
        prev.includes(heroName)
          ? prev.filter((n) => n !== heroName) // 既に選択→解除
          : [...prev, heroName] // 未選択→追加
    );
  };

  // オーバーウォッチのキャラクターリストをロールごとに分ける
  const roleSections = [
    {
      title: "タンク",
      heroes: owList.filter((hero) => hero.role === "Tank"),
    },
    {
      title: "ダメージ",
      heroes: owList.filter((hero) => hero.role === "Damage"),
    },
    {
      title: "サポート",
      heroes: owList.filter((hero) => hero.role === "Support"),
    },
  ];

  return (
    // オーバーウォッチのキャラクター一覧を表示するコンポーネント
    <div style={{ padding: "20px" }}>
      <Text fontSize="2xl" fontWeight="bold" color="blackAlpha.800" mb={4}>
        キャラクター選択
      </Text>
      {roleSections.map((section) => (
        <HeroRoleSection
          key={section.title}
          title={section.title}
          heroes={section.heroes}
          selectedHeroes={selectedHeroes}
          onHeroClick={handleHeroClick}
        />
      ))}
    </div>
  );
}
