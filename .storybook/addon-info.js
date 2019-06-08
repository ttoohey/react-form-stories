import React from "react";
import { SyntaxHighlighter } from '@storybook/components';
import { ThemeProvider, convert } from "@storybook/theming";
import * as baseTheme from "@storybook/theming/dist/base";

/** Workaround rendering code blocks in markdown content
    https://github.com/storybookjs/storybook/pull/6016#issuecomment-490186172
 **/
function CodeBlock({ language = "text", code }) {
  const theme = convert();
  const style = {
    fontSize: "15px",
    marginBottom: "15px"
  };
  const lineNumberStyle = {
    fontSize: "15px",
    fontFamily: theme.typography.fonts.mono
  };
  return (
    <ThemeProvider theme={convert()}>
      <div style={style}>
        <SyntaxHighlighter
          showLineNumbers
          lineNumberStyle={lineNumberStyle}
          bordered
          copyable
          language={language}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </ThemeProvider>
  );
}

function PBlock({ children }) {
  const style = {
    fontSize: "15px",
    marginBottom: "15px"
  };
  return <div style={style}>{children}</div>;
}

export const components = {
  code: CodeBlock,
  p: PBlock
};
