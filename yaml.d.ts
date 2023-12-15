declare module "*.yaml" {
  const value: Record<string, unknown>;
  export default value;
}

declare module "*.yml" {
  const value: Record<string, unknown>;
  export default value;
}

declare module "*.yaml?raw" {
  const value: string;
  export default value;
}

declare module "*.yml?raw" {
  const value: string;
  export default value;
}
