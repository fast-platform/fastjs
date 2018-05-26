import Form from 'database/models/Form';
import Auth from 'repositories/Auth/Auth';
import Submission from 'database/models/Submission';

const GetRequest = class {
  /**
   *
   * @param {*} args
   */
  static async handle (args) {
    // If we are making a request to a external API (NOT FORM.io)
    if (args.url.indexOf('form.io') === -1) {
      return GetRequest.handleExternalAPI(args);
    }
    // If we are trying to get a form we load it locally
    // This action will get triggered when we create a
    // resource from inside of another Form
    if (args.type === 'form') {
      return GetRequest.handleLocalForm(args);
    }
    // Calling to an internal Form.io route from Select component
    if (args.type === 'select' && args.url.indexOf('form.io') !== -1) {
      return GetRequest.handleInternalResource(args);
    }
  }
  /**
   *
   */
  static handleExternalAPI () {
    // TODO
    // let a = {'count': 811, 'previous': null, 'results': [{'url': 'https://pokeapi.co/api/v2/pokemon/1/', 'name': 'aaa'}, {'url': 'https://pokeapi.co/api/v2/pokemon/2/', 'name': 'ivysaur'}, {'url': 'https://pokeapi.co/api/v2/pokemon/3/', 'name': 'venusaur'}, {'url': 'https://pokeapi.co/api/v2/pokemon/4/', 'name': 'charmander'}, {'url': 'https://pokeapi.co/api/v2/pokemon/5/', 'name': 'charmeleon'}, {'url': 'https://pokeapi.co/api/v2/pokemon/6/', 'name': 'charizard'}, {'url': 'https://pokeapi.co/api/v2/pokemon/7/', 'name': 'squirtle'}, {'url': 'https://pokeapi.co/api/v2/pokemon/8/', 'name': 'wartortle'}, {'url': 'https://pokeapi.co/api/v2/pokemon/9/', 'name': 'blastoise'}, {'url': 'https://pokeapi.co/api/v2/pokemon/10/', 'name': 'caterpie'}, {'url': 'https://pokeapi.co/api/v2/pokemon/11/', 'name': 'metapod'}, {'url': 'https://pokeapi.co/api/v2/pokemon/12/', 'name': 'butterfree'}, {'url': 'https://pokeapi.co/api/v2/pokemon/13/', 'name': 'weedle'}, {'url': 'https://pokeapi.co/api/v2/pokemon/14/', 'name': 'kakuna'}, {'url': 'https://pokeapi.co/api/v2/pokemon/15/', 'name': 'beedrill'}, {'url': 'https://pokeapi.co/api/v2/pokemon/16/', 'name': 'pidgey'}, {'url': 'https://pokeapi.co/api/v2/pokemon/17/', 'name': 'pidgeotto'}, {'url': 'https://pokeapi.co/api/v2/pokemon/18/', 'name': 'pidgeot'}, {'url': 'https://pokeapi.co/api/v2/pokemon/19/', 'name': 'rattata'}, {'url': 'https://pokeapi.co/api/v2/pokemon/20/', 'name': 'raticate'}], 'next': 'https://pokeapi.co/api/v2/pokemon/?offset=20'}
    return null;
  }
  /**
   *
   * @param {*} args
   */
  static async handleLocalForm (args) {
    let form = await Form.local().get(args.formio.formId);

    return form;
  }
  /**
   *
   * @param {*} args
   */
  static async handleInternalResource (args) {
    let formID = args.url.split('/')[4];
    let form = await Form.local().find();

    form = form.filter((f) => {
      return f.data._id === formID;
    })[0];

    if (!form) {
      return;
    }
    let submissions = await Submission.local().find();

    submissions = submissions.filter((s) => {
      return s.data.formio.formId === form.data.path && (s.data.owner === Auth.user()._id);
    });

    submissions = submissions.map((s) => {
      return { data: s.data.data };
    });

    return submissions;
  }
};

export default GetRequest;
