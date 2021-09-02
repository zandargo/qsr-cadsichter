const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				name: "index",
				path: "",
				component: () => import("pages/Index.vue"),
				components: {
					default: () => import("pages/Index.vue"),
				},
			},
			{
				name: "flow",
				path: "flow",
				components: {
					default: () => import("pages/flow/main.vue"),
					navbar: () => import("pages/flow/navbar.vue"),
					footer: () => import("pages/flow/footer.vue"),
				},
			},
			{
				name: "chart",
				path: "chart",
				components: {
					default: () => import("pages/chart/main.vue"),
					navbar: () => import("pages/chart/navbar.vue"),
					footer: () => import("pages/chart/footer.vue"),
				},
			},
			{
				name: "defs",
				path: "defs",
				components: {
					default: () => import("pages/defs/main.vue"),
					navbar: () => import("pages/defs/navbar.vue"),
					footer: () => import("pages/defs/footer.vue"),
				},
			},
		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/Error404.vue"),
	},
];

export default routes;
