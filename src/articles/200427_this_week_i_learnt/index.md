---
title: 'Week 18 - what did I learn'
date: '2020-04-27'
description: 'Week 18 and summary of what I learned.'
featuredImage: 'wrzos2.jpg'
---

# This week I learned

## Gatsby images.

It seems Sharp Image Plugin has problems with jpeg files. JPG works fine.

## Material-ui

### styled-components

Material UI components has highest specificity, so creating styled components from them will cause problems with not working
styles. There are few **workarounds** for this, but the best and simplest is using this wrapper.

```javascript
<StylesProvider injectFirst></StylesProvider>
```

This will change specificity and will use styled-components styles.

### Grid and spacing

This thing sucks a little bit. If you use spacing in Grid container, you will have to add negative margins to this grid. Otherwise it will overlap the previous container.

## React-Testing-Library and typescript

This [link](https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript) covers most of configuration.
`npm install @types/jest @testing-library/react @testing-library/jest-dom jest ts-jest`

- @testing-library/react - testing library
- @testing-library/jest-dom - this are custom matchers. Not only isEqual, but more specific, DOM centric.
- ts-jest - thanks to this lib, you can user jest in .ts files.

To jest.config.js

```javascript
module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each', '@testing-library/jest-dom/extend-expect'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/**tests**/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

Still, jest is test runner, so in package.json we create script

```javascript
scripts: {
  ...,
  test: "jest",
}
```

We also should create file with types for extend-expect. Create file globals.d.ts, in it:

```javascript
import '@testing-library/jest-dom/extend-expect';
```

Thanks to that, intellisense won't show TS warnings when using extended matchers.

### This is a nice trick for handling default props

Let assume we have a component that has some props, interface Props. When rendering this component, we could create a rendering function.

```typescript
// Partial<Props>, because it could be empty, or only some of props will be passed to function
function renderComponent(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    propOne: 'someValue',
    propTwo: () => {},
    thirdProp: true,
  };

  // render from @testing-library/react method. It's loading default props first, then props passed into rederComponent function
  return render(<Components {...defaultProps} {...props}>);
}

// in test we call it like
const {...methods from @testing-library/react} = renderComponent({propTwo: onClickHandler})
```
