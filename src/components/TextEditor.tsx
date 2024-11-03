"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function TextEditor() {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<"insert" | "normal" | "visual">("insert");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const text = window.localStorage.getItem("text");
    if (text) setText(text);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      window.localStorage.setItem("text", text);
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, text]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!textareaRef.current) return;

      const textarea = textareaRef.current;
      const cursorPosition = textarea.selectionStart;

      if (e.key === "Escape") {
        setMode("normal");
      } else if (e.key === "v") {
        setMode("visual");
      } else if (mode === "normal" || mode === "visual") {
        // if (e.key === "i") {
        //   setMode("insert");
        // } else if (e.key === "h") {
        //   textarea.setSelectionRange(
        //     Math.max(0, cursorPosition - 1),
        //     Math.max(0, cursorPosition - 1)
        //   );
        // } else if (e.key === "j") {
        //   const newPos = cursorPosition - textarea.cols;
        //   textarea.setSelectionRange(newPos, newPos);
        // } else if (e.key === "k") {
        //   const newPos = Math.max(0, cursorPosition - textarea.cols);
        //   textarea.setSelectionRange(newPos, newPos);
        // } else if (e.key === "l") {
        //   textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        // }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <textarea
      ref={textareaRef}
      className={twMerge(
        "w-full min-h-[calc(100vh-5.5rem)] resize-none bg-transparent focus:outline-none px-20 py-10",
        mode === "normal" && "caret-orange-400"
      )}
      value={text}
      onChange={(e) => {
        if (mode === "insert") {
          setText(e.target.value);
        }

        if (!textareaRef.current) return;

        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }}
    ></textarea>
  );
}
