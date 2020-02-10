---
title: 'Week 6 - what did I learned'
date: '2020-02-08'
description: 'Week 6 and summary of what I learned.'
featuredImage: 'teacup-with-sliced-lemon-1772124.jpg'
featureImageDescription: 'Photo by Olenka Sergienko from Pexels'
---

# This week I learned

## devDependencies vs dependencies vs peerDependencies.

1. There is a huge difference between what is a devDependency, peerDependency and dependency in project. If application uses a library then:,

- peerDependency: if library has some other stuff in peerDependency, when said library is installed, it will show errors in console, when project using this library doesn't have its own installation of library that is present in peerDependency.

2. Difference between devDependency and dependency is: if something is dependency, it will be installed each time library that uses this dependency is installed. If application already uses the dependency, but in different version, it will install it twice, and the one that library uses
   will be installed in lib node_modules, not app modules. And library will use it's own dependency version, and application it's own. If multiple libraries uses same dependency, each will install it's own version.

## Babel and typescript

Typescript is not copying images when compiling the code. You can't compile typescript files and copy the rest of images/json etc. You have to use webpack for typescript and other files. If you can use Babel for typescript, babel has option --copy-files that will copy every file that wasn't compiled.

You can use typescript and babel for different stuff. Babel will transpile all files, and typescript could create typings files _tsc --emitDeclarationOnly_.

## Eslint

You can use overrides for changing everything for different files. Different settings for js, jsx or ts. It's not only rules, but everything.
