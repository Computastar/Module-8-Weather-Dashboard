Server-Side APIs Challenge: Weather Dashboard

## Overview
To create a Weather Dashboard that fetches from a weather API and displays the current day's Temperature, Wind Speed and Humidity level. In addition, diplays a a 5-Day forcast below with the data fetched for the next 5 days.

In addition I added a 'Use Current Location' button. This uses the navigator.geolocation DOM api to get the current location of the calling machine. This is then passed to the Open Weather API, using the coordiates rather than the city as the above search uses.

I used the forecast query to retrieve the firat 6 days, this results in just one api call, then just used the list elements, so for the current day [0], and for the 5-day forecast [1-5]. The date returen is actually for 3 hour intevals, so inorder to limit to once per day, I just incremented the for by 8 (24/3=8).

I added some error checking from the data returned, to see if the city existed, if not I displayed a modal dialog. The code also will not add the city to the saaved city search if it is not found.


## How to use
Click on Search bar

Enter in City
Displays current weather forcast
Displays next 5-Days forcast

Search History Functions

Click on previous search to view again
Clear all weather data forcast

## Site Makeup
HTML (HyperText Markup Language)
CSS (Cascading Style Sheets)/ BootStrap
JS (JavaScript)

## Site
GitHub Public Repo
https://github.com/Mcnoor/Challenge-6-BC
GitHub Page Link
https://mcnoor.github.io/Challenge-6-BC/
images
