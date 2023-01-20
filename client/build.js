const rewire = require('rewire');
const webpack = require('webpack');
const defaults = rewire('react-scripts/scripts/build.js');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');


//In order to override the webpack configuration without ejecting the create-react-app
const config = defaults.__get__('config');


config.plugins = [
  ...config.plugins,
  new MomentTimezoneDataPlugin({
    matchCountries: ['PL'],
    startYear: 2022,
    endYear: 2030,
  })
];