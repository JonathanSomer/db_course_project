###### query2 #####
# input:  month and year
# output: Which city has the largest number of genres in this month and year
# the output includes the city, the country and the number of genres
# if there is more then one result - return only one of them

SELECT country,city,number_of_genres 
FROM
		(SELECT city,country,count(*) AS number_of_genres
		FROM
				(SELECT DISTINCT city,country,Genre
				FROM    eventim,
						artists_events,
						artist_genre,
						venues
				WHERE 	eventim.event_id = artists_events.event_id AND
						eventim.venue_id = venues.venue_id AND
						Month(eventim.event_date) = 10 AND
						Year(eventim.event_date) = 2018 AND
						artists_events.artist_id = artist_genre.artist_id) AS city_genre
		GROUP BY city,country) AS city_count_genres
WHERE number_of_genres = 
		(SELECT max(number_of_genres) 
		FROM
				(SELECT city,country,count(*) AS number_of_genres
				FROM
					(SELECT DISTINCT city,country,Genre
					FROM    eventim,
							artists_events,
							artist_genre,
							venues
					WHERE 	eventim.event_id = artists_events.event_id AND
							eventim.venue_id = venues.venue_id AND
							Month(eventim.event_date) = 10 AND
							Year(eventim.event_date) = 2018 AND
							artists_events.artist_id = artist_genre.artist_id) AS city_genre
				GROUP BY city,country) AS countGenres) 
LIMIT 1