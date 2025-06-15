import { Text } from "@chakra-ui/react";
import { HeroRoleSection } from "./HeroRoleSection";
import { owList } from "../data/owlist";

type Props = {
  selectedHeroes: string[];
  onHeroClick: (name: string) => void;
};

/**
 *  CharacterSelector.tsx
 *  概要: オーバーウォッチのキャラクターをロールごとに選択するセクションコンポーネント
 */

export const CharacterSelector = ({ selectedHeroes, onHeroClick }: Props) => {
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
    <>
      {/* キャラクター選択 */}
      <Text mb={2} fontWeight="bold" color="teal.700">
        よく使うキャラクター
      </Text>
      {roleSections.map((section) => (
        <HeroRoleSection
          key={section.title}
          title={section.title}
          heroes={section.heroes}
          selectedHeroes={selectedHeroes}
          onHeroClick={onHeroClick}
        />
      ))}
    </>
  );
};
