Sample Server Side Rendering using prerender.io

1) As an independent Server
- npm install
- node server.js
# Pre render a sample react app
- curl http://localhost:3000/render?url=https://ahfarmer.github.io/calculator/

2) As a lambda service
a) Build Package..
 - npm install
 - zip -r lambda_prender.zip .

b) Upload Package to S3

c) Lambda config
    -handler : lambda.handler
    - Runtime : Nodejs 8.0
    - Memory set at least 256 MB


d) Sample test input for lambda
This sample prerenders the reactapp page https://ahfarmer.github.io/calculator/
{
  "url": "https://ahfarmer.github.io/calculator/"
}
