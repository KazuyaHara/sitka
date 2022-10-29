/* eslint-disable import/prefer-default-export */
type TUser = { authid: string | null };

export class User {
  private _authid: TUser['authid'];

  constructor(authid: TUser['authid']) {
    this._authid = authid ?? null;
  }

  get authid(): TUser['authid'] {
    return this._authid;
  }

  set authid(authid: TUser['authid']) {
    this._authid = authid;
  }
}
