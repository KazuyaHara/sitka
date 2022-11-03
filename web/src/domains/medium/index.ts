/* eslint-disable import/prefer-default-export */
type TMedium = {
  id: string;
  archived: boolean;
  extension: 'jpeg' | 'jpg' | 'png';
  mimeType: 'image/jpeg' | 'image/png';
  name: string;
  path: string;
  thumbnail: string;
};
type Constructor = Omit<TMedium, 'archived' | 'path' | 'thumbnail'> & {
  archived?: TMedium['archived'];
  path?: TMedium['path'];
  thumbnail?: TMedium['thumbnail'];
};

export class Medium {
  private _id: TMedium['id'];
  private _archived: TMedium['archived'];
  private _extension: TMedium['extension'];
  private _mimeType: TMedium['mimeType'];
  private _name: TMedium['name'];
  private _path: TMedium['path'];
  private _thumbnail: TMedium['thumbnail'];

  constructor({ id, archived, extension, mimeType, name, path, thumbnail }: Constructor) {
    this._id = id;
    this._archived = archived ?? false;
    this._extension = extension;
    this._mimeType = mimeType;
    this._name = name;
    this._path = path ?? '';
    this._thumbnail = thumbnail ?? '';
  }

  get id(): TMedium['id'] {
    return this._id;
  }

  get archived(): TMedium['archived'] {
    return this._archived;
  }

  get extension(): TMedium['extension'] {
    return this._extension;
  }

  set extension(extension: TMedium['extension']) {
    this._extension = extension;
  }

  get mimeType(): TMedium['mimeType'] {
    return this._mimeType;
  }

  set mimeType(mimeType: TMedium['mimeType']) {
    this._mimeType = mimeType;
  }

  get name(): TMedium['name'] {
    return this._name;
  }

  set name(name: TMedium['name']) {
    this._name = name;
  }

  get path(): TMedium['path'] {
    return this._path;
  }

  set path(path: TMedium['path']) {
    this._path = path;
  }

  get thumbnail(): TMedium['thumbnail'] {
    return this._thumbnail;
  }

  set thumbnail(thumbnail: TMedium['thumbnail']) {
    this._thumbnail = thumbnail;
  }
}
