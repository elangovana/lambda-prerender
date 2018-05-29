# Sample Server Side Rendering using prerender.io
## Prerequisites
* NodeJs 8.11 https://nodejs.org/en/download/

## To run on your local machine ( OsX)
* Prerequisites require chrome installed
```console
git clone https://github.com/elangovana/lambda-prerender/
cd src
npm install
node server.js
curl http://localhost:3000/render?url=https://ahfarmer.github.io/calculator/
```
## As a lambda service
1. Build Package..
        
```console
git clone https://github.com/elangovana/lambda-prerender/
cd src
npm install
zip -r lambda_prender.zip .
```
2. Upload Package to S3

3. Lambda config or use the cloudformation template
    * Handler : lambda.handler
    * Runtime : Nodejs 8.0
    * Memory  : Set at least 256 MB

4. Sample test input for lambda

    This sample prerenders the reactapp page https://ahfarmer.github.io/calculator/

    
      {
      "url": "https://ahfarmer.github.io/calculator/"
      }
