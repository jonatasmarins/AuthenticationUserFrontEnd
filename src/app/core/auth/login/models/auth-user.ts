export class AuthUser {
  public username: string;
  public password: string;
  public token: string;
  public refreshToken: string;
  public grantType: string;
  public roles: Array<string>;
  public claims: Array<string>;
  public expires: Date;
}
