
` Setup a sample typescript based library to export to NPM as a package and install in other projects`

### Install required dependencies

`npm i -D react typescript @types/react`

`npx tsc --init`

`npm i -D rollup --force`

`npm i -D @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-peer-deps-external rollup-plugin-postcss rollup-plugin-terser --force`

`npm i -D rollup-plugin-dts --force`

`npm i -D rollup-plugin-node-resolve --force`

`npm i -D rollup-plugin-commonjs --force`

### Build the library

`npm run build`

### Publishing to NPM

`npm login`

`npm publish`

### Reference

https://www.thisdot.co/blog/how-to-setup-a-typescript-project-using-rollup-js