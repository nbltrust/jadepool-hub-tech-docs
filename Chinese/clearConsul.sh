#!/usr/bin/env bash

ID=$(curl http://127.0.0.1:8500/v1/agent/services |jq -r  '.[].ID')

for var in $ID
do
  curl --request PUT http://127.0.0.1:8500/v1/agent/service/deregister/${var} 
  echo $var 
done

curl -X DELETE http://127.0.0.1:8500/v1/kv/\?recurse

echo done
