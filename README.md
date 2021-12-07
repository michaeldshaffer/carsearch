# Overview
This little project is designed to flesh out using window.postMessage, specifically simulating a page from one domain returning a large data object to a page on another domain without using the querystring or a server side post.  This is some basic vanilla javascript, essentially no style and no attempt to really push the boundaries of the javascript world.  It is, quite simply, a silly little project.

# Setup
This demo assumes a setup of 2 domains:  xyz.com and carsearch.com.  There are many, many ways to accomplish this.  I used the base config of Apache that is included on every Mac (at least up to Big Sur/Mac OS 11.6).  See my notes [here](MACSETUP.md)

If you follow my setup or your own, you'll point the domain xyz.com to the content folder /xyz in this project.  Same goes for /carsearch.  The point of this simulation is that you have two domains, and two unique code bases.  In real life, these folders would be two separate projects, potentially managed by two completely unassociated teams.  Remember, this is just a quick demo/POC.

# What this does

# TODO's
