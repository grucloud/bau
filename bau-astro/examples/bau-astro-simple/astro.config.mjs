import { defineConfig } from 'astro/config';
import bau from '../../index.js';

// https://astro.build/config
export default defineConfig({
	integrations: [bau()],
});
