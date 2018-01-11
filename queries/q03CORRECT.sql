###### query3 #####
# input:  month and year
# output: Which city has the largest number of events in this month and year
# if there is more then one result - return only one of them

SELECT country,city
FROM
		(SELECT city,country,count(*) AS num_of_events
		FROM    eventim,
				venues
		WHERE   eventim.venue_id = venues.venue_id AND
				Month(eventim.event_date) = 9 AND
				Year(eventim.event_date) = 2018
		GROUP BY city,country) AS event_city
WHERE num_of_events = 
		(SELECT max(num_of_events)
		FROM
			(SELECT city,country,count(*) AS num_of_events
			FROM    eventim,
					venues
			WHERE   eventim.venue_id = venues.venue_id AND
					Month(eventim.event_date) = 9 AND
					Year(eventim.event_date) = 2018
			GROUP BY city,country) AS event_city)
LIMIT 1