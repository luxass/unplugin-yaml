// @ts-check
import {
  luxass,
} from "@luxass/eslint-config";

export default luxass({}, {
  files: [
    "**/playground/**/*",
    "**/test/fixtures/**/*",
  ],
  rules: {
    "no-console": "off",
  },
});
