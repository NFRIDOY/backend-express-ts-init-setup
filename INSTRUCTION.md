Error: 
[nodemon] starting `node ./dist/server.js`
[dotenv@17.2.1] injecting env (2) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
Error:  MongoServerError: bad auth : authentication failed
    at Connection.sendCommand (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connection.js:305:27)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async Connection.command (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connection.js:333:26)
    at async continueScramConversation (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\auth\scram.js:131:15)
    at async executeScram (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\auth\scram.js:80:5)
    at async ScramSHA1.auth (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\auth\scram.js:39:16)
    at async performInitialHandshake (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connect.js:104:13)
    at async connect (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connect.js:24:9) {
  errorLabelSet: Set(2) { 'HandshakeError', 'ResetPool' },
  errorResponse: {
    ok: 0,
    errmsg: 'bad auth : authentication failed',
    code: 8000,
    codeName: 'AtlasError'
  },
  ok: 0,
  code: 8000,
  codeName: 'AtlasError',
  connectionGeneration: 0
}
[nodemon] clean exit - waiting for changes before restart
PS D:\Noman\other\ph\backend-express-ts-init-setup> ^C
PS D:\Noman\other\ph\backend-express-ts-init-setup> ^C
PS D:\Noman\other\ph\backend-express-ts-init-setup> npm run start:dev

> backend-express-ts-init-setup@1.0.0 start:dev
> nodemon ./dist/server.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./dist/server.js`
[dotenv@17.2.1] injecting env (2) from .env -- tip: 📡 observe env with Radar: https://dotenvx.com/radar        
Error:  MongoServerError: bad auth : authentication failed
    at Connection.sendCommand (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connection.js:305:27)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async Connection.command (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connection.js:333:26)
    at async continueScramConversation (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\auth\scram.js:131:15)
    at async executeScram (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\auth\scram.js:80:5)
    at async ScramSHA1.auth (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\auth\scram.js:39:16)
    at async performInitialHandshake (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connect.js:104:13)
    at async connect (D:\Noman\other\ph\backend-express-ts-init-setup\node_modules\mongodb\lib\cmap\connect.js:24:9) {
  errorLabelSet: Set(2) { 'HandshakeError', 'ResetPool' },
  errorResponse: {
    ok: 0,
    errmsg: 'bad auth : authentication failed',
    code: 8000,
    codeName: 'AtlasError'
  },
  ok: 0,
  code: 8000,
  codeName: 'AtlasError',
  connectionGeneration: 0
}
[nodemon] clean exit - waiting for changes before restart

fix it