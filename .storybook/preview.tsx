import type { Preview } from "@storybook/nextjs";
import "../public/fonts/PretendardVariable.woff2";
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Story />

        <style>{`
          @font-face {
            font-family: "Pretendard Variable";
            src: url("/fonts/PretendardVariable.woff2") format("woff2");
            font-weight: 45 920;
            font-display: swap;
          }

          :root {
            --font-primary: "Pretendard Variable";
          }
        `}</style>
      </>
    ),
  ],
};

export default preview;
