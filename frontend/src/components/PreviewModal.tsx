import React, { useRef } from "react";
import html2canvas from "html2canvas";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Heading,
  Divider,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { RoleHeroList } from "./RoleHeroList";
import { FaShieldAlt, FaCrosshairs, FaPlus } from "react-icons/fa";
import { LabelText } from "./LabelText";

const roleIcons = {
  Tank: <FaShieldAlt color="#63b3ed" size={32} style={{ marginRight: 10 }} />,
  Damage: (
    <FaCrosshairs color="#fc8181" size={32} style={{ marginRight: 10 }} />
  ),
  Support: <FaPlus color="#68d391" size={32} style={{ marginRight: 10 }} />,
};

const roleLabels = {
  Tank: "タンク",
  Damage: "ダメージ",
  Support: "サポート",
};

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  savedProfile: {
    userName: string; // ユーザー名
    userId: string; // ユーザーID
    mainRoles: string[]; // メインロールのリスト
    mode: string[]; // 選択されたモードのリスト
    platforms: string[]; // プラットフォームのリスト
    comment: string; // ユーザーコメント
    selectedHeroes: string[]; // 選択されたキャラクターのリスト
  } | null;
};

/**
 * 画像化・PDF化のためのプレビューは「全体が常に見える」ことが重要です。
 * そのため、モーダルのサイズを固定し、内容がはみ出す場合はスクロールさせます。
 * これにより、どの画面サイズでもプレビューの全体像が崩れません。
 */
