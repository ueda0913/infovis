#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No argument was specified."
    exit 1
fi

data=`curl $1 | grep series`
# data=`curl https://www.transfermarkt.jp/aaron-ramsdale/marktwertverlauf/spieler/427568 | grep series`
IFS=\[ arr=(${data})
data=${arr[2]}
IFS=\] arr=(${data})
data=${arr[0]}
echo \[ $data \]