# ImgProcessAPI
**Scripts Used :**
    "build": "npx tsc" >> building project
    "jasmine": "jasmine" >> running jasmine
    "test": "npm run build && npm run jasmine" >> building and running jasmine to test
    "start": "nodemon src/server"  >> running my api on the specified endpoints
    "lint": "eslint . --ext .ts", >> checking for errors using lint and prettier
    "lint-fix":"eslint . --ext .ts --fix", >> fixing errors aroused by lint
    "prettier": "prettier --config .prettierrc 'src/*.ts' --write", >> running prettier with its json config
    

**EndPoints :**
'/image'
then access image by URL parameters(name,width,height)
