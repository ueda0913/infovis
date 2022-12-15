#url例：https://www.transfermarkt.jp/marcus-hahnemann/profil/spieler/4140

from bs4 import BeautifulSoup as bs
import requests
import csv
import time
import re

header = {"User-Agent": "curl/7.85.0"}

player_csv_path = 'csv/playerinfo'
worth_csv_path = 'csv/playerworth'

p = re.compile(r'\'y\':(\d+).*age\':\'(\d+).*datum_mw\':\'(\d+)')

def main():
    for year in['2021', '2017', '2013', '2009']:
        count = 0
        with open(player_csv_path + year + '.csv', encoding='utf8', newline='') as f:
            csvreader = csv.reader(f)
            csv_header = next(f)
            with open(worth_csv_path + year + '.csv', 'w', encoding='utf-8', newline='') as g:
                csvwriter = csv.writer(g)
                csvwriter.writerow(['name', 'country', 'position', 'image', 'worth', 'age'])
                for row in csvreader:
                    time.sleep(2) #2秒毎にスクレイピング
                    worth_info = get_worth(row.pop(-1), year)
                    csvwriter.writerow(row+worth_info)
                    count += 1
                    if count % 5 == 0:
                        print(count)

def get_worth(url,year):
    res = requests.get(url, headers=header)
    content = res.text
    info_included =  [line.rstrip() for line in content.split('\n') if 'series' in line][-2]
    # print(info_included)
    info = [line for line in info_included.split('[')[5].split(']')[0].split('{') if 'verein' in line]
    # print(info)

    for line in info:
        m = p.match(line)
        if m.group(3) == str(int(year) + 1):
            return [m.group(1), m.group(2)]


if __name__ == "__main__":
    main()
