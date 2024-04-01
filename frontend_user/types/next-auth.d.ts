import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      [key: string]: any;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    [key: string]: any;
  }
}
