# FAST - Download

A library to generate a flat CSV file from an array of Form.io submissions

### Installing

To install this package into your project, you can use the following command within your terminal

```
npm install --save fast-submission2csv
```

# Usage

Using the Downloader with promises

```javascript
import Exporter from 'fast-submission2csv';

file = Exporter.csv({ output, data, formioForm, translations, language }).then(
  (output) => {
    // console.log('The file was generated', output)
  },
);
```

Using the Downloader with Await

```javascript
import Exporter from 'fast-submission2csv';

output = await Exporter.csv({ output, data, formioForm, translations, language })
  if(output){
    // console.log('The file was generated', output)
  }
```

Short Example

```javascript
import Exporter from 'fast-submission2csv';

  let output = await  Exporter.csv({
          output,           // {String} 'csv' [will add more options]
          data,             // {Array} Form.io submissions
          formioForm,       // {Object} Form.io form
          translations,     // {Object} i18next formatted resource
          language          // {String} 'en' language to export the labels
      }
    );
   //  output ==> {
   //  csv : 'Some;Formatted;CSV'
   //  name: 'backup_with_date',
```

Short Example + Download

```javascript
import Exporter from 'fast-submission2csv';
import Download from 'fast-downloads';

  let output = await  Exporter.csv({
          output,           // {String} 'csv' [will add more options]
          data,             // {Array} Form.io submissions
          formioForm,       // {Object} Form.io form
          translations,     // {Object} i18next formatted resource
          language          // {String} 'en' language to export the labels
      }
    );

  let download = await Download.file({
            content: output.csv,
            fileName: output.name + '.csv' ,
            mimeType: 'text/csv;encoding:utf-8'
          });
```

Expected Output

```javascript
import Exporter from 'fast-submission2csv';

  let output = await  Exporter.csv({
          output,           // {String} 'csv' [will add more options]
          data,             // {Array} Form.io submissions
          formioForm,       // {Object} Form.io form
          translations,     // {Object} i18next formatted resource
          language          // {String} 'en' language to export the labels
      }
    );

   //  output ==> {
   //  csv : 'Some;Formatted;CSV'
   //  name: 'backup_with_date',
```

Full Example

```javascript
import Exporter from 'fast-submission2csv';

let translations = {
  en: {
    translation: {
      Name: 'Name',
      Age: 'Age',
      Submit: 'Submit',
      'Owner Email': 'Owner Email'
    }
  },
  de: {
    translation: {
      Name: 'Name',
      Age: 'Alter',
      Submit: 'Einreichen',
      'Owner Email': 'Besitzer E-Mail'
    }
  }
};
let output = 'csv';
let data = [{ name: 'John', age: 20 }, { name: 'Pedro', age: 32 }];

let formioForm = {
  "type": "form",
  "tags": [],
  "owner": "5a3981489768470001cce4ef",
  "components": [
    {
      "autofocus": false,
      "input": true,
      "tableView": true,
      "inputType": "text",
      "inputMask": "",
      "label": "Name",
      "key": "name",
      "placeholder": "",
      "prefix": "",
      "suffix": "",
      "multiple": false,
      "defaultValue": "",
      "protected": false,
      "unique": false,
      "persistent": true,
      "hidden": false,
      "clearOnHide": true,
      "spellcheck": true,
      "validate": {
        "required": false,
        "minLength": "",
        "maxLength": "",
        "pattern": "",
        "custom": "",
        "customPrivate": false
      },
      "conditional": { "show": "", "when": null, "eq": "" },
      "type": "textfield",
      "labelPosition": "top",
      "tags": [],
      "properties": {}
    },
    {
      "autofocus": false,
      "input": true,
      "tableView": true,
      "inputType": "number",
      "label": "Age",
      "key": "age",
      "placeholder": "",
      "prefix": "",
      "suffix": "",
      "defaultValue": "",
      "protected": false,
      "persistent": true,
      "hidden": false,
      "clearOnHide": true,
      "validate": {
        "required": false,
        "min": "",
        "max": "",
        "step": "any",
        "integer": "",
        "multiple": "",
        "custom": ""
      },
      "type": "number",
      "labelPosition": "top",
      "tags": [],
      "conditional": { "show": "", "when": null, "eq": "" },
      "properties": {}
    },
    {
      "autofocus": false,
      "input": true,
      "label": "Submit",
      "tableView": false,
      "key": "submit",
      "size": "md",
      "leftIcon": "",
      "rightIcon": "",
      "block": false,
      "action": "submit",
      "disableOnInvalid": false,
      "theme": "primary",
      "type": "button"
    }
  ],
  "revisions": "",
  "_vid": 0,
  "access": [
    {
      "roles": ["5af0a488fb0cd0b4503aab17", "5af0a488fb0cd0bbdd3aab18", "5af0a488fb0cd081a63aab19"],
      "type": "read_all"
    }
  ],
  "submissionAccess": [],
  "created": "2018-05-17T10:39:20.990Z",
  "_id": "5afd5bd8b2e21c9fc7286a70",
  "title": "csvExport",
  "display": "form",
  "settings": {},
  "name": "csvExport",
  "path": "csvexport",
}


  let output = await  Exporter.csv({
          output,
          data,
          formioForm,
          translations,
          language
      }
    );

    //  output ==> {
    //  csv : 'Name;Age\r\nname;age\r\nJohn;20\r\nPedro;32'
    //  name: 'backup_2018_05_17_12_02_45',
    // }
```

## Readings

* [This library was created using](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
