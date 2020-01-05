module.exports = function(api) {
	api.cache(true);

	const presets = ['babel-preset-expo'];
	const plugins = [
		["module-resolver", {
			"root": ["./"],
			"alias": {
				"_": "./src",
				"_assets":"./src/assets",
				"_components":"./src/components",
				"_atoms":"./src/components/atoms",
				"_molecules":"./src/components/molecules",
				"_organisms":"./src/components/organisms",
				"_navigations":"./src/navigations",
				"_views":"./src/views",
				"_styles":"./src/styles",
				"_utils":"./src/utils"
			}
		}]
	];

	return {
		presets,
		plugins
	};
};
