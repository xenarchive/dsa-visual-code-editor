import { Box, HStack, Text, Image } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" display="flex" flexDirection="column">
      {/* Header */}
      <HStack
        bg="#0f0a19"
        borderBottom="1px solid"
        borderColor="#1e1a2e"
        px={6}
        py={4}
        justify="space-between"
      >
        <HStack spacing={3}>
          <Box w="40px" h="40px" bg="blue.500" borderRadius="8px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="20px" fontWeight="bold" color="white">&lt;/&gt;</Text>
          </Box>
          <Box>
            <Text fontSize="20px" fontWeight="bold" color="white">DSA Practice</Text>
            <Text fontSize="12px" color="gray.500">Visual Code Editor</Text>
          </Box>
        </HStack>
        <HStack spacing={6}>
          <Text cursor="pointer" _hover={{ color: "blue.400" }}>Docs</Text>
          <Text cursor="pointer" _hover={{ color: "blue.400" }}>GitHub</Text>
        </HStack>
      </HStack>

      {/* Main Content */}
      <Box flex={1} overflow="hidden">
        <CodeEditor />
      </Box>
    </Box>
  );
}

export default App;
