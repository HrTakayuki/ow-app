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
      <Text
        mb={2}
        fontWeight="bold"
        color="blue.100"
        fontSize="md"
        letterSpacing="wide"
      >
        よく使うキャラクター
      </Text>
      {roleSections.map((section) => (
        <HeroRoleSection
          key={section.title}
          title={section.title}
          heroes={section.heroes}
          selectedHeroes={selectedHeroes}
          onHeroClick={onHeroClick}
          // HeroRoleSection側でも色味を blue.800 や blue.400 などで統一推奨
        />
      ))}
    </>
  );
};
