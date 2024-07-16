export function removeComments(str?: string): string {
  return (str || "").split("\n").filter((line) => !line.startsWith("//")).join("\n");
}
