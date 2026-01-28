import { useState } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { getHint } from "../utils/hintEngine";

export default function HintPanel({ question }) {
  const [hintIndex, setHintIndex] = useState(0);

  if (!question || !question.hints) return null;

  return (
    <VStack align="stretch" spacing={3}>
      <Text fontSize="md" fontWeight="600" color="white">💡 Hints</Text>

      <Text fontSize="13px" color="gray.300" bg="#1e1a2e" p={3} borderRadius="6px" minH="60px">
        {getHint(question.hints, hintIndex)}
      </Text>

      {hintIndex < question.hints.length - 1 && (
        <Button
          size="sm"
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          onClick={() => setHintIndex(hintIndex + 1)}
          w="full"
        >
          Show next hint
        </Button>
      )}
    </VStack>
  );
}
