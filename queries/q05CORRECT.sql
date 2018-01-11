###### query 5 #####
# input:  artist name
# output: events where the performer has the same genre as this artist.
# ordered by their popularity (limited for top 50)

SELECT 	event_name, event_type, popularity, age_res, event_url, event_date,
		venue_name, country AS venue_country, city AS venue_city,
		GROUP_CONCAT(artist_name) AS artists_list
FROM 	eventim,venues, artists,artists_events,
		(SELECT DISTINCT AE.event_id
		FROM 	artists_events AS AE,
				(SELECT DISTINCT artists.artist_id
				FROM artists,artist_genre,
						(SELECT artist_genre.Genre
						FROM 	artists, artist_genre
						WHERE 	artists.artist_name = 'katy perry' AND
								artists.artist_id = artist_genre.artist_id) AS genres_of_artist
				WHERE 	artists.artist_id = artist_genre.artist_id AND 
						artist_genre.genre = genres_of_artist.Genre
				)AS artsits_alike
		WHERE 	AE.artist_id=artsits_alike.artist_id) AS events_alike
WHERE 	artists_events.event_id = events_alike.event_id AND
		eventim.event_id = artists_events.event_id AND
		artists.artist_id = artists_events.artist_id AND
		venues.venue_id = eventim.venue_id
GROUP BY eventim.event_id
ORDER BY popularity DESC
LIMIT 50