export {};
declare global {
  namespace jsonwebtoken {
    export interface JwtPayload {
      permissions?: string[];
    }
  }
}
