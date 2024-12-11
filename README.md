# NextJS Figmas Tokens

## Check out the live site [here](https://nextjs-figma-tokens.vercel.app/)

This Repo is an example of a minimal NextJS app with design system tokens, which can be exported directly from Figma.

It includes the following features:

- Convert figma theme into css variables
- Select Light / Dark / OS theme
- CSS color tokens via tailwind
- Web element defaults
- Custom variable font (Mona-Sans and Monaspace)
- "Hocus" tailwind selector (hover or focus)
- OS-driven Light / Dark theme favicon

## How to use

- Export typography and Figma Variables
  - Once your figma variables are set up, they can be exported via the [Design Tokens](https://github.com/lukasoppermann/design-tokens) Figma Plugin.
    ![Export typography and Figma Variables](/docs/assets/export_figma_tokens.gif)
  - Save the file to `theme.json` (in the root of this repo)
- Run `npm run generate-theme` to update `global.css` and `tailwind.config.ts`
  - `global.css` now has access to all of the light and dark theme css variables
  - Tailwind classes are now aware of the new color tokens
