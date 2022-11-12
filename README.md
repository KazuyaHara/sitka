# sitka

A gateway to the Glacier.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

### Firebase Storage CORS setting

To download data directly in the browser, you must configure your Cloud Storage bucket for cross-origin access (CORS). This can be done with the gsutil command line tool, which you can install from [here](https://cloud.google.com/storage/docs/gsutil_install).

If you don't want any domain-based restrictions (the most common scenario), run `gsutil cors set storage.cors.json gs://<your-cloud-storage-bucket>`.
