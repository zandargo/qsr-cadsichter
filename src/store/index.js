import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import Vue from "vue";
// import Vuex from "vuex";

import main from "./cadsichter";

// Vue.config.devtools = true;

// Vue.use(Vuex);

export default store(function (/* { ssrContext } */) {
	const Store = createStore({
		modules: {
			main,
		},

		// enable strict mode (adds overhead!)
		// for dev mode and --debug builds only
		// strict: process.env.DEBUGGING,
		strict: true,
	});

	return Store;
});
