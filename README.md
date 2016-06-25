npm-ng-annotate
================

Easily ports ng-annotate to be used as npm script


# Example

{
    "scripts" : {
        "ng:annotate" : "npm-ng-annotate"
    }
}


# Options

 * `-i` - the input file. a glob expression. read more on [globule](https://github.com/cowboy/node-globule).
          use comma to write multiple expressions
          default value is `*/**/*.js,!node_modules/**`

 * `-o` - the dest folder to write files to. default value is `.tmp/annotated`