/* eslint-disable import/prefer-default-export */
type TAlbum = { id: string; date: Date; name: string };
type Constructor = Omit<TAlbum, 'id'> & { id?: string };

export class Album {
  private _id: TAlbum['id'];
  private _date: TAlbum['date'];
  private _name: TAlbum['name'];

  constructor({ id, date, name }: Constructor) {
    this._id = id ?? '';
    this._date = date;
    this._name = name;
  }

  get id(): TAlbum['id'] {
    return this._id;
  }

  get date(): TAlbum['date'] {
    return this._date;
  }

  set date(date: TAlbum['date']) {
    this._date = date;
  }

  get name(): TAlbum['name'] {
    return this._name;
  }

  set name(name: TAlbum['name']) {
    this._name = name;
  }
}
