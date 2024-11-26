import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    divideStyle: true,
  },
  theme: {
    extend: {
      // <<< THEME INJECTION START >>>
      colors: {
        background: 'var(--background)',
        onbackground: 'var(--onbackground)',
        surface: 'var(--surface)',
        onsurface: 'var(--onsurface)',
        primary: 'var(--primary)',
        primaryhover: 'var(--primaryhover)',
        primaryactive: 'var(--primaryactive)',
        link: 'var(--link)',
        linkhover: 'var(--linkhover)',
        linkactive: 'var(--linkactive)',
        error: 'var(--error)',
        onerror: 'var(--onerror)',
        warning: 'var(--warning)',
        onwarning: 'var(--onwarning)',
        success: 'var(--success)',
        onsuccess: 'var(--onsuccess)',
        onprimary: 'var(--onprimary)',
      },
      // <<< THEME INJECTION END >>>
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    }),
  ],
} satisfies Config;
