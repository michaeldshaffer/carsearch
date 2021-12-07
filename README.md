# Overview
This little project is designed to flesh out using window.postMessage, specifically simulating a page from one domain returning a large data object to a page on another domain without using the querystring or a server side post.

# Setup
This demo assumes a setup of 2 domains:  xyz.com and carsearch.com.  There are many, many ways to accomplish this.  I used the base config of Apache that is included on every Mac (at least up to Big Sur/Mac OS 11.6).  See my notes [here](MACSETUP.md)