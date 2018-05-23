# FAST - Submission2CSV

A library to generate a flat CSV file from an array of Form.io submissions.
This library is design for those complex Form.io forms with nested objects and arrays
that will simply not translate into a single CSV row.

Submission2CSV will flatten your submissions and give you the right CSV every time!

```
// You can pass the data object of the submission
let sub = [{
      name: 'John'
      complex : [
        {a:1, b:2},
        {a:3, b:4}
      ]
  },{
      name: 'Pedro'
      complex : [
        {a:5, b:6},
        {a:7, b:8}
      ]
  }]

// Or the full array of Form.io submissions

let sub = [
  {
    "owner": "5a3981489768470001cce4ef",
    "deleted": null,
    "roles": [],
    "_vid": 0,
    "_fvid": 0,
    "state": "submitted",
    "access": [],
    "externalIds": [],
    "externalTokens": [],
    "created": "2018-05-17T17:27:10.485Z",
    "_id": "5afdbb6e3d986958e233f56a",
    "data": {
      name: 'John'
      complex : [
        {a:1, b:2},
        {a:3, b:4}
      ]
  },
    "form": "5afd5bd8b2e21c9fc7286a70",
    "modified": "2018-05-17T17:27:10.486Z",
    "__v": 0
  },
  {
    "owner": "5a3981489768470001cce4ef",
    "deleted": null,
    "roles": [],
    "_vid": 0,
    "_fvid": 0,
    "state": "submitted",
    "access": [],
    "externalIds": [],
    "externalTokens": [],
    "created": "2018-05-17T17:27:17.272Z",
    "_id": "5afdbb753d9869c37e33f56b",
    "data": {
      name: 'Pedro'
      complex : [
        {a:5, b:6},
        {a:7, b:8}
      ]
  },
    "form": "5afd5bd8b2e21c9fc7286a70",
    "modified": "2018-05-17T17:27:17.273Z",
    "__v": 0
  }
]
  // Resulting CSV ==> name;complex.0.a;complex.0.b;complex.1.a;complex.1.b\r\nJohn;1;2;3;4\r\Pedro;5;6;7;8
```

This means that 1 submission will always be 1 CSV row

### Installing

To install this package into your project, you can use the following command within your terminal

```
npm install --save fast-submission2csv
```

# Usage

Using the Exporter with promises

```javascript
import Exporter from 'fast-submission2csv';

file = Exporter.csv({ output, data, formioForm, translations, language }).then(
  (output) => {
    // console.log('The file was generated', output)
  },
);
```

Using the Exporter with Await

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

Full Example [(Play with it!)](https://stackblitz.com/edit/fast-submission2csv)

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


  let file = await  Exporter.csv({
          output,
          data,
          formioForm,
          translations,
          language
      }
    );

    //  file ==> {
    //  csv : 'Name;Age\r\nname;age\r\nJohn;20\r\nPedro;32'
    //  name: 'backup_2018_05_17_12_02_45',
    // }
```

## Readings

* [This library was created using](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
