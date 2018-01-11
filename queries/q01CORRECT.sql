###### query1 #####
# input:  month and year
# output: Top 10 most popular events in this year and month 
# ordered by their popularity 

SELECT 	event_name, event_type, popularity, age_res, event_url, event_date,
		venue_name, country AS venue_country, city AS venue_city,
		GROUP_CONCAT(artist_name) AS artists_list
FROM	artists,
		artists_events,
		venues,
		(SELECT *
		FROM DbMysql03.eventim
		WHERE 	Month(event_date) = 2 AND
				Year(event_date) = 2018 AND
				event_date >= CURDATE()
		ORDER BY popularity desc
		LIMIT 10) AS top10
WHERE 	top10.event_id = artists_events.event_id AND
		artists.artist_id = artists_events.artist_id AND
		top10.venue_id = venues.venue_id
GROUP BY top10.event_id
ORDER BY popularity DESC