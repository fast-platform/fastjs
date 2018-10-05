import Fluent from '../../Fluent';
import Interface from './Interface';

export default Fluent.extend(Interface, {
  methods: {
    /**
     * [find description]
     * @param  {[type]} filter [description]
     * @return {[type]}        [description]
     */
    async find ({ filter, limit = undefined, select, pagination, form, populate, reviewer } = {}) {
      let local = await Local.find({
        name: this.name,
        filter,
        limit,
        select,
        pagination,
        form
      });
      let remote;

      if (this.path === 'custom') {
        let isOnline = await Connection.isOnline();

        remote = isOnline ?
          await this.rFind({
            path: this.path,
            filter,
            limit,
            select,
            pagination,
            populate
          }) :
          [];
      } else {
        let isOnline = await Connection.isOnline();

        remote = isOnline ?
          await Remote.find({
            path: form || this.path,
            filter,
            limit,
            select,
            pagination,
            populate
          }) :
          [];
      }

      // We need to include a logic here to check Which submission to keep
      // It could be the offline synced submission, the merge of the two
      // Or just keep the online submission
      let localOnline = local.reduce((reducer, s) => {
        if (s.data && s.data._id && s.data._id.indexOf('_local') === -1) {
          reducer.push(s.data._id);
        }
        return reducer;
      }, []);

      remote = remote.filter((s) => {
        return !localOnline.includes(s._id);
      });

      return remote.concat(local);
    }
  }
});
