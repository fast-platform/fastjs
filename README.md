# FAST - Download

![npm downloads](ttps://img.shields.io/npm/dt/fast-downloads.svg)
![npm (tag)](https://img.shields.io/npm/v/fast-downloads.svg)

This library is a plain JavaScript export tool for Form.io componets. This allows to export any Form.io component (with or without submission data) to PDF (other formats comming soon).

### Installing

To install this package into your project, you can use the following command within your terminal

```
npm install --save fast-downloads
```

# Usage

Using the Downloader with promises

```javascript
import Download from 'fast-downloads';

Download.file({ content, fileName, mimeType }).then(() => {
  // console.log('The file was downloaded')
});
```

Using the Downloader with Await

```javascript
import Download from 'fast-downloads';

  let downloaded = await Download.file({ content, fileName, mimeType })
  if(downloaded){
    // console.log('The file was downloaded')
  }
```

Example

```javascript
import Download from 'fast-downloads';

  let downloaded = await Download.file({
            content: some.csv,                    // Content to include in the download
            fileName: 'download.csv',             // Name and extension of the file
            mimeType: 'text/csv;encoding:utf-8'   // mimeType for the given extension
          });
```

## Readings

* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
