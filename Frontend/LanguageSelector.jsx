import React from "react";
import { Language_versions } from "./Constants";
import "./LanguageSelector.css";

const languages = Object.entries(Language_versions);

const LanguageSelector = ({language, onSelect}) => {
  return (
    <>
      <div className="container1">
        <h5 className="languageText">Language:</h5>
        <select
          className="p-1"
          value={language}
          onChange={(e) => onSelect(e.target.value)}
        >
          {languages.map(([lang, version]) => (
            <option key={lang} value={lang}>
              {`${lang} - ${version}`}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LanguageSelector;
