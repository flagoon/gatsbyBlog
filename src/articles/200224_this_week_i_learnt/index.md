---
title: 'Week 8 - what did I learned'
date: '2020-02-24'
description: 'Week 8 and summary of what I learned.'
featuredImage: 'bright-countryside-dawn-daylight-302804.jpg'
---

# This week I learned

## Typescript and babel

More to see in week 6 entry, but rootDir determines what files typescript will check (for example for typings). It's important that babel _source_ path is the same as rootDit. Then all typescript files will be in correct folders.

## OrderedMap's and Map's from immutable

I learnt hard way, that calling Map's or OrderedMap's with _new_ keyword will create problems with prop-types. Error says: _type of OrderedMap is different that instance of OrderedMap_ or something like this. Be careful.
