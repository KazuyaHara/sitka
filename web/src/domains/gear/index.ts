/* eslint-disable import/prefer-default-export */
type TGear = { id: string; maker: string; name: string; type: 'photo' | 'movie' };
type Constructor = Omit<TGear, 'id'> & { id?: string };

export class Gear {
  private _id: TGear['id'];
  private _maker: TGear['maker'];
  private _name: TGear['name'];
  private _type: TGear['type'];

  constructor({ id, maker, name, type }: Constructor) {
    this._id = id ?? '';
    this._maker = maker;
    this._name = name;
    this._type = type;
  }

  get id(): TGear['id'] {
    return this._id;
  }

  get maker(): TGear['maker'] {
    return this._maker;
  }

  set maker(maker: TGear['maker']) {
    this._maker = maker;
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

  get typeJP(): string {
    if (this._type === 'movie') return '動画';
    return '写真';
  }
}
