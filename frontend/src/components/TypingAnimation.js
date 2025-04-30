import { useState, useEffect, useRef } from 'react';

const TypingAnimation = ({ 
  phrases = [], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 1500,
  className = ""
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorBlinking, setCursorBlinking] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Determine the portion of text to show
      if (isDeleting) {
        // Deleting text
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          setCursorBlinking(false);
          timeoutRef.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Done deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
          setCursorBlinking(true);
          timeoutRef.current = setTimeout(handleTyping, 500); // Brief pause before typing next phrase
        }
      } else {
        // Typing text
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          setCursorBlinking(false);
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          // Done typing
          setCursorBlinking(true);
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            handleTyping();
          }, pauseDuration);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentPhraseIndex, displayText, isDeleting, phrases, deletingSpeed, typingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-2 h-5 ml-1 bg-blue-400 ${cursorBlinking ? 'animate-blink' : ''}`}></span>
    </span>
  );
};

export default TypingAnimation;