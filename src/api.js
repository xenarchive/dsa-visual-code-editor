import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, stdin = "") => {
  const payload = {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  };

  if (stdin && stdin.length > 0) {
    payload.stdin = stdin;
  }

  const response = await API.post("/execute", payload);
  return response.data;
};
