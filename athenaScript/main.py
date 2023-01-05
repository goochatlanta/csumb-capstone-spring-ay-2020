import urllib.request
from urllib.error import HTTPError
import zipfile
import os
import boto3

def main():
    masterFile = "masterfilelist.txt"
    file = open(masterFile, "r")
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('dsag.gdelt')
    latestFileData = retrieveLatestS3File(bucket)
    if (latestFileData != None):
        latestFileData = latestFileData[-1].key.split('/')
        print("Lastest file name in S3 bucket has been retrieved: ", latestFileData)
        latestFileName = latestFileData[4]
    else:
        latestFileData = None
        print("No files are in the S3 bucket at the moment...")
        lastestFileName = None
    print("Retrieving Master File List from GDELT")
    urllib.request.urlretrieve("http://data.gdeltproject.org/gdeltv2/masterfilelist.txt", "masterfilelist.txt")
    print("Finished retrieving Master File List from GDELT")
    i = 0
    index = -1
    zipFile = ""

    if (latestFileData != None):
        with open(masterFile, 'r') as file:
            for i, line in enumerate(file):
                try:
                    if (latestFileName in line.split(" ")[2]):
                        index = i
                        break
                except IndexError as e:
                    pass

    with open(masterFile, 'r') as file:
        for i, line in enumerate(file):
            if (i > index):
                current = line.split(" ")
                try:
                    zipFile = downloadZipCSVFile(current[2])
                    if (zipFile != ""):
                        zipFileName = extractZipFile(zipFile)
                        year, month, day = getDateAndTime(current[2])
                        print("Currently downloading... ", zipFileName)
                        uploadToS3(s3, year, month, day, zipFileName)
                except IndexError as e:
                    pass
    file.close()

def downloadZipCSVFile(link):
    zipFileName = link[37:]
    try:
        urllib.request.urlretrieve(link, zipFileName)
    except HTTPError as err:
        if err.code == 404:
            print("Couldn't download file: ", zipFileName)
            return ""
    return zipFileName

def extractZipFile(zip):
    with zipfile.ZipFile(zip, 'r') as z:
        z.extractall()
    removeZipFile(zip)
    return zip[0:-5]

def getDateAndTime(fileName):
    year = fileName[37:41]
    if fileName[41:42]=="0":
        month = fileName[42:43]
    else:
        month = fileName[41:43]
    print ("month",month)
    if fileName[43:44]=="0":
        day = fileName[44:45]
    else:
        day = fileName[43:45]
    print("day",day)
    return year, month, day

def removeZipFile(file):
    try:
        os.remove(file)
    except OSError as e:
        print("Error: %s : %s" % (file, e.strerror))
def uploadToS3(s3, year, month, day, fileName):
    if (fileName[15:] == 'export.CSV'):
        foo_obj = s3.Object(bucket_name='dsag.gdelt', key='events/partition_year=' + year + '/partition_month=' + month + '/partition_day=' + day + '/' + fileName)
    elif (fileName[15:] == 'mentions.CSV'):
        foo_obj = s3.Object(bucket_name='dsag.gdelt', key='eventmentions/partition_year=' + year + '/partition_month=' + month + '/partition_day=' + day + '/' + fileName)
    elif (fileName[15:] == 'gkg.csv'):
        foo_obj = s3.Object(bucket_name='dsag.gdelt', key='gkg/partition_year=' + year + '/partition_month=' + month + '/partition_day=' + day + '/' + fileName)
    foo_obj.put(Body=open(fileName, 'rb'))
    removeZipFile(fileName)

def retrieveLatestS3File(bucket):
    obj = list(bucket.objects.all())
    '''
    for i in obj:
        print(i.key)
    '''
    return obj if (obj != []) else None

main()
