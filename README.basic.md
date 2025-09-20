# Installing

```bash 
npm init -y 
```
```bash
npm install express
npm install -D typescript
npm i -D nodemon
npm i ts-node-dev
```
# Config TS
```bash
tsc --init
```
- "rootDir": "./src/",  
- "outDir": "./dist",

# Besic File Structure
```txt
|.env
|-dist // after build
    |-server.js  
|-src
    |-app.ts
    |-server.ts
    |-app
        |-other Things (e.g. modules, config, middleware, utils)
```

# Build
Besic
```bash
tsc
```
Or, build and watching
```bash
tsc -w
```
**\*Or,** install `ts-node-dev` use this package and copy paste this on the `script` on `package.json`
```
"dev": "ts-node-dev --respawn --transpile-only src/server.ts",
```
# Run
```bash
node ./dist/server.js
```
*Run
```bash
npm run dev
```

## Automation Build
```bash
tsc -w
```
## Automation Build
- package.json
```json
"scripts": {
    "start:dev": "nodemon ./dist/server.js",
  },
```
```bash
npm run start:dev
```
# Learning
