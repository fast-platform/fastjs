# Formio Export Tools

This library is a plain JavaScript export tool for Form.io componets.  This allows to export any Form.io component (with or without submission data) to PDF (other formats comming soon).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

To install this package into your project, you can use the following command within your terminal

```
npm install --save formio-export
```

# Usage

Creating a FormioExport instance

```javascript
let exporter = new FormioExport(component, data, options);
```

Using static methods
```javascript
let options = {
  component: component,
  data: data,
  formio: {
    // component specific configuration
  }
};

FormioExport.toPdf(options).then((pdf) => {
  // do something
})
```

# Simple Example

```javascript
import FormioExport from 'formio-export';

let component = {
  type: 'form',
  title: 'Example',
  display: 'form',
  components: [
    {
      type: 'textfield',
      key: 'name',
      label: 'Name',
      input: true
    },
    {
      type: 'number',
      key: 'age',
      label: 'Age',
      input: true
    }
  ]
};

let submission = {
  _id: '<submission id>',
  owner: '<owner id>',
  modified: '1970-01-01T00:00:00.000Z',
  data: {
    name: 'John Doe',
    age: 25
  }
};

let options: {
  ignoreLayout: true
}

let exporter = new FormioExport(component, submission, options);

exporter.toHtml().then((html) => {
  document.body.appendChild(html);
});

let config = {
  download: false,
  filename: 'example.pdf'
};

exporter.toPdf(config).then((pdf) => {
  // download the pdf file
  pdf.save();
  // get the datauri string
  let datauri = pdf.output('datauristring');
})
```

# Building

Clone git repository:

```
git clone git@github.com:airarrazaval/formio-export.git
```

Install dependencies:

```
cd formio-export
npm install
```

Build browser bundle

```
npm run build
```

## Running the tests

Tests use samples provided in `test/samples` and should use [Form.io's Component JSON Schema](https://github.com/formio/formio.js/wiki/Components-JSON-Schema) structure.

```
npm run test
```

## Built With

* [js-html2pdf](https://github.com/airarrazaval/html2pdf) - Html to Pdf javascript library
* [formiojs](https://github.com/formio/formiojs) - Form.io JavaScript SDK

## Authors

* **Alfredo Irarrazaval** - *Initial work* - [airarrazaval](https://github.com/airarrazaval)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
