#!/usr/bin/env bash

ruby build.rb
ruby -run -e httpd . -p 6570
