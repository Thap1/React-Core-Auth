const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#A9906C',
                            '@border-radius-base': '0px',
                            '@error-color': '#FD5242',
                            '@success-color': '#81C068',
                            '@text-color': '#464646',
                            '@text-color-secondary': '#8F8F8F',
                            '@disabled-color': '#D0D0D0',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
