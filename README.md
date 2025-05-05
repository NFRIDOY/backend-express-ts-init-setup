# Installing

```bash 
npm init -y 
```
```bash
npm install express
npm install -D typescript
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
|-dist
    |-server.js  // after build
|-src
    |-app.ts
    |-server.ts
    |-app
        |-other Things
```

# Build
```bash
tsc
```

# Run
```bash
node ./dist/server.js
```
