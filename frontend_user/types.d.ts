import "next-auth";

export declare module "next-auth" {
  interface Session {
    user?: {
      [key: string]: any;
    };
  }
}

export declare module "next-auth/jwt/types" {
  interface JWT {
    [key: string]: any;
  }
}
