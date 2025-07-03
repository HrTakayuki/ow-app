import "./App.css";
import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { UserForm } from "./components/UserFrom";
import { CharacterSelector } from "./components/CharacterSelector";
import { PreviewModal } from "./components/PreviewModal";

export function App() {
  // ユーザー情報の状態
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [mainRoles, setMainRoles] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);
  const [savedProfile, setSavedProfile] = useState<{
    userName: string;
    userId: string;
    mainRoles: string[];
    mode: string[];
    platforms: string[];
    comment: string;
    selectedHeroes: string[];
  } | null>(null);
  const [mode, setMode] = useState<string[]>([]);

  // モーダル制御
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * クリックイベント処理
   * */
  // キャラクターをクリックしたときの処理
  const handleHeroClick = (heroName: string) => {
    // 既に選択されている場合は選択を解除
    setSelectedHeroes(
      (prev) =>
        prev.includes(heroName)
          ? prev.filter((n) => n !== heroName) // 既に選択→解除
          : [...prev, heroName] // 未選択→追加
    );
  };

  // 保存ボタン押下時にプレビューを開く
  const handleSave = () => {
    setSavedProfile({
      userName,
      userId,
      mainRoles,
      mode,
      platforms,
      comment,
      selectedHeroes,
    });
    onOpen(); // 保存時にモーダルを開く
  };

  return (
    <Box
      bgGradient="linear(to-br, blue.800 60%, blue.400 100%)" // ← 明るめグラデ
      minH="100vh"
      py={3}
    >
      <Box
        bg="blue.700" // ← 明るめの青
        maxW="600px"
        mx="auto"
        p={{ base: 4, md: 8 }}
        borderRadius="2xl"
        boxShadow="2xl"
        border="4px solid"
        borderColor="blue.300" // ← 明るめの枠
      >
        <Heading size="lg" mb={6} color="blue.50" textAlign="center">
          OWネームカード作成
        </Heading>
        {/* ユーザー情報入力フォーム */}
        <UserForm
          userName={userName}
          setUserName={setUserName}
          userId={userId}
          setUserId={setUserId}
          mainRoles={mainRoles}
          setMainRoles={setMainRoles}
          platforms={platforms}
          setPlatforms={setPlatforms}
          comment={comment}
          setComment={setComment}
          mode={mode}
          setMode={setMode}
        />
        <Box h={8} />
        <CharacterSelector
          selectedHeroes={selectedHeroes}
          onHeroClick={handleHeroClick}
        />
        {/* プレビューモーダル */}
        <PreviewModal
          isOpen={isOpen}
          onClose={onClose}
          savedProfile={savedProfile}
        />
      </Box>
      {/* 画面下部に固定の保存ボタン（ボタンのみ・両肩余白なし） */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        w="100%"
        bg="rgba(44,82,180,0.97)" // ← 明るめの青系半透明
        boxShadow="0 -2px 8px rgba(0,0,0,0.10)"
        py={3}
        zIndex={100}
        display="flex"
        justifyContent="center"
      >
        <Button
          colorScheme="blue"
          w="100%"
          maxW="600px"
          onClick={handleSave}
          borderRadius="md"
          fontWeight="bold"
          fontSize="lg"
          color="white"
          bg="blue.400"
          _hover={{ bg: "blue.300" }}
        >
          入力内容を保存してプレビュー
        </Button>
      </Box>
    </Box>
  );
}
