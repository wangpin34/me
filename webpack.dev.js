const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: {
    index: [
      "webpack-hot-middleware/client",
      "./app/index.js"
    ],
    serviceworker: [
      "webpack-hot-middleware/client",
      "./app/service-worker.js"
    ]
  }, // string | object | array  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    // path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "[name].bundle.js", // string    // the filename template for entry chunks
    publicPath: "/", // string    // the url to the output directory resolved relative to the HTML page
    library: "mylib", // string,
    // the name of the exported library
    libraryTarget: "umd" // universal module definition    // the type of the exported library
    /* Advanced output configuration (click to show) */
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "app"), path.resolve(__dirname, "node_modules")],
        exclude: [path.resolve(__dirname, "app/demo-files")],
        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include
        //issuer: { test, include, exclude },
        // conditions for the issuer (the origin of the import)
        enforce: "pre",
        enforce: "post",
        // flags to apply these rules, even if they are overridden (advanced option)
        loader: "babel-loader"
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: "url-loader"
      }
      // { oneOf: [ /* rules */ ] },
      // only use one of these nested rules
      // { rules: [ /* rules */ ] },
      // use all of these nested rules (combine with conditions to be useful)
      // { resource: { and: [ /* conditions */ ] } },
      // matches only if all conditions are matched
      // { resource: { or: [ /* conditions */ ] } },
      // { resource: [ /* conditions */ ] },
      // matches if any condition is matched (default for arrays)
      // { resource: { not: /* condition */ } }
      // matches if the condition is not matched
    ]
    /* Advanced module configuration (click to show) */
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: ["node_modules", path.resolve(__dirname, "app")],
    // directories where to look for modules
    extensions: [".js", ".json", ".css"],
    // extensions that are used
    alias: {
      // a list of module name aliases
      module: "new-module",
      // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
      module: path.resolve(__dirname, "app/third/module.js")
      // alias "module" -> "./app/third/module.js" and "module/file" results in error
      // modules aliases are imported relative to the current context
    }
    /* alternative alias syntax (click to show) */
    /* Advanced resolve configuration (click to show) */
  },
  performance: {
    hints: "warning", // enum    
    maxAssetSize: 2000000, // int (in bytes), 
    maxEntrypointSize: 4000000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    }
  },
  devtool: "source-map", // enum  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  target: "web", // enum  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  //externals: ["react", /^@angular\//],  // Don't follow/bundle these modules, but request them at runtime from the environment
  serve: {
    //object
    port: 1337,
    content: "./docs"
    // ...
  },
  // lets you provide options for webpack-serve
  stats: "errors-only", // lets you precisely control what bundle information gets displayed
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "/api": "http://localhost:3000"
    },
    contentBase: path.join(__dirname, "dist"), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true // only errors & warns on hot reload
    // ...
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Markdown Editor",
      filename: "index.html",
      template: "templates/index.html",
    }),
     new SWPrecacheWebpackPlugin(
      {
        cacheId: 'me-cache',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'serviceworker.bundle.js',
        minify: true,
        navigateFallback:  '/index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
      }
    ),
    new WebpackPwaManifest({
      name: 'Markdown Editor',
      short_name: 'MD',
      description: 'Simple markdown editor',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        
      ],
      start_url: "/index.html"
    }),
    // OccurenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ]
  // list of additional plugins
  /* Advanced configuration (click to show) */
};
