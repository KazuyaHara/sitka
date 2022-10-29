/* eslint-disable import/prefer-default-export */
type TGear = { maker: string; name: string; type: 'photo' | 'movie' };

export class Gear {
  private _maker: TGear['maker'];
  private _name: TGear['name'];
  private _type: TGear['type'];

  constructor({ maker, name, type }: TGear) {
    this._maker = maker;
    this._name = name;
    this._type = type;
  }

  get maker(): TGear['maker'] {
    return this._maker;
  }

  set maker(name: TGear['maker']) {
    this._maker = name;
  }

  get name(): TGear['name'] {
    return this._name;
  }

  set name(name: TGear['name']) {
    this._name = name;
  }

  get type(): TGear['type'] {
    return this._type;
  }

  set type(type: TGear['type']) {
    this._type = type;
  }
}
