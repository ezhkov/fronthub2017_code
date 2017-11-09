const webpack = require('webpack');

const configurePlugins = (opts = {}) => {
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: opts.runtimeName || 'runtime',
    }),
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          safari10: true,
        },
      },
    }));
  }

  return plugins;
};

const configureBabelLoader = (browserlist) => {
  return {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            debug: true,
            modules: false,
            useBuiltIns: true,
            targets: {
              browsers: browserlist,
            },
          }],
        ],
        plugins: ['syntax-dynamic-import'],
      },
    },
  };
};

const baseConfig = {
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
  },
  cache: {},
};

const modernConfig = Object.assign({}, baseConfig, {
  entry: {
    index: './src/pages/index.js',
    catalog: './src/pages/catalog.js',
  },
  plugins: configurePlugins({runtimeName: 'runtime'}),
  module: {
    rules: [
      configureBabelLoader([
        // The last two versions of each browser, excluding versions
        // that don't support <script type="module">.
        'last 2 Chrome versions', 'not Chrome < 60',
        'last 2 Safari versions', 'not Safari < 10.1',
        'last 2 iOS versions', 'not iOS < 10.3',
        'last 2 Firefox versions', 'not Firefox < 54',
        'last 2 Edge versions', 'not Edge < 15',
      ]),
    ],
  },
});

const legacyConfig = Object.assign({}, baseConfig, {
  entry: {
    'index-l': './src/pages/index.js',
    'catalog-l': './src/pages/catalog.js',
  },
  plugins: configurePlugins({runtimeName: 'runtime-legacy'}),
  module: {
    rules: [
      configureBabelLoader([
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
      ]),
    ],
  },
});

module.exports = [
  modernConfig,
  legacyConfig,
];