export const PreviewModal = ({
  isOpen,
  onClose,
  savedProfile,
}: PreviewModalProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const padding = 32;

    // ラッパー作成
    const wrapper = document.createElement("div");
    wrapper.style.boxSizing = "border-box";
    wrapper.style.display = "block";
    wrapper.style.padding = `${padding}px`;
    wrapper.style.background = "#1a365d";
    wrapper.style.width = rect.width + padding * 2 + "px";
    wrapper.style.height = rect.height + padding * 2 + "px";
    wrapper.style.overflow = "hidden";

    // プレビュー内容を複製してラッパーに追加
    const cloned = previewRef.current.cloneNode(true) as HTMLElement;
    cloned.style.width = "100%";
    cloned.style.height = "100%";
    wrapper.appendChild(cloned);
    document.body.appendChild(wrapper);

    const canvas = await html2canvas(wrapper, {
      backgroundColor: "#1a365d",
      useCORS: true,
      scale: 2,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "ow-profile.png";
    link.click();

    document.body.removeChild(wrapper);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="2xl"
        boxShadow="2xl"
        bgGradient="linear(to-br, blue.900 60%, blue.600 100%)"
        border="4px solid"
        borderColor="blue.400"
        p={0}
        width="1100px"
        maxWidth="1100px"
        minWidth="1100px"
        minHeight="650px"
        height="650px"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <ModalCloseButton color="blue.100" />
        {/* 画像保存ボタン */}
        <Box position="absolute" top={4} right={16} zIndex={10}>
          <button
            onClick={handleSaveImage}
            style={{
              background: "#3182ce",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 8px #0002",
            }}
          >
            画像保存
          </button>
        </Box>
        <ModalBody
          p={8}
          overflow="auto"
          height="100%"
          minH="0"
          display="flex"
          flexDirection="column"
        >
          <div ref={previewRef}>
            {savedProfile && (
              <Box height="100%" display="flex" flexDirection="column">
                {/* 上部：画像＋プロフィールタイトル＋下線 */}
                <Flex align="center" mb={2}>
                  <Box
                    w="40px" // ← 小さく
                    h="40px" // ← 小さく
                    borderRadius="full"
                    bg="white" // ← 白背景
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={3} // ← 間隔も少し狭く
                    boxShadow="md"
                    border="2px solid #fff"
                  >
                    <img
                      src="/images/ow-logo.png"
                      alt="OW"
                      style={{ width: 28, height: 28 }} // ← 画像も小さく
                    />
                  </Box>
                  <Heading
                    size="sm" // ← さらに小さく
                    color="blue.100"
                    letterSpacing="wider"
                    textShadow="0 2px 8px #0008"
                  >
                    OWプロフィール
                  </Heading>
                </Flex>
                <Divider my={2} borderColor="blue.400" borderWidth={1} />

                {/* 下部：左下に入力情報、右下にキャラクター */}
                <Flex flex="1" minH={0} gap={8}>
                  {/* 左下：入力情報（枠色・背景色を控えめに、はみ出し防止にoverflowも追加） */}
                  <Box
                    minW={0}
                    flex="0.8"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    bg="blue.900" // より暗め
                    borderRadius="xl"
                    p={5}
                    boxShadow="md"
                    border="1.5px solid"
                    borderColor="blue.800" // 枠色をさらに控えめに
                    mb={3}
                  >
                    <LabelText
                      label="なまえ"
                      fontSize="sm" // ← 小さく
                      color="blue.200"
                      valueBg="whiteAlpha.200"
                      valueColor="blue.100"
                    >
                      {savedProfile.userName || "名無しさん"}
                    </LabelText>
                    <LabelText
                      label="ID"
                      fontSize="sm"
                      color="blue.200"
                      valueBg="whiteAlpha.200"
                      valueColor="blue.100"
                    >
                      {savedProfile.userId || "-"}
                    </LabelText>
                    <LabelText
                      label="ロール"
                      fontSize="sm"
                      color="blue.200"
                      valueBg="transparent"
                      valueColor="blue.100"
                    >
                      {savedProfile.mainRoles.length > 0 ? (
                        <HStack spacing={2}>
                          {savedProfile.mainRoles.map((r) => (
                            <Box
                              key={r}
                              px={2}
                              py={1}
                              borderRadius="md"
                              bg="blue.500" // タグ色をblue.500
                              color="white"
                              fontSize="sm"
                              fontWeight="bold"
                              whiteSpace="nowrap"
                            >
                              {roleLabels[r as keyof typeof roleLabels] || r}
                            </Box>
                          ))}
                        </HStack>
                      ) : (
                        "未選択"
                      )}
                    </LabelText>
                    <LabelText
                      label="モード"
                      fontSize="sm"
                      color="blue.200"
                      valueBg="transparent"
                      valueColor="blue.100"
                    >
                      {savedProfile.mode && savedProfile.mode.length > 0 ? (
                        <HStack spacing={2}>
                          {savedProfile.mode.map((m) => (
                            <Box
                              key={m}
                              px={2}
                              py={1}
                              borderRadius="md"
                              bg="blue.500" // タグ色をblue.500
                              color="white"
                              fontSize="sm"
                              fontWeight="bold"
                              whiteSpace="nowrap"
                            >
                              {m}
                            </Box>
                          ))}
                        </HStack>
                      ) : (
                        "未選択"
                      )}
                    </LabelText>
                    <LabelText
                      label="プラットフォーム"
                      fontSize="sm"
                      color="blue.200"
                      valueBg="transparent"
                      valueColor="blue.100"
                    >
                      {savedProfile.platforms &&
                      savedProfile.platforms.length > 0 ? (
                        <HStack spacing={2}>
                          {savedProfile.platforms.map((p) => (
                            <Box
                              key={p}
                              px={2}
                              py={1}
                              borderRadius="md"
                              bg="blue.500" // タグ色をblue.500
                              color="white"
                              fontSize="sm"
                              fontWeight="bold"
                              whiteSpace="nowrap"
                            >
                              {p}
                            </Box>
                          ))}
                        </HStack>
                      ) : (
                        "未選択"
                      )}
                    </LabelText>
                    <LabelText
                      label="コメント"
                      fontSize="sm"
                      color="blue.200"
                      valueBg="whiteAlpha.200"
                      valueColor="blue.100"
                    >
                      {savedProfile.comment || "コメントはありません"}
                    </LabelText>
                  </Box>
                  {/* 右下：キャラクター（枠色・背景色を落ち着いた色に） */}
                  <Box
                    minW={0}
                    flex="1.6"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    bg="blue.800" // 明るさを左と合わせて落ち着かせる
                    borderRadius="xl"
                    p={5}
                    boxShadow="md"
                    border="1.5px solid"
                    borderColor="blue.700" // 枠色を落ち着いた色に
                    mb={3}
                    overflow="hidden"
                  >
                    {["Tank", "Damage", "Support"].map((role, idx, arr) => (
                      <React.Fragment key={role}>
                        <Flex align="center" mb={3}>
                          {roleIcons[role as keyof typeof roleIcons]}
                          <Box
                            fontWeight="bold"
                            fontSize="lg"
                            mr={3}
                            minW="80px"
                            color="blue.100"
                            letterSpacing="wider"
                          >
                            {roleLabels[role as keyof typeof roleLabels]}
                          </Box>
                          <Box flex="1" minW={0}>
                            <RoleHeroList
                              selectedHeroes={savedProfile.selectedHeroes}
                              size={53}
                              filterRole={role}
                              showAll={true}
                            />
                          </Box>
                        </Flex>
                        {idx < arr.length - 1 && (
                          <Divider
                            my={2}
                            borderColor="blue.400"
                            borderWidth={1.5}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Flex>
              </Box>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
