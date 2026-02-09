import React, { useState, useRef } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import TutorChatbox from "./components/TutorChatbox";

function App() {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [currentProblem, setCurrentProblem] = useState("two-sum");
  const lastTutorRef = useRef(null);
  const [tutorMessages, setTutorMessages] = useState([
    {
      from: "tutor",
      text: "Hi! I’ll guide you as you work through this problem.",
    },
  ]);

  const pushTutorMessage = (text) => {
    if (!text) return;
    if (lastTutorRef.current === text) return; // prevent spam

    lastTutorRef.current = text;
    setTutorMessages((prev) => [...prev, { from: "tutor", text }]);

    if (!isTutorOpen) {
      setHasNotification(true);
    }
  };
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
        <CodeEditor currentProblem={currentProblem} pushTutorMessage={pushTutorMessage} />
      </Box>

      {/* Floating tutor icon */}
      <Button
        onClick={() => {
          setIsTutorOpen(true);
          setHasNotification(false);
        }}
        position="fixed"
        bottom="20px"
        right="20px"
        borderRadius="50%"
        width="56px"
        height="56px"
        bg="#4f46e5"
        color="#fff"
        fontSize="24px"
        zIndex={1001}
      >
        💬
        {hasNotification && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "18px",
              height: "18px",
              background: "red",
              color: "#fff",
              borderRadius: "50%",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            !
          </span>
        )}
      </Button>

      <TutorChatbox isOpen={isTutorOpen} messages={tutorMessages} onClose={() => setIsTutorOpen(false)} />
    </Box>
  );
}

export default App;
