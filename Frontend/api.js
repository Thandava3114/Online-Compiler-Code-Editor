import axios from "axios";
import { Language_versions } from "./Constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
export const executeCode = async (language, code) => {
  const version = String(Language_versions[language]);
  const response = await API.post("/execute", {
    language: language,
    version: version,
    files: [
      {
        name: "main",
        content: code,
      },
    ],
  });
  return response.data;
};
