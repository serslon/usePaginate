const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = ({ config }) => {
  config.module.rules.find(
    rule => rule.test.toString() === '/\\.css$/',
  ).exclude = /\.module\.css$/;

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
        },
        // {
        //   loader: require.resolve('react-docgen-typescript-loader'),
        // },
      ],
    },
    {
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent
            },
          }
        }
      ]
    },
  );

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
