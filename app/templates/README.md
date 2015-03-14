# RESTful api

This project was scaffolded with  
https://github.com/PatrickWolleb/generator-koa-rest  

Please use the Yeoman generator to create new resources. e.g.  
```bash
yo koa-rest:resource cars
```

## Install  

```bash
git clone git@github.com:SHMEDIALIMITED/ninja-api.git  
npm install  
```

## Develop   

There are several npm scripts available:    

### Nodemon and local config  
This will override the default configuration with the config in src/config/environment/local.js.  
Note : This file is git-ignored - you will have to copy the development.js config.  
```bash
npm run local
```

### Mocha test live-reloaded
This is very handy to force you to write tests upfront because then you will have no need to use postman anymore. Run this in parallel shell.    
```bash
npm run test-mocha-watch
```

### Dev with debug flag  
This is handy to run in a dev environment that exposes the debugger for remote access.   
```bash
npm run start-dev
```

### Test all
Full test script running jshint and mocha tests. This should be run on the CI server. 
```bash
npm test
```

### Prodcution
Production script loads production.js config.  
```bash
npm start
```


## License

Copyright (c) 2015 Patrick Wolleb  
Licensed under the MIT license.
