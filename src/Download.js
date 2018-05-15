import Promise from 'bluebird';
let Download = class {
  static async file({ content, fileName, mimeType }) {
    if (window.hasOwnProperty('cordova')) {
      return this.cordovaDownload({ content, fileName, mimeType });
    }
    return this.browserDownload({ content, fileName, mimeType });
  }

  static async browserDownload({ content, fileName, mimeType }) {
    return new Promise((resolve, reject) => {
      mimeType = mimeType || 'application/octet-stream';
      let a = document.createElement('a');

      if (navigator.msSaveBlob) {
        // IE10
        navigator.msSaveBlob(
          new Blob([content], {
            type: mimeType
          }),
          fileName
        );
        resolve(true);
      } else if (URL && 'download' in a) {
        // html5 A[download]
        a.href = URL.createObjectURL(
          new Blob([content], {
            type: mimeType
          })
        );
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        resolve(true);
      } else {
        let fileContent = 'data:' + mimeType + ',' + content;
        let encodedUri = encodeURI(fileContent);
        let link = document.createElement('a');

        link.id = '_downloadedFile';
        if (link.download !== undefined) {
          link.href = encodedUri;
          link.download = fileName;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
        } else {
          window.open(encodedUri);
        }
        resolve(true);
      }
    });
  }

  static async cordovaDownload({ content, fileName, mimeType }) {
    return new Promise((resolve, reject) => {
      let logOb;

      function writeLog(output) {
        if (!logOb) return;
        logOb.createWriter(function (fileWriter) {
          fileWriter.seek(fileWriter.length);
          let blob = new Blob([output], {
            type: mimeType
          });

          fileWriter.write(blob);
          resolve({
            directory: cordova.file.externalDataDirectory,
            filename: fileName
          });
        });
      }

      window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dir) {
        dir.getFile(
          fileName,
          {
            create: true
          },
          function (file) {
            logOb = file;
            writeLog(content);
          }
        );
      });
    });
  }
};

export default Download;
