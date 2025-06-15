import "./App.css";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { UserForm } from "./components/UserFrom";
import { CharacterSelector } from "./components/CharacterSelector";
import { RoleHeroList } from "./components/RoleHeroList";

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
        />
        <CharacterSelector
          selectedHeroes={selectedHeroes}
          onHeroClick={handleHeroClick}
        />
        {/*保存ボタン*/}
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
        {/* プレビューカード */}
        {savedProfile && (
          <Box
            mt={8}
            p={6}
            borderRadius="2xl"
            boxShadow="2xl"
            bgGradient="linear(to-br, teal.50, white)"
            maxW="420px"
            mx="auto"
            border="2px solid"
            borderColor="teal.200"
            position="relative"
          >
            <Heading
              size="md"
              color="teal.700"
              mb={2}
              textAlign="center"
              letterSpacing="wide"
            >
              {savedProfile.userName || "名無しさん"}
            </Heading>
            <Box textAlign="center" color="gray.500" fontSize="sm" mb={2}>
              ID: {savedProfile.userId || "-"}
            </Box>
            <Box display="flex" justifyContent="center" gap={2} mb={3}>
              {savedProfile.mainRoles.map((role) => (
                <Box
                  key={role}
                  px={3}
                  py={1}
                  bg={
                    role === "Tank"
                      ? "blue.200"
                      : role === "Damage"
                      ? "red.200"
                      : "green.200"
                  }
                  color="white"
                  borderRadius="full"
                  fontWeight="bold"
                  fontSize="sm"
                  letterSpacing="wider"
                >
                  {role === "Tank" && "タンク"}
                  {role === "Damage" && "ダメージ"}
                  {role === "Support" && "サポート"}
                </Box>
              ))}
            </Box>
            <Box display="flex" justifyContent="center" gap={2} mb={3}>
              {savedProfile.platforms.map((pf) => (
                <Box
                  key={pf}
                  px={2}
                  py={1}
                  bg="gray.200"
                  color="teal.700"
                  borderRadius="md"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {pf}
                </Box>
              ))}
            </Box>
            <Box
              bg="gray.100"
              borderRadius="md"
              p={3}
              fontSize="sm"
              color="gray.700"
              minH="48px"
              mb={3}
            >
              {savedProfile.comment || "コメントはありません"}
            </Box>
            <RoleHeroList selectedHeroes={savedProfile.selectedHeroes} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
