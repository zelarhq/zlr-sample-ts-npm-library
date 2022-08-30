
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


### Sample usage in another project

npm i --legacy-peer-deps sass sass-loader style-loader yup react-icons react-hook-form --save-dev

npm i --legacy-peer-deps @hookform/resolvers react-drag-drop-files --save-dev

npm i --legacy-peer-deps @fluentui/react-hooks --save-dev

npm i celito-library-ts --save-dev

`import { FluentButton, PrimaryButton } from 'celito-library-ts';`

```
    <FluentButton onClick={() => console.log("Clicked")}>
        Test Button 123
    </FluentButton>
    <PrimaryButton onClick={() => console.log("Clicked")}>
        Test Button 456
    </PrimaryButton>

```


### Reference

https://www.thisdot.co/blog/how-to-setup-a-typescript-project-using-rollup-js



```

import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { FormProvider, useForm } from "react-hook-form";
import {
  FluentButton,
  PrimaryButton,
  TextFieldForm,
  DropDownForm,
} from "celito-library-ts";

function App() {
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <FluentButton>Test Button 123</FluentButton>
        <PrimaryButton onClick={() => console.log("Clicked")}>
          Test Button 456
        </PrimaryButton>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextFieldForm
              name="GXP_Document"
              label="GXP_Document"
              control={methods.control}
            />
            <TextFieldForm
              name="GXP_Document1"
              label="GXP_Document1"
              control={methods.control}
            />
            <DropDownForm
              name="GXP_Options"
              label="GXP_Options"
              control={methods.control}
              options={["Hi", "Hello", "Test1"]}
            />
          </form>
        </FormProvider>
      </header>
    </div>
  );
}

export default App;


```