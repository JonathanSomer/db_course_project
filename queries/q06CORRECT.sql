###### query 6 #####
# input:  none
# output:  events of the artist who has the highest average rating
# ordered by their popularity (limited for top 50)

# This query uses the view 'artists_avg_rate': 
# returns list of artist ids with their average star rating

SELECT 	event_name, event_type, popularity, age_res, event_url, event_date,
		venue_name, country AS venue_country, city AS venue_city,
		GROUP_CONCAT(artist_name) AS artists_list
FROM 	eventim,venues, artists,artists_events,
		(SELECT DISTINCT AE.event_id
		FROM 			artists_events AS AE,
						(SELECT artist_id 
						FROM artists_avg_rate
						WHERE avg_stars = (SELECT MAX(avg_stars) FROM artists_avg_rate)
						)AS highrate_artists
		WHERE AE.artist_id = highrate_artists.artist_id ) AS events_of_highrating
WHERE 	artists_events.event_id = events_of_highrating.event_id And
		artists_events.event_id = eventim.event_id And
		artists.artist_id = artists_events.artist_id And 
		venues.venue_id = eventim.venue_id And
		event_date >= CURDATE()
GROUP BY eventim.event_id
order by popularity desc
LIMIT 50