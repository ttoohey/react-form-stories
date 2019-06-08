import { configure, addDecorator } from '@storybook/react';
import withApolloProvider from "./withApolloProvider";
import { withInfo } from "@storybook/addon-info";
import { components } from "./addon-info";

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  addDecorator(withInfo({ components, source: false, header: false }));
  addDecorator(withApolloProvider());
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
