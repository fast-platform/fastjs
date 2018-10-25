import Interface from '../../../Interface';

export default Interface.compose({
  properties: {
    localFx: undefined,
    remoteFx: undefined
  },
  init (connectors) {
    this.connectors = connectors;
  },
  methods: {
    async get () {
      this.prepareMergedFunctions();
      const localData = await this.localFx.get();
      const remoteData = await this.remoteFx.get();

      return localData.concat(remoteData);
    },
    owner (user) {
      this.chainReference.push({ method: 'owner', args: user });
    },
    own (user) {
      this.chainReference.push({ method: 'own', args: user });
    },
    prepareMergedFunctions () {
      this.localFx = this.connectors.local;
      this.remoteFx = this.connectors.remote;

      this.chainReference.forEach(chain => {
        const method = chain.method;
        const args = chain.args;

        this.localFx = this.localFx[method](args);
        this.remoteFx = this.remoteFx[method](args);
      });
    }
  }
});
