module.exports = {
	style: {
		sass: {
			loaderOptions: {
				additionalData: `
					@import "~nhsuk-frontend/packages/core/settings/all";
					@import "~nhsuk-frontend/packages/core/tools/all";
				`,
			},
		},
	},
	typescript: {
		enableTypeChecking: true,
	},
	jest: {},
};
