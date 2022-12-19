#%%
from bs4 import BeautifulSoup as bs
import requests
import csv
import time

header = {"User-Agent": "curl/7.85.0"}

player_url_path = "https://www.transfermarkt.jp"

url = 'https://www.transfermarkt.jp/%E3%83%95%E3%83%A9%E3%83%B3%E3%82%B9/startseite/verein/3377/saison_id=2013'
res = requests.get(url, headers=header)
content = res.text
# %%
players_info = []
soup1 = bs(content, "lxml")
table = soup1.find_all("table", class_="items")

table = str(table)
soup2 = bs(table, "lxml")
info_tables = soup2.find_all("tr", class_=["even", "odd"])

for i in range(1, len(info_tables)):
    info_tables[i] = str(info_tables[i])
    soup3 = bs(info_tables[i], "lxml")

    position_tag = soup3.find_all("td")
    position = position_tag[0].get("title")

    name_tag = soup3.find_all("img")
    name = name_tag[0].get("alt")

    url_tag = soup3.find_all("a")
    playerpage = player_url_path + url_tag[1].get("href")

    image_tag = soup3.find_all("img")
    image = image_tag[0].get("data-src")

    print(name, 'フランス', position, image)
    print(playerpage)

# %%
