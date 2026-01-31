import { Box, Text, VStack, Center, HStack, Textarea, Button } from "@chakra-ui/react";
import HintPanel from "./HintPanel";
import { useState } from "react";

const Output = ({ output, isError, question, stdin, setStdin }) => {
  const [tab, setTab] = useState("output");

  return (
    <VStack
      w="25%"
      bg="#0f0a19"
      borderLeft="1px solid"
      borderColor="#1e1a2e"
      p={4}
      spacing={4}
      align="stretch"
      overflowY="auto"
      maxH="calc(100vh - 80px)"
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

      {/* Output / Input Toggle */}
      <VStack align="stretch" spacing={3}>
        <HStack justifyContent="space-between">
          <Text fontSize="md" fontWeight="600" color="white">{tab === "output" ? "Output" : "Input"}</Text>
          <HStack>
            <Button size="xs" variant={tab === "output" ? "solid" : "ghost"} onClick={() => setTab("output")}>Output</Button>
            <Button size="xs" variant={tab === "input" ? "solid" : "ghost"} onClick={() => setTab("input")}>Input</Button>
          </HStack>
        </HStack>

        {tab === "output" ? (
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
        ) : (
          <Box>
            <Textarea
              value={stdin}
              onChange={(e) => setStdin && setStdin(e.target.value)}
              placeholder="Type input to pass to the program (stdin)\nUse newlines for multiple lines"
              minH="160px"
              bg="#1e1a2e"
              color="gray.300"
              borderRadius="8px"
              border="1px solid"
              borderColor="#2e2a3e"
              fontFamily="monospace"
              fontSize="12px"
            />
            <Text fontSize="12px" color="gray.500" mt={2}>Input will be sent when you click Run.</Text>
          </Box>
        )}
      </VStack>

      {/* Hints Section */}
      {question && (
        <VStack align="stretch" spacing={3} borderTop="1px solid" borderColor="#2e2a3e" pt={4}>
          <HintPanel question={question} />
        </VStack>
      )}
    </VStack>
  );
};
export default Output;
