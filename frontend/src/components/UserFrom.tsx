/**
 *  UserForm.tsx
 *  概要: ユーザー情報を入力するフォームコンポーネント
 */
import {
  Box,
  Text,
  Input,
  CheckboxGroup,
  HStack,
  Checkbox,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  Textarea,
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
}: Props) => (
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
  </Box>
);
