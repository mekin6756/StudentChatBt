// !!!! MAKE SURE TO COPY ALL CHANGES FROM THIS FILE INTO rollup-fast.config.js!!!!

import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from '@rollup/plugin-alias';
import tla from 'rollup-plugin-tla';

export default [{
	input: './src/index.ts',
    plugins: [
	  	externals(),
      typescript(),
    ],
    output: {
      format: 'commonjs',
      dir: './build',
      inlineDynamicImports: true
  },
	onwarn: function (message) {
		if (message.code === 'CIRCULAR_DEPENDENCY' || message.code === "MISSING_GLOBAL_NAME" || message.code === "UNRESOLVED_IMPORT") {
			return;
		}
		console.warn(message);
	}
}];