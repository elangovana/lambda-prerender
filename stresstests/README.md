# Stress Tests
## Prerequisites
* Python3
* Deploy the lambda function on aws


## Setup
1. Setup python packages
```shell
git clone https://github.com/elangovana/lambda-prerender/
cd stresstests
pip install -r requirements.txt 
```

2. Set up AWS roles or profiles to execute the lambda roles

## Run load tests
1. Update the name of the lamda function name in config.ini
2. Update the list of urls to use for pre-rendering in urls_list.txt
3. Run locust
```shell
locust locust_stresstest.py
```
