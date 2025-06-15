import "./App.css";
import {
  Button,
  Text,
  Box,
  Input,
  Textarea,
  CheckboxGroup,
  HStack,
  Checkbox,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/react";

import { owList } from "./data/owlist";
import { useState } from "react";
import { HeroRoleSection } from "./components/HeroRoleSection";

export function App() {
  // ユーザー情報の状態
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [mainRoles, setMainRoles] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  //選択中のキャラ名の配列を状態として管理
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

  // 保存内容のプレビュー表示用state
  const [savedProfile, setSavedProfile] = useState<{
    userName: string;
    userId: string;
    mainRoles: string[];
    platforms: string[];
    comment: string;
    selectedHeroes: string[];
  } | null>(null);
  console.log("savedProfile", savedProfile);

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
    { title: "タンク", heroes: owList.filter((hero) => hero.role === "Tank") },
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
    <Box bg="gray.100" minH="100vh" py={3}>
      <Box
        bg="white"
        maxW="600px"
        mx="auto"
        p={{ base: 4, md: 8 }}
        borderRadius="xl"
        boxShadow="lg"
      >
        <Heading size="lg" mb={6} color="teal.600" textAlign="center">
          OWネームカード作成
        </Heading>

        {/* ユーザー情報入力フォーム */}
        <Box>
          <Text fontWeight="bold" mb={1} color="teal.700">
            なまえ
          </Text>
          <Input
            placeholder="名前（20文字以内）"
            value={userName}
            onChange={(e) => {
              if (e.target.value.length > 20) {
                alert("名前は20文字以内で入力してください");
                return;
              }
              setUserName(e.target.value);
            }}
            bg="gray.50"
            mb={4}
          />
          <Text fontWeight="bold" mb={1} color="teal.700">
            ID
          </Text>
          <Input
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            bg="gray.50"
            mb={4}
          />
          <Box mb={4}>
            <Text fontWeight="bold" mb={1} color="teal.700">
              よく使うロール
            </Text>
            <CheckboxGroup
              value={mainRoles}
              onChange={(values) => setMainRoles(values as string[])}
            >
              <HStack spacing={4}>
                <Checkbox value="Tank">タンク</Checkbox>
                <Checkbox value="Damage">ダメージ</Checkbox>
                <Checkbox value="Support">サポート</Checkbox>
              </HStack>
            </CheckboxGroup>
            <Wrap mt={2}>
              {mainRoles.map((role) => (
                <WrapItem key={role}>
                  <Tag colorScheme="teal" borderRadius="full">
                    <TagLabel>
                      {role === "Tank" && "タンク"}
                      {role === "Damage" && "ダメージ"}
                      {role === "Support" && "サポート"}
                    </TagLabel>
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold" mb={1} color="teal.700">
              プラットフォーム
            </Text>
            <CheckboxGroup
              value={platforms}
              onChange={(values) => setPlatforms(values as string[])}
            >
              <HStack spacing={4}>
                <Checkbox value="PC">PC</Checkbox>
                <Checkbox value="PlayStation">PlayStation</Checkbox>
                <Checkbox value="Xbox">Xbox</Checkbox>
                <Checkbox value="Switch">Switch</Checkbox>
              </HStack>
            </CheckboxGroup>
            <Wrap mt={2}>
              {platforms.map((pf) => (
                <WrapItem key={pf}>
                  <Tag colorScheme="blue" borderRadius="full">
                    <TagLabel>{pf}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>

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
              onHeroClick={handleHeroClick}
            />
          ))}
          <Text fontWeight="bold" mb={1} color="teal.700">
            コメント
          </Text>
          <Textarea
            placeholder="みんなに一言！"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            bg="gray.50"
            mt={1}
            mb={3}
          />
          <Button
            colorScheme="teal"
            mt={2}
            onClick={() => {
              setSavedProfile({
                userName,
                userId,
                mainRoles,
                platforms,
                comment,
                selectedHeroes,
              });
            }}
            w="full"
          >
            入力内容を保存
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
