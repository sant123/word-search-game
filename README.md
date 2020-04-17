# Word Search Game

Simple application to create and print your word search games using Yaml files.

# Installation

## npm
```bash
npm install word-search-game -g
```

## Yarn
```bash
yarn global add word-search-game
```

# Getting Started

* Create a Yaml file

Yaml files need to follow this structure:

```yml
title: Any title
words:
    - Word1
    - Word2
    - Word3
    - ...
```
* Open a terminal in the same Yaml directory.
* Call `word-search-game`, you will get a prompt of Yaml files that reside in the current directory.
* Select your file and wait till generation completes, after that it will open a browser with the game ready to be printed.
* A `generated` folder will be created with the word games with `.html` format.

## Another ways to call a Yaml file:

### File in current directory
```bash
word-search-game example.yml
```
### File in a relative path
```bash
word-search-game some-path/example.yml
```
In this case, `generated` folder will be created under `some-path`

That's it!

I highly recommend to create up to 15 words. This will fit perfectly in a `letter` sheet in landscape mode.

# How it works? 

This application is a wrapper of this [webpage](https://tools.atozteacherstuff.com/word-search-maker/wordsearch.php). Config like number of rows and columns can be set at `./lib/default-form-data.js`.

# Examples

From this Yaml file:

```yml
title: Astronomy
words:
  - Sun
  - Mercury
  - Venus
  - Earth
  - Mars
  - Jupiter
  - Saturn
  - Uranus
  - Neptune
  - Pluto
  - Moon
  - Stars
```

The game will look like this:

![](example.png)

# Contributing

If you think this project can be improved, create a PR! 

# License

[MIT](LICENSE)