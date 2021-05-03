#!/bin/bash
set -e

mongo <<EOF
use admin
db.createUser({
  user: '$MONGO_DB_USERNAME',
  pwd:  '$MONGO_DB_PASSWORD',
  roles: [
     { role: 'readWrite', db: '$MONGO_DB'}]
})

use kd
db.counter.insert({"key":"user","value":10000})

EOF