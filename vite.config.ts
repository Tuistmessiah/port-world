import { defineConfig } from 'vite';
import String from 'vite-plugin-string';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react(), String()],
    css: {
        modules: {
            scopeBehaviour: 'local',
            generateScopedName: (name, filename, css) => {
                const file = filename
                    .replace(/\.[^/.]+$/, '') // remove the file extension
                    .split('/')
                    .pop() // get the file name without extension
                    .replace('.module', ''); // remove ".module" from the filename

                const hash = Buffer.from(name + css)
                    .toString('base64')
                    .slice(0, 5);

                return `${file}_${name}_${hash}`;
            },
        },
        preprocessorOptions: {
            scss: {
                // any global SCSS variables/mixins can be imported here
            },
        },
    },
    assetsInclude: ['**/*.glb', '**/*.JPG', '**/*.PNG'],
});
