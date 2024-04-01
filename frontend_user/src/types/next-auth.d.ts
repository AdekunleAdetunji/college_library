import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      [key: string]: any;
    };
    isExpired: boolean;
  }
}
