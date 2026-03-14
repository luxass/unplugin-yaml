import fs from "node:fs";

updateDependencyLinksToLatest("./package.json");

function updateDependencyLinksToLatest(filename) {
  try {
    const contents = fs.readFileSync(filename, "utf-8");
    // eslint-disable-next-line e18e/prefer-static-regex
    const updatedContent = contents.replace(/"workspace:\*"/gi, "\"latest\"");
    fs.writeFileSync(filename, updatedContent);
  } catch (err) {
    console.error(err);
  }
}
