# url例：https://www.transfermarkt.jp/nick-rimando/profil/spieler/39434

from bs4 import BeautifulSoup as bs
import requests
import csv
import time
import re

header = {"User-Agent": "curl/7.85.0"}

error_csv_path = 'csv/errorplayer'
calc_worth_csv_path = 'csv/calcworth'

p = re.compile(r'\'y\':(\d+).*age\':\'(\d+).*datum_mw\':\'(\d+)')

def main():
    count = 0
    for year in['2013', '2009']:
        with open(error_csv_path + year + '.csv', encoding='utf8', newline='') as f:
            csvreader = csv.reader(f)
            with open(calc_worth_csv_path + year + '.csv', 'w', encoding='utf-8', newline='') as g:
                csvwriter = csv.writer(g)
                csvwriter.writerow(['name', 'country', 'position', 'image', 'worth', 'age'])
                for row in csvreader:
                    time.sleep(2) #2秒毎にスクレイピング
                    worth_info = calc_worth(row.pop(-1), year)
                    csvwriter.writerow(row+worth_info)
                    print(row[0])
                    count += 1
                    if count % 10 == 0:
                        print(count)

def calc_worth(url,year):
    beforefind = 0
    res = requests.get(url, headers=header)
    content = res.text
    info_included =  [line.rstrip() for line in content.split('\n') if 'series' in line][-2]
    info = [line for line in info_included.split('[')[5].split(']')[0].split('{') if 'verein' in line]
    WCyear = str(int(year) + 1) 
    for line in info:
        m = p.match(line)
        if m.group(3) < WCyear:
            beforefind = 1
            beforeworth = int(m.group(1))
            beforeage = int(m.group(2))
            beforeyear = int(m.group(3))
        if m.group(3) > WCyear:
            afteryear = int(m.group(3))
            afterworth = int(m.group(1))
            WCyear = int(WCyear)
            if beforefind:
                worth = round(((afteryear - WCyear) * beforeworth + (WCyear - beforeyear) * afterworth) / (afteryear - beforeyear))
                age = int(m.group(2)) - afteryear + WCyear
            else:
                worth = afterworth
                age = int(m.group(2)) - afteryear + WCyear
            return [worth, age]
    WCyear = int(WCyear)
    worth = beforeworth
    age = beforeage + WCyear - beforeyear
    return [worth, age]
        


if __name__ == "__main__":
    main()