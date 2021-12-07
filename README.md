# Overview
This little project is designed to flesh out using window.postMessage, specifically simulating a page from one domain returning a large data object to a page on another domain without using the querystring or a server side post.  This is some basic vanilla javascript, essentially no style and no attempt to really push the boundaries of the javascript world.  It is, quite simply, a silly little project.

# Setup
This demo assumes a setup of 2 domains:  xyz.com and carsearch.com.  There are many, many ways to accomplish this.  I used the base config of Apache that is included on every Mac (at least up to Big Sur/Mac OS 11.6).  See my notes [here](MACSETUP.md)

If you follow my setup or your own, you'll point the domain xyz.com to the content folder /xyz in this project.  Same goes for /carsearch connecting to the carsearch.com domain.  The point of this simulation is that you have two domains, and two unique code bases.  In real life, these folders would be two separate projects, potentially managed by two completely unassociated teams.  Remember, this is just a quick demo/POC.  One domain could be React, the other Angular...whatever the desired client technology.

# What this does
Here's the scenario:  you are a large organization with multiple properties/domains.  Your team creating the XYZ portal needs to allow their user to search for a new vehicle.  You have an existing car search web site, called carsearch.com.  Perfect!  Your UX team recommends that you just use the existing search infrastructure AND UX so you as the engineer just need to create a link to carsearch, allow the user to search and then a simple return button click takes your user back to xyz.com and MAGICALLY brings the search results along for the ride.  You are allowed to modify the functionality of the code on carsearch.com but the user experience is set and can not be just duplicated on xyz.com or exposed as a search api.

Hmmm....how is this going to happen?  The first solution would be to modify carsearch.com so that prior to returning back to xyz.com, the search results are pushed up to some service via a REST call.  This rest API would then return a unique id back to carsearch, which in turn would return this id back to xyz.com via the querystring.  Once safely back on xyz.com, there would be a REST call to retrieve these search results, and xyz.com would go about it's business.  That could work...

So why wouldn't it work?  Quite simply the "real" scenario that all of this is based on, had an additional limiter...the dreaded combination of the schedule and the available resources to build out the server side of this solution were not compatible...the only available resources were front-end engineers.

You then turn your attention to the querystring.  If you can send an id on the querystring, why not the search results themselves?  Here's the problem:  the search results size can not be accurately sized.  In our car search example, what if you searched for every car for sale in the whole country?  That would be 1000's of cars.  Depending on the browser, the size of the querystring is limited from 2000 to 40,000 characters.  There is no feasible way to limit the search results and therefore there is no way to insure that there won't be a nasty bug/problem.

So the solution this simulates is a third, fairly clever one with the following attributes:
* A hidden iframe is added to the xyz.com markup and it's source is set to carsearch.com.
* A small amount of code is added to carsearch.com that persists the search results to the browser localstorage.
* EventListerners are added to both xyz.com and carsearch.com to allow the use of window.postMessage.  This is the real power here.  Here is a general flow:

1. User clicks the search anchor tag on xyz.com, taking them to carsearch.com
2. User performs a carsearch, hopefully finding a bunch of cars.
3. User clicks return to xyz.com.  Before the browser changes pages, the search results are persisted to the browser's localstorage, under a known key and also for the specific carsearch.com domain.
4. Once back on xyz.com, a message is sent using window.postMessage to carsearch.com requesting that domain retrieve the information stored in localstorage.
5. Carsearch.com then sends this search result data back to xyz.com using window.postMessage
6. Xyz.com recieves the messsage with the string data, converts the string back to JSON and consumes the data per it's needs.

# TODO's
- [ ] It would be the right design to eliminate all the hard coded versions of domains/URLs and have them only pushed in by querystring or some sort of environment variable.
- [ ] Wouldn't hurt to do one of these in React/Angular/something...
- [ ] The carsearch.com single page should probably be split into a search page and a helper page that just handles the event listening/message sending.
