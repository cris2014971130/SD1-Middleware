#!/bin/bash

watch -n 0.5 "(date '+TIME:%H:%M:%S'; echo 'Server1' ; curl --connect-timeout 5 192.168.0.11:3000; echo '' ;echo 'Server2' ; curl  --connect-timeout 5 192.168.0.12:4000; echo '') >> info.txt"
