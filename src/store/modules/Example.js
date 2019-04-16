export const RESET = 'RESET';

const initialState = {};
const actions = {
  reset: ({ commit }) => commit(RESET),
};
const mutations = {
  [RESET]: state => ({ ...initialState }), // eslint-disable-line no-unused-vars
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};
