# 2.3.0
## Code
- Use create-react-app for the `/dev_app/` testing page
    - This used to be located in `/dev/` and served with a complicated webpack setup
- Use yalc to build and test our library in `/dev_app/`
- Rewrite the testing page in typescript and with functional components
- Remove unmaintained dependency `react-hotkeys`

# 2.2.2
## Fix
- Add `allowFunctionEvaluation` prop to mitigate a security vulnerability
- Use [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) instead of [`eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) for function evaluation

# 2.2.0
## Feature
- Issue #7 (Thanks to Hawkpath for the idea) : inputElement and textareaElement can be a function that return dynamically element.
- Raw value from input and textarea element can be now parsed by an external function

# 2.1.0
## Fix
- Issue #6 : Forgot to change code in "update array" when switch to promise

## Feature
- Add a way to give logger to component to log "catch" promise error

# 2.0.0
## Code
- Various change to support React V16

# 1.7.0
## Code
- Add data in isCollapsed function

# 1.6.0
## Code
- Read only with function now

# 1.5.0
## Fix
- Fix ESLint errors and warning
- Demo works with IE

## Code
- Update webpack configurations
- Update Travis CI and Circle CI configuration

## Feature
- Add "before action" on Remove, Update and Add action

# 1.4.0
## Fix
- Fix variable name in add part
- Ignore circle.yml in npmignore

## Code
- Update scripts for npm
- Downgrade eslint plugin version (not working)

## Feature
- Before Remove Action function to perform remove action

# 1.3.1
## Fix
- Fix README for Github

## Code
- Fix Dependencies

# 1.3.0
## Feature
- Add way to pass plus and minus menu element
- Update Demo website to add custom inputs, ...

## Fix
- Test if focus exists before using it on inputs
- Add keywords on package.json

# 1.2.0
## Feature
- Add possibility to edit 'function'
- Add CircleCI build
- Add Node 7 in TravisCI
- Add CSS class on components
- Add 'clear' button on demo for updates

## Fix
- Fix render performance
- Fix focus error on readOnly mode

# 1.1.0
## Bug
- Fix reset to default in demo

## Feature
- Add possibility to give add, cancel, edit buttons and input by props

## Code
- Fix import : for js files, don't write '.js' in import
- Add new babel plugin (stage-0)

# 1.0.1
## Bug
- Fix filename extensions in dist
- Fix eslint conf for filenames

# 1.0.0
First release !
