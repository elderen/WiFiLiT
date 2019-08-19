/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './react-native/App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

AppRegistry.registerComponent(appName, () => App);
