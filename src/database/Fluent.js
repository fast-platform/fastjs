import stampit from '@stamp/it';
import Privatize from '@stamp/privatize';
import compose from '@stamp/compose';

const Fluent = stampit({
  properties: {
    privatize: Privatize
  },
  methods: {
    model (...args) {
      return stampit(...args);
    },
    extend (...args) {
      return compose(...args);
    },
    compose (...args) {
      return compose(...args);
    }
  }
})();

export default Fluent;
