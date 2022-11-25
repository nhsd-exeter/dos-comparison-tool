module.exports = {
	// Must be commonjs module
	style: {
		sass: {
			loaderOptions: {
				// the following scss imports should only include variables and mixins
				// any included css will be duplicated many times
				additionalData: `
					@import "~nhsuk-frontend/packages/core/settings/all";
						@import "~nhsuk-frontend/packages/core/tools/all";
				`,
			},
		},
	},
};
