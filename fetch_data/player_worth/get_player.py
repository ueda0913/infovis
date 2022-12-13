#url例：https://www.transfermarkt.jp/nation/startseite/verein/3379/saison_id/2021

from bs4 import BeautifulSoup as bs
import requests
import csv
import time

header = {"User-Agent": "curl/7.85.0"}

url_head = 'https://www.transfermarkt.jp/nation/startseite/verein/'
url_middle = '/saison_id/'
countryid_csv_path = 'csv/countryid'
player_csv_path = 'csv/playerinfo'

player_url_path = "https://www.transfermarkt.jp"

def main():
    for year in['2021', '2017', '2013', '2009']:
        with open(countryid_csv_path + year + '.csv', encoding='utf8', newline='') as f:
            csvreader = csv.reader(f)
            csv_header = next(f)
            with open(player_csv_path + year + '.csv', 'w', encoding='utf-8', newline='') as g:
                csvwriter = csv.writer(g)
                csvwriter.writerow(['name', 'country', 'position', 'image', 'playerpage'])
                for row in csvreader:
                    time.sleep(10) # 10秒毎にスクレイピング
                    url = url_head + row[1] + url_middle + year
                    players_info = get_player_info(url, row[0])
                    for info in players_info:
                        csvwriter.writerow(info)


def get_player_info(url, country):
    players_info = []
    res = requests.get(url, headers=header)
    content = res.text
    # print(content)

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
        position = position_tag[0].get("title")

        name_tag = soup3.find_all("img")
        name = name_tag[0].get("alt")

        url_tag = soup3.find_all("a")
        playerpage = player_url_path + url_tag[1].get("href")

        image_tag = soup3.find_all("img")
        image = image_tag[0].get("data-src")

        players_info.append([name, country, position, image, playerpage])

    return players_info



if __name__ == "__main__":
    main()
