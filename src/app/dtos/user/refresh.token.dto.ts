export class RefreshTokenDTO {
  refreshToken: string;
  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
