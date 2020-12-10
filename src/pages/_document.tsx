import React from "react";
import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";

export default class MyDocument extends Document {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static async getInitialProps(ctx): Promise<any> {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => {
            const styledComponentsData = sheet.collectStyles(
              <App {...props} />
            );
            renderToString(styledComponentsData);

            return styledComponentsData;
          },
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [initialProps.styles, ...sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
