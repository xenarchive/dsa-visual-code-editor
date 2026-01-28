import { useRef, useState, useEffect } from "react";
import { Box, HStack, VStack, Button, Textarea, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { executeCode } from "../api";
import { useToast } from "@chakra-ui/react";
import { analyzeQuestion } from "./Analyzer";

const CodeEditor = ({ currentQuestion }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const [analyzedQuestion, setAnalyzedQuestion] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (currentQuestion) {
      setQuestion(currentQuestion);
    }
  }, [currentQuestion]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleReset = () => {
    setValue(CODE_SNIPPETS[language]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HStack spacing={0} h="calc(100vh - 80px)" align="stretch">
      {/* Left Sidebar - Question Panel */}
      <VStack
        w="25%"
        bg="#0f0a19"
        borderRight="1px solid"
        borderColor="#1e1a2e"
        p={4}
        spacing={4}
        align="stretch"
        justify="space-between"
      >
        <VStack align="stretch" spacing={3} flex={1}>
          <Text fontSize="md" fontWeight="600" color="white">Question</Text>
          <Textarea
            placeholder="Paste or type your DSA question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            bg="#1e1a2e"
            border="1px solid"
            borderColor="#2e2a3e"
            color="gray.300"
            flex={1}
            resize="none"
            fontSize="13px"
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px #3182ce",
            }}
          />
          <Text fontSize="12px" color="gray.600" fontStyle="italic">
            Example: 'Given an array of integers, sort them in ascending order' or 'Reverse a linked list'
          </Text>
        </VStack>
        <Button
          w="full"
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          fontSize="14px"
          h="40px"
          onClick={() => {
            console.log("Analyze button clicked, question:", question);
            const result = analyzeQuestion(question);
            console.log("Result from analyzeQuestion:", result);
            if (result) {
              setAnalyzedQuestion(result);
            }
          }}
        >
          Analyze Question
        </Button>
      </VStack>

      {/* Middle Section - Code Editor */}
      <VStack
        flex={1}
        bg="#0f0a19"
        borderRight="1px solid"
        borderColor="#1e1a2e"
        spacing={3}
        p={4}
        align="stretch"
      >
        <VStack align="stretch" spacing={3}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <HStack spacing={2}>
            <Button
              variant="outline"
              colorScheme="gray"
              size="sm"
              onClick={handleReset}
              _hover={{ bg: "#1e1a2e" }}
            >
              ↻ Reset
            </Button>
            <Button
              variant="solid"
              colorScheme="blue"
              size="sm"
              _hover={{ bg: "blue.600" }}
              isLoading={isLoading}
              onClick={runCode}
            >
              ▶ Run
            </Button>
          </HStack>
        </VStack>
        <Box borderRadius="lg" overflow="hidden">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="calc(100vh - 180px)"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
      </VStack>

      {/* Right Sidebar - Output/Visualization */}
      <Output output={output} isError={isError} question={analyzedQuestion} />
    </HStack>
  );
};
export default CodeEditor;
