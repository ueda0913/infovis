#%%
from bs4 import BeautifulSoup as bs
import requests
import csv
import time
import re

header = {"User-Agent": "curl/7.85.0"}
url_ok = 'https://www.transfermarkt.jp/yuya-kubo/profil/spieler/186260'
# url_ng = 'https://www.transfermarkt.jp/keisuke-honda/profil/spieler/66521'
url_ng2 = 'https://www.transfermarkt.jp/nick-rimando/profil/spieler/39434'
content_ok = requests.get(url_ok, headers=header).text
# content_ng = requests.get(url_ng, headers=header).text
content_ng2 = requests.get(url_ng2, headers=header).text
#%%
print(content_ng2)
#%%
info_included_ok =  [line.rstrip() for line in content_ok.split('\n') if 'series' in line][-2]
# info_included_ng =  [line.rstrip() for line in content_ng.split('\n') if 'series' in line][-2]
info_included_ng2 =  [line.rstrip() for line in content_ng2.split('\n') if 'series' in line][-2]
print(info_included_ok)
print('******')
# print(info_included_ng)
print(info_included_ng2)
#%%
info_included = info_included_ng2
info = [line for line in info_included.split('[')[5].split(']')[0].split('{') if 'verein' in line]
print(info)
#%%
for line in info:
    p = re.compile(r'\'y\':(\d+).*age\':\'(\d+).*datum_mw\':\'(\d+).*')
    m = p.match(line)
    print([m.group(1), m.group(2), m.group(3)])


# %%
