import { codeToHtml } from "shiki";
import { useEffect, useState } from "react";
import config from "../config.yaml?raw";

export function RawImport() {
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(config, {
          lang: "yaml",
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Error highlighting code:", error);
      }
    };

    highlightCode();
  });

  return (
    <div dangerouslySetInnerHTML={{
      __html: highlightedCode,
    }}
    />
  );
}
