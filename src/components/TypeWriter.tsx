import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypeWriterProps {
  text: string;
  speed?: number;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({ text, speed = 10 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    textRef.current = text;
    if (text !== displayText) {
      setDisplayText('');
      setIsComplete(false);
      
      let currentIndex = 0;
      const typeNextCharacter = () => {
        if (currentIndex < textRef.current.length) {
          setDisplayText(prev => prev + textRef.current[currentIndex]);
          currentIndex++;
          timeoutRef.current = setTimeout(typeNextCharacter, speed);
        } else {
          setIsComplete(true);
        }
      };

      timeoutRef.current = setTimeout(typeNextCharacter, speed);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed]);

  return (
    <div className={`markdown-content typewriter ${isComplete ? 'complete' : ''}`}>
      <ReactMarkdown>{displayText || ' '}</ReactMarkdown>
    </div>
  );
};
