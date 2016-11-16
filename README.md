# gulp-until

This package evaluates a function until it returns `true` to go to the next pipe.  

> A true-ish return value like `1` or `{}` would *not* trigger the next pipe.  
> The function has to explicitly return `true` or `false`.

# Installation

```sh
$ npm install gulp-until --save-dev
```

```sh
$ yarn add gulp-until --dev
```

# Example Usage

Either pass a function directly:

```js
  return gulp.src(config.src)
    .pipe(until(() => {
      // Once this function returns true for the first time,
      // the next pipe is executed.
    }))
    .pipe(gulp.dest(config.dest));
```

Or also give gulp-util a custom time to wait between checks.  
`Default: 100`

```js
  return gulp.src(config.src)
    .pipe({
      wait: 800, // ms to wait between checks.
      check: function {
        // Again the evaluation function.
      }
    }))
    .pipe(gulp.dest(config.dest));
```
