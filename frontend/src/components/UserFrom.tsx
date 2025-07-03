import {
  Box,
  Input,
  CheckboxGroup,
  HStack,
  Checkbox,
  Textarea,
  Stack,
  Heading,
} from "@chakra-ui/react";

type Props = {
  userName: string;
  setUserName: (v: string) => void;
  userId: string;
  setUserId: (v: string) => void;
  mainRoles: string[];
  setMainRoles: (v: string[]) => void;
  platforms: string[];
  setPlatforms: (v: string[]) => void;
  comment: string;
  setComment: (v: string) => void;
  mode: string[];
  setMode: (v: string[]) => void;
};

/**
 *  UserForm.tsx
 *  概要: ユーザー情報を入力するフォームコンポーネント
 *  特徴: 名前、ID、ロール、プラットフォーム、コメントを入力可能
 *  使用方法: 各入力フィールドの値と変更ハンドラを受け取り、フォームを表示
 */

const commonCheckboxProps = {
  color: "blue.900",
  fontWeight: "bold",
  fontSize: "lg",
  bg: "blue.50", // ← 名前やIDと同じ明るめの青系に
  _hover: { bg: "blue.100" }, // ホバー時も少しだけ明るく
  px: 2,
  borderRadius: "md",
};

export const UserForm = ({
  userName,
  setUserName,
  userId,
  setUserId,
  mainRoles,
  setMainRoles,
  platforms,
  setPlatforms,
  comment,
  setComment,
  mode,
  setMode,
}: Props) => (
  <Stack spacing={7}>
    <Box>
      <Heading as="h2" size="sm" color="blue.100" letterSpacing="wide" mb={2}>
        なまえ
      </Heading>
      <Input
        placeholder="名前（15文字以内）"
        value={userName}
        onChange={(e) => {
          if (e.target.value.length > 15) {
            alert("名前は15文字以内で入力してください");
            return;
          }
          setUserName(e.target.value);
        }}
        maxLength={15}
        bg="blue.50"
        color="blue.900"
        borderColor="blue.400"
        _placeholder={{ color: "blue.400" }}
        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #4299e1" }}
      />
    </Box>
    <Box>
      <Heading as="h2" size="sm" color="blue.100" letterSpacing="wide" mb={2}>
        ID
      </Heading>
      <Input
        placeholder="ID（15文字以内）"
        value={userId}
        onChange={(e) => {
          if (e.target.value.length > 15) {
            alert("IDは15文字以内で入力してください");
            return;
          }
          setUserId(e.target.value);
        }}
        maxLength={15}
        bg="blue.50"
        color="blue.900"
        borderColor="blue.400"
        _placeholder={{ color: "blue.400" }}
        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #4299e1" }}
      />
    </Box>
    <Box>
      <Heading as="h2" size="sm" color="blue.100" letterSpacing="wide" mb={2}>
        よく使うロール
      </Heading>
      <CheckboxGroup
        value={mainRoles}
        onChange={(values) => setMainRoles(values as string[])}
      >
        <HStack spacing={6}>
          <Checkbox value="Tank" colorScheme="blue" {...commonCheckboxProps}>
            タンク
          </Checkbox>
          <Checkbox value="Damage" colorScheme="blue" {...commonCheckboxProps}>
            ダメージ
          </Checkbox>
          <Checkbox value="Support" colorScheme="blue" {...commonCheckboxProps}>
            サポート
          </Checkbox>
        </HStack>
      </CheckboxGroup>
    </Box>
    <Box>
      <Heading as="h2" size="sm" color="blue.100" letterSpacing="wide" mb={2}>
        モード
      </Heading>
      <CheckboxGroup
        value={mode}
        onChange={(values) => setMode(values as string[])}
      >
        <HStack spacing={6}>
          <Checkbox value="ランク" colorScheme="green" {...commonCheckboxProps}>
            ランク
          </Checkbox>
          <Checkbox
            value="クイック"
            colorScheme="green"
            {...commonCheckboxProps}
          >
            クイック
          </Checkbox>
          <Checkbox
            value="スタジアム"
            colorScheme="green"
            {...commonCheckboxProps}
          >
            スタジアム
          </Checkbox>
        </HStack>
      </CheckboxGroup>
    </Box>
    <Box>
      <Heading as="h2" size="sm" color="blue.100" letterSpacing="wide" mb={2}>
        プラットフォーム
      </Heading>
      <CheckboxGroup
        value={platforms}
        onChange={(values) => setPlatforms(values as string[])}
      >
        <HStack spacing={6}>
          <Checkbox value="PC" colorScheme="red" {...commonCheckboxProps}>
            PC
          </Checkbox>
          <Checkbox
            value="PlayStation"
            colorScheme="red"
            {...commonCheckboxProps}
          >
            PlayStation
          </Checkbox>
          <Checkbox value="Xbox" colorScheme="red" {...commonCheckboxProps}>
            Xbox
          </Checkbox>
          <Checkbox value="Switch" colorScheme="red" {...commonCheckboxProps}>
            Switch
          </Checkbox>
        </HStack>
      </CheckboxGroup>
    </Box>
    <Box>
      <Heading as="h2" size="sm" color="blue.100" letterSpacing="wide" mb={2}>
        コメント
      </Heading>
      <Textarea
        placeholder="みんなに一言！（15文字以内）"
        value={comment}
        onChange={(e) => {
          if (e.target.value.length > 15) {
            alert("コメントは15文字以内で入力してください");
            return;
          }
          setComment(e.target.value);
        }}
        maxLength={15}
        bg="blue.50"
        color="blue.900"
        borderColor="blue.400"
        _placeholder={{ color: "blue.400" }}
        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #4299e1" }}
      />
    </Box>
  </Stack>
);
