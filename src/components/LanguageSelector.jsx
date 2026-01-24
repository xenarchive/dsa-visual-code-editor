import { Box, Button, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const getLanguageLabel = (lang) => {
  const labels = {
    python: "Python",
    javascript: "JavaScript",
    typescript: "TypeScript",
    java: "Java",
    cpp: "C++",
    go: "Go",
  };
  return labels[lang] || lang;
};

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box>
      <Wrap spacing={2}>
        {languages.map(([lang]) => (
          <WrapItem key={lang}>
            <Button
              size="sm"
              px={4}
              py={2}
              fontSize="13px"
              fontWeight="500"
              bg={lang === language ? "blue.500" : "#1e1a2e"}
              color={lang === language ? "white" : "gray.400"}
              border="1px solid"
              borderColor={lang === language ? "blue.400" : "#2e2a3e"}
              cursor="pointer"
              _hover={{
                bg: lang === language ? "blue.600" : "#252a3e",
                borderColor: "blue.400",
              }}
              onClick={() => onSelect(lang)}
              transition="all 0.2s"
            >
              {getLanguageLabel(lang)}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
export default LanguageSelector;
