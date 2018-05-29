from locust import HttpLocust, TaskSet, task
import boto3
import configparser
from random import randint

class LambdaFunctionTaskSet(TaskSet):
    def __init__(self):
        self.client = boto3.client('lambda')
        self.config = configparser.ConfigParser()
        self.config.read('config.ini')
        self.lambda_function = self.config['lambda_function']
        with open('url_list.txt', 'r') as f:
            self.url_list = f.readlines()

    @task
    def test_prerender(self):
        i = randint(0, len(self.url_list)-1)
        payload = '{ url : "{}"}'.format(self.url_list[i])
        response = self.client.invoke(
            FunctionName= self.lambda_function,
            InvocationType='RequestResponse',
            LogType='None',
            ClientContext='string',
            Payload=payload
            Qualifier='string'
        )
        # TODO Complete response check..
        #
        # {
        #     'StatusCode': 123,
        #     'FunctionError': 'string',
        #     'LogResult': 'string',
        #     'Payload': StreamingBody(),
        #     'ExecutedVersion': 'string'
        # }


class MyLocust(Locust):
    task_set = LambdaFunctionTaskSet
    min_wait = 5000
    max_wait = 15000
