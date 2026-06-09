export type Stack = "frontend";

export type Level = "debug" | "info" | "warn" | "error" | "fatal";

export type FrontendPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";