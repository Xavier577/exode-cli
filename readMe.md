# Exode cli

Exode is a command-line utility for launching express typescript projects. There's also the option to use simple vanilla javascript. It assists with the initial configuration of things so that you, as the developer, may concentrate on development rather than the boring and repetitive setup for each new project. It is, however, non-opinionated, and you can use any ORM, Linter, or Library you like.

# Usage

```shell
Usage: exode [options] [command]

Options:
  -V, --version                 output the version number
  -h, --help                    display help for command

Commands:
  init [options] <projectname>
  help [command]                display help for command
```

# Examples

> Creating an express app project with Typescript (default behavior)

```
$ npx exode init appname
```

> To use Javascript Instead of Typescript

```
$ npx exode init appname -js
```

or

```
$ npx exode init appname --javascript
```
