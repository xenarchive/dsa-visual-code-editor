import { Box, Text, VStack, Center, HStack } from "@chakra-ui/react";

const Output = ({ output, isError }) => {
  return (
    <VStack
      w="25%"
      bg="#0f0a19"
      borderLeft="1px solid"
      borderColor="#1e1a2e"
      p={4}
      spacing={4}
      align="stretch"
    >
      {/* Visualization Section */}
      <VStack align="stretch" spacing={3} flex={1}>
        <HStack justify="space-between" align="center">
          <Text fontSize="md" fontWeight="600" color="white" display="flex" alignItems="center">
            👁️ Visualization
          </Text>
        </HStack>
        <Center
          flex={1}
          bg="#1e1a2e"
          border="1px solid"
          borderColor="#2e2a3e"
          borderRadius="8px"
          minH="300px"
          color="gray.500"
          flexDirection="column"
          spacing={3}
          p={6}
          textAlign="center"
        >
          <Box fontSize="48px" mb={2}>📊</Box>
          <Text fontSize="14px" fontWeight="500">No data structure to visualize</Text>
          <Text fontSize="12px" color="gray.600">Upload a DS question to see visualization</Text>
        </Center>
      </VStack>

      {/* Output Section */}
      <VStack align="stretch" spacing={3}>
        <Text fontSize="md" fontWeight="600" color="white">Output</Text>
        <Box
          height="200px"
          p={3}
          color={isError ? "red.400" : "gray.300"}
          bg="#1e1a2e"
          border="1px solid"
          borderRadius="8px"
          borderColor={isError ? "red.500" : "#2e2a3e"}
          overflowY="auto"
          fontSize="12px"
          fontFamily="monospace"
        >
          {output
            ? output.map((line, i) => <Text key={i}>{line}</Text>)
            : <Text color="gray.500">Click "Run" to see the output here</Text>}
        </Box>
      </VStack>
    </VStack>
  );
};
export default Output;
