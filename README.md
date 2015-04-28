Stream Flow
===========

##About

This app uses the USGS API the angular way

$http.get("http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + siteNumber + "&variable=00060,00065")

Simple way to look up favorite rivers. 

Enter in USGS's 8 digit site number, and the sight description and number persists to a Django data base. 

When the sight description that is retrieved from the database is clicked, an API call takes place and stream flow is returned.

##TODO

Users may login, create their own list of sites, and put watchers on the sites to know when they are at a certain level. 

##Setup 

