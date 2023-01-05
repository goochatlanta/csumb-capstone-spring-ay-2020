# --------------------------------------------------------------------------- #

###
### Athena query example ###
###

import sys, os
import boto3
import time
import re

client = boto3.client('athena', region_name='us-east-2')

query_start = client.start_query_execution(
    QueryString = 'select count(*) from gdelt.events where partition_year=2017 and partition_month=10',
    QueryExecutionContext = {
        'Database': 'gdelt'
    }, 
    ResultConfiguration = { 'OutputLocation': 's3://aws-athena-query-results-dsag/results'}
)

execution_id = query_start['QueryExecutionId']
query_state = 'RUNNING'
exponential_backoff = 1  # seconds
while (query_state in ['RUNNING', 'QUEUED']):
    time.sleep(exponential_backoff)
    response = client.get_query_execution(QueryExecutionId = execution_id)
    if 'QueryExecution' in response and \
            'Status' in response['QueryExecution'] and \
            'State' in response['QueryExecution']['Status']:
        state = response['QueryExecution']['Status']['State']
        if state == 'FAILED':
            print("Query Failed:\n\n{}".format(response))
            sys.exit(0)
        elif state == 'SUCCEEDED':
            s3_path = response['QueryExecution']['ResultConfiguration']['OutputLocation']
            filename = re.findall('.*\/(.*)', s3_path)[0]
            print("Query Succeeded. Result written to {}".format(s3_path))
            break
    exponential_backoff *= 2

result = client.get_query_results(QueryExecutionId = execution_id)
print("The result is {}".format(result['ResultSet']['Rows'][1]['Data'][0]['VarCharValue']))
