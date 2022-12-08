#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No argument was specified."
    exit 1
fi

# url例: https://www.transfermarkt.jp/england/startseite/verein/3299
data=`curl $1 | grep -e "ゴールキーパー" -e "ディフェンダー" -e "ミッドフィールダー" -e "フォワード" | grep title`

python3 -c "import test; test.fetch_player_url($data)"


echo $data