import { Box } from "@chakra-ui/react";
import { owList } from "../data/owlist";

type Props = {
  selectedHeroes: string[];
};

/**
 *  RoleHeroList.tsx
 *  概要: 選択されたオーバーウォッチのキャラクターをロールごとに表示するコンポーネント
 *  特徴: タンク、ダメージ、サポートのロールごとにキャラクターを分類し、選択されていない場合は「未選択」と表示
 */

export const RoleHeroList = ({ selectedHeroes }: Props) => {
  const roles = [
    { key: "Tank", label: "タンク", color: "blue.100" },
    { key: "Damage", label: "ダメージ", color: "red.100" },
    { key: "Support", label: "サポート", color: "green.100" },
  ];

  // どのロールも選択されていない場合
  const isNone = roles.every(
    (role) =>
      selectedHeroes.filter((hero) => {
        const heroData = owList.find((item) => item.name === hero);
        return heroData && heroData.role === role.key;
      }).length === 0
  );

  return (
    <Box>
      <Box fontWeight="bold" color="teal.700" mb={1}>
        選択キャラクター
      </Box>
      {roles.map((role) => {
        const roleHeroes = selectedHeroes.filter((hero) => {
          const heroData = owList.find((item) => item.name === hero);
          return heroData && heroData.role === role.key;
        });
        if (roleHeroes.length === 0) return null;
        return (
          <Box
            key={role.key}
            mb={2}
            p={2}
            borderRadius="md"
            bg={role.color}
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box fontWeight="bold" mr={2} minW="70px" color="teal.700">
              {role.label}
            </Box>
            {roleHeroes.map((hero) => {
              const heroData = owList.find((item) => item.name === hero);
              return (
                <Box key={hero} display="flex" px={1} py={1}>
                  <img
                    src={heroData?.image}
                    alt={hero}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      background: "#fff",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        );
      })}
      {isNone && (
        <Box color="gray.400" fontSize="sm">
          未選択
        </Box>
      )}
    </Box>
  );
};
