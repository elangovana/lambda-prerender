# Serverside pre-rendering with prerender.io on AWS Lambda
This is an example code for how to run prerender.io https://prerender.io with headless chrome to run pre-render a webpage on aws lambda

## To run on your local machine ( OsX)
#### Prerequisites 
* Chrome Version > 59
* NodeJs 8.11 https://nodejs.org/en/download/

#### Run
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

3. Lambda config or use the cloudformation template https://github.com/elangovana/lambda-prerender/blob/master/lambda_prender_cloudformation.cf.yaml
    * Handler : lambda.handler
    * Runtime : Nodejs 8.0
    * Memory  : Set at least 256 MB

4. Sample test input for lambda

    This sample prerenders the reactapp page https://ahfarmer.github.io/calculator/

    ```json
      {
      "url": "https://ahfarmer.github.io/calculator/"
      }
    ```
