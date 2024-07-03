import { codeToHtml } from "shiki";
import { useEffect, useState } from "react";
import config from "../config.yaml";

export function ImportAsModule() {
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(JSON.stringify(config, null, 2), {
          lang: "json",
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
