import "better-auth";

declare module "better-auth" {
  interface User {
    role: "ADMIN" | "SELLER" | "CUSTOMER";
    status: "ACTIVE" | "BANNED";
    phone?: string;
  }
}
