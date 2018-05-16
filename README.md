# FAST - Download

A small library to trigger File downloads that works on Browser and Cordova

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

* [This library was created using](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
