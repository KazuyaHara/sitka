export type TUser = { authid: string | null };

export class User {
  private _authid: string | null;

  constructor(authid: string | null) {
    this._authid = authid ?? null;
  }

  get authid(): string | null {
    return this._authid;
  }

  set authid(authid: string | null) {
    this._authid = authid;
  }
}
