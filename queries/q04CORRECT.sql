###### query 4 #####
# input:  none
# output: In which city and month can I attend the most events this year?
# the output includes the city, the country and the month and the current year
# if there is more then one result - return only one of them
#
# This query uses the view 'event_city_month': 
# which returns tuples of city,country,year(only the current year),month and number of events

SELECT	country,city,event_month,event_year 
FROM	event_city_month
WHERE num_of_events = 
		(SELECT max(num_of_events) 
		FROM event_city_month)
LIMIT 1