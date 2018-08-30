# Changelog
This changelog only lists major version changes (breaking), or minor changes important enough to list them here. Check individual releases (tags) and their commits to see unlisted changes.


### 4.0.0 (2018-08-30)

#### Upgrade to Babel 7
Babel has deprecated some packages, and has a new naming structure. This means that host packages need to be updated. See the [migration guide](https://babeljs.io/docs/en/v7-migration).

This...

```json
"plugins": [
    "plugin-transform-object-rest-spread"
],
"presets": [
    [
        "preset-env", {}
    ]
]
```

... becomes:

```json
"plugins": [
    "@babel/plugin-proposal-object-rest-spread"
],
"presets": [
    [
        "@babel/preset-env", {}
    ]
]
```

### 3.0.0 (2017-10-10)

#### Split up JavaScript into ES6 (ES2015+) and legacy versions
There are two seperate Babel config entries, and two bundle output entries. This means you can have a `main.js` file for evergreen browsers, alongside a `main-legacy.js` file which will serve older browsers. Additionally really old browser can be served a `no-js` version of the website.

#### Removed JavaScript minification
Uglify doesn't work wel with ES6 syntax, and `gulp-uglify` gave errors when running with newer JavaScript syntax (eg. async functions). Since all files should be served with `gzip` (or some newer form of compression) anyhow, this shouldn't hurt much.
A future release might add something like [babel-minify](https://github.com/babel/minify).

### 2.0.0 (2017-10-08)

Changed the way paths are listed in the revisioned manifest JSON file:

```json
  "main.js": "main-52d31ea9cb.js",
  "base.css": "base-26102c538a.css"
```

now becomes:

```json
  "scripts/modernizr.js": "scripts/modernizr-e8731e5942.js",
  "styles/base.css": "styles/base-26102c538a.css"
```

### 1.0.0 (2017-08-01)

Initial release.

### 0.1.0 (2016-07-08)

Hello world.
