#%%
import sys
import json
for line in sys.stdin.readlines():
    data = line.rstrip().split(',')
    for i in range(len(data)):
        data[i] = int(data[i])
    print(data)