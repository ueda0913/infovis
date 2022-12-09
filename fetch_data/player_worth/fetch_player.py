# 使用例:python3 fetch_player.py https://www.transfermarkt.jp/england/startseite/verein/3299

from bs4 import BeautifulSoup as bs
import requests
import csv
import sys
import re

header = {"User-Agent": "curl/7.85.0"}


url = sys.argv[1]
res = requests.get(url, headers=header)
content = res.text
# print(content)


pagehead = "https://www.transfermarkt.jp"
soup1 = bs(content, "lxml")
table = soup1.find_all("table", class_="items")

table = str(table)
soup2 = bs(table, "lxml")
info_tables = soup2.find_all("tr", class_=["even", "odd"])
# print(info_tables[1])

for i in range(1, len(info_tables)):
    info_tables[i] = str(info_tables[i])
    soup3 = bs(info_tables[i], "lxml")

    position_tag = soup3.find_all("td")
    print(position_tag[0].get("title"))

    name_tag = soup3.find_all("img")
    print(name_tag[0].get("alt"))

    url_tag = soup3.find_all("a")
    print(pagehead + url_tag[1].get("href"))

    image_tag = soup3.find_all("img")
    print(image_tag[0].get("data-src"))
