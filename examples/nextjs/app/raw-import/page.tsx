import { codeToHtml } from "shiki";
import config from "../config.yaml?raw";

export default async function Home() {
  const html = await codeToHtml(config, {
    lang: "yaml",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div dangerouslySetInnerHTML={{
      __html: html,
    }}
    />
  );
}
