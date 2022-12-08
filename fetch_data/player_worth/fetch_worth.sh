#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No argument was specified."
    exit 1
fi

# url例: https://www.transfermarkt.jp/aaron-ramsdale/profil/spieler/427568
# 使用例: bash fetch_worth.sh https://www.transfermarkt.jp/aaron-ramsdale/profil/spieler/427568 | python3 fetch_worth.py
link_worth_history=`curl $1 | grep marktwertverlauf`
IFS=\" arr=(${link_worth_history})
link_worth_history=${arr[1]}

data=`curl https://www.transfermarkt.jp$link_worth_history | grep series`

# echo$data

IFS=\[ arr=(${data})
data=${arr[2]}
IFS=\] arr=(${data})
data=${arr[0]}

echo $data | sed "s/,{'y/\n{'y/g" | sed -E "s/^\{\'y\':([0-9]+),.*\'age\':\'([0-9]+)\'.*\'datum_mw\':\'([0-9]+).*/\1,\2,\3/"