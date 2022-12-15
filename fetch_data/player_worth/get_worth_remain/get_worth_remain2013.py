#url例：https://www.transfermarkt.jp/marcus-hahnemann/profil/spieler/4140

from bs4 import BeautifulSoup as bs
import requests
import csv
import time
import re

header = {"User-Agent": "curl/7.85.0"}

player_csv_path = 'csv/playerinfo_remain'
worth_csv_path = 'csv/playerworth_remain'
error_csv_path = 'csv/errorplayer_ramain'
nodata_csv_path = 'csv/nodataplayer_remain'

p = re.compile(r'\'y\':(\d+).*age\':\'(\d+).*datum_mw\':\'(\d+)')

def main():
    year = '2013'
    count = 0
    with open(player_csv_path + year + '.csv', encoding='utf8', newline='') as f:
        csvreader = csv.reader(f)
        csv_header = next(f)
        with open(worth_csv_path + year + '.csv', 'w', encoding='utf-8', newline='') as g:
            csvwriter = csv.writer(g)
            csvwriter.writerow(['name', 'country', 'position', 'image', 'worth', 'age'])
            with open(error_csv_path + year + '.csv', 'w', encoding='utf-8' , newline='') as h:
                csvwriter_error = csv.writer(h)
                with open(nodata_csv_path + year + '.csv', 'w', encoding = 'utf-8', newline ='') as i:
                    csvwriter_nodata = csv.writer(i)
                    for row in csvreader:
                        time.sleep(2) #2秒毎にスクレイピング
                        worth_info = get_worth(row[-1], year)
                        if worth_info == -1:
                            csvwriter_nodata.writerow(row)
                        elif worth_info == 0:
                            csvwriter_error.writerow(row)
                        else:
                            row.pop(-1)
                            csvwriter.writerow(row+worth_info)
                        print(row[0])
                        count += 1
                        if count % 10 == 0:
                            print(count)

def get_worth(url,year):
    res = requests.get(url, headers=header)
    content = res.text
    if len([line.rstrip() for line in content.split('\n') if 'series' in line]) < 2:
        return -1
    info_included =  [line.rstrip() for line in content.split('\n') if 'series' in line][-2]
    # print(info_included)
    info = [line for line in info_included.split('[')[5].split(']')[0].split('{') if 'verein' in line]
    # print(info)
    WCyear = str(int(year) + 1)
    for line in info:
        m = p.match(line)
        if m.group(3) == WCyear:
            return [m.group(1), m.group(2)]
    return 0


if __name__ == "__main__":
    main()