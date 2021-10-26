import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// import Vue from "vue";
// import Vuex from "vuex";

import main from "./cadsichter";
import flow from "./flow";

// Vue.config.devtools = true;

// Vue.use(Vuex);

export default store(function (/* { ssrContext } */) {
	const Store = createStore({
		modules: {
			main,
			flow,
		},
		// enable strict mode (adds overhead!)
		// for dev mode and debug builds only
		// strict: process.env.DEBUGGING,
		strict: true,
		plugins: [createPersistedState()],
	});

	return Store;
});
