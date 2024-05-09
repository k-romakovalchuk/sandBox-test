import React, { useState } from 'react';

const CensoredText = ({ badWords, children }) => {
  const [originalWord, setOriginalWord] = useState(null);

  const censorText = text => {
    let censoredText = text;
    badWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      censoredText = censoredText.replace(regex, match => {
        setOriginalWord(match); 
        return '*'.repeat(match.length); 
      });
    });
    return censoredText;
  };

  return (
    <span>
      {censorText(children)}
      {originalWord && (
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setOriginalWord(null)}>
          {originalWord}
        </span>
      )}
    </span>
  );
};

function SomeComponent() {
  const badWords = ['test', 'someBadWord'];
  const someText = 'Very long text who containts someBadWord and testWord';

  return <CensoredText badWords={badWords}>{someText}</CensoredText>;
}