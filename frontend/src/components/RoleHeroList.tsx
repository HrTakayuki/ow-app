import { Box } from "@chakra-ui/react";
import { owList } from "../data/owlist";

type Props = {
  selectedHeroes: string[]; // 選択されたキャラクター名のリスト
  size?: number; // キャラクター画像のサイズ（デフォルトは50px）
  filterRole?: string; // タンク、ダメージ、サポートのいずれかを指定。未指定なら全キャラ
  showAll?: boolean; // 全キャラ表示フラグ
};

/**
 *  RoleHeroList.tsx
 *  概要: 選択されたオーバーウォッチのキャラクターをロールごとに表示するコンポーネント
 *  特徴: タンク、ダメージ、サポートのロールごとにキャラクターを分類し、選択されていない場合は「未選択」と表示
 */

export const RoleHeroList = ({
  selectedHeroes,
  size = 50,
  filterRole,
  showAll = false,
}: Props) => {
  // showAll=trueなら全キャラ、falseなら選択キャラのみ
  const heroes = showAll
    ? owList.filter((hero) => !filterRole || hero.role === filterRole)
    : owList.filter(
        (hero) =>
          selectedHeroes.includes(hero.name) &&
          (!filterRole || hero.role === filterRole)
      );

  if (!showAll && heroes.length === 0) {
    return (
      <Box color="gray.400" fontSize="sm">
        未選択
      </Box>
    );
  }

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {heroes.map((hero) => {
        const isSelected = selectedHeroes.includes(hero.name);
        return (
          <img
            key={hero.name}
            src={hero.image}
            alt={hero.name}
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              background: "#fff",
              objectFit: "cover",
              border: "1px solid #ccc", // ← 緑のボーダーをやめて常にグレー
              opacity: isSelected ? 1 : 0.3,
              transition: "opacity 0.2s, border 0.2s",
              pointerEvents: "none", // 選択不可
            }}
          />
        );
      })}
    </Box>
  );
};
