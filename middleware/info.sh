#!/bin/bash

watch -n 0.5 "(date '+TIME:%H:%M:%S'; echo 'Server1' ; ping 192.168.0.11:3000; echo '' ;echo 'Server2' ; curl 192.168.0.7:3000 ; echo '') >> info.txt"
