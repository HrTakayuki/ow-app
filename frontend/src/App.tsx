import "./App.css";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  IconButton,
  Box,
  Stack,
  Input,
  Textarea,
  CheckboxGroup,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
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

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    // オーバーウォッチのキャラクター一覧を表示するコンポーネント
    <div style={{ padding: "20px" }}>
      {/* ユーザー情報入力フォーム */}
      <Box mb={8} maxW="400px">
        <Stack spacing={3}>
          <Input
            placeholder="名前"
            value={userName}
            onChange={(e) => {
              //名前が入力されていなかったらエラー
              if (e.target.value.length > 20) {
                alert("名前は20文字以内で入力してください");
                return;
              }
              //名前が入力されていたら状態を更新
              setUserName(e.target.value);
            }}
          />
          <Input
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Box>
            <Text mb={1}>よく使うロール</Text>
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
          </Box>
          <Box>
            <Text mb={1}>プラットフォーム</Text>
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
          </Box>
          <Textarea
            placeholder="コメント"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
        {/* 保存ボタンを追加 */}
        <Button
          colorScheme="blue"
          mt={4}
          onClick={() => {
            // 入力内容を保存
            setSavedProfile({
              userName,
              userId,
              mainRoles,
              platforms,
              comment,
              selectedHeroes,
            });
          }}
        >
          入力内容を保存
        </Button>
      </Box>

      {/* 入力内容のプレビュー表示 */}
      {savedProfile && (
        <Box
          mb={8}
          p={4}
          border="1px solid #ccc"
          borderRadius="md"
          bg="gray.50"
        >
          <Text fontWeight="bold" mb={2}>
            入力内容の確認
          </Text>
          <Text>名前: {savedProfile.userName}</Text>
          <Text>ID: {savedProfile.userId}</Text>
          <Text>
            よく使うロール: {savedProfile.mainRoles.join(", ") || "未選択"}
          </Text>
          <Text>
            プラットフォーム: {savedProfile.platforms.join(", ") || "未選択"}
          </Text>
          <Text>コメント: {savedProfile.comment}</Text>
          <Text>
            選択キャラ: {savedProfile.selectedHeroes.join(", ") || "未選択"}
          </Text>
        </Box>
      )}

      <Button colorScheme="teal" onClick={onOpen} mb={6}>
        キャラクター選択を開く
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        {/* DrawerOverlay を追加することでバグを修正 */}
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            キャラクター選択
            <IconButton
              aria-label="閉じる"
              size="sm"
              onClick={onClose}
              variant="ghost"
              icon={<CloseIcon />}
            />
          </DrawerHeader>
          <DrawerBody>
            {roleSections.map((section) => (
              <HeroRoleSection
                key={section.title}
                title={section.title}
                heroes={section.heroes}
                selectedHeroes={selectedHeroes}
                onHeroClick={handleHeroClick}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Text mt={6} fontWeight="bold">
        選択中: {selectedHeroes.join(", ") || "なし"}
      </Text>
    </div>
  );
}
