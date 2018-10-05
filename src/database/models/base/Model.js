import Local from './local';
import Remote from './remote';
import Merged from './merged';
import Connection from 'Wrappers/Connection';
import Fluent from '../../Fluent';

export default Fluent.compose({
  properties: {
    getFrom: 'remote-local',
    name: 'baseModel',
    path: undefined
  },
  methods: {
    getModelName () {
      return this.name;
    },
    /**
     * [remote description]
     * @return {[type]} [description]
     */
    remote () {
      return Remote({ path: this.path });
    },
    /**
     * [local description]
     * @return {[type]} [description]
     */
    local () {
      return Local({ name: this.name });
    },
    /**
     *
     */
    merged () {
      return Merged({ name: this.name, path: this.path });
    }
  }
}).compose(Fluent.privatize);
