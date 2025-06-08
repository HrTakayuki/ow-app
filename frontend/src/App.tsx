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
  Divider,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  Heading,
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
    <Box bg="gray.100" minH="100vh" py={8}>
      <Box
        bg="white"
        maxW="500px"
        mx="auto"
        p={{ base: 4, md: 8 }}
        borderRadius="xl"
        boxShadow="lg"
      >
        <Heading size="lg" mb={6} color="teal.600" textAlign="center">
          OWネームカード作成
        </Heading>
        <Stack spacing={5}>
          {/* ユーザー情報入力フォーム */}
          <Box>
            <Text fontWeight="bold" mb={2} color="teal.700">
              ユーザー情報
            </Text>
            <Stack spacing={3}>
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
              />
              <Input
                placeholder="ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                bg="gray.50"
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
              <Textarea
                placeholder="コメント"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                bg="gray.50"
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
            </Stack>
          </Box>

          {/* 入力内容のプレビュー表示 */}
          {savedProfile && (
            <Box
              p={4}
              border="1px solid #ccc"
              borderRadius="md"
              bg="gray.50"
              mt={2}
            >
              <Text fontWeight="bold" mb={2} color="teal.700">
                入力内容の確認
              </Text>
              <Divider mb={2} />
              <Text>名前: {savedProfile.userName}</Text>
              <Text>ID: {savedProfile.userId}</Text>
              <Text>
                よく使うロール:{" "}
                {savedProfile.mainRoles.length > 0
                  ? savedProfile.mainRoles.join(", ")
                  : "未選択"}
              </Text>
              <Text>
                プラットフォーム:{" "}
                {savedProfile.platforms.length > 0
                  ? savedProfile.platforms.join(", ")
                  : "未選択"}
              </Text>
              <Text>コメント: {savedProfile.comment}</Text>
            </Box>
          )}

          <Divider my={4} />

          {/* キャラクター選択ボタン */}
          <Button colorScheme="teal" onClick={onOpen} w="full">
            キャラクター選択を開く
          </Button>
        </Stack>
      </Box>

      {/* キャラクター選択Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
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
      <Text mt={8} fontWeight="bold" textAlign="center" color="teal.700">
        選択中: {selectedHeroes.join(", ") || "なし"}
      </Text>
    </Box>
  );
}
