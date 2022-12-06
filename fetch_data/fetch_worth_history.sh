#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No argument was specified."
    exit 1
fi

# url例: https://www.transfermarkt.jp/aaron-ramsdale/profil/spieler/427568
data=`curl $1 | grep marktwertverlauf`
IFS=\" arr=(${data})
data=${arr[1]}
echo $data