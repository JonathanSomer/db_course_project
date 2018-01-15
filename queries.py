###### query1 #####
# input:  month and year in integers: 2017, 5
# output: Top 10 most popular events in this year and month 
# ordered by their popularity 
def top10_events(year, month):
	return """
		SELECT 	event_name, event_type, popularity, age_res, event_url, event_date,
				venue_name, country AS venue_country, city AS venue_city,
				GROUP_CONCAT(artist_name) AS artist_name
		FROM	artists,
				artists_events,
				venues,
				(SELECT *
				FROM DbMysql03.eventim
				WHERE 	Month(event_date) = {month} AND
						Year(event_date) = {year} AND
						event_date >= CURDATE()
				ORDER BY popularity desc
				LIMIT 10) AS top10
		WHERE 	top10.event_id = artists_events.event_id AND
				artists.artist_id = artists_events.artist_id AND
				top10.venue_id = venues.venue_id
		GROUP BY top10.event_id
		ORDER BY popularity DESC
		""".format(month = month, year = year)



###### query2 #####
# input:  month and year in integers: 2017, 5
# output: Which city has the largest number of genres in this month and year
# the output includes the city, the country and the number of genres
# if there is more then one result - return only one of them
def most_genre_city(year, month):
	return """
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
								Month(eventim.event_date) = {month} AND
								Year(eventim.event_date) = {year} AND
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
									Month(eventim.event_date) = {month} AND
									Year(eventim.event_date) = {year} AND
									artists_events.artist_id = artist_genre.artist_id) AS city_genre
						GROUP BY city,country) AS countGenres) 
		LIMIT 1
		""".format(month = month, year = year)


###### query3 #####
# input:  month and year in integers: 2017, 5
# output: Which city has the largest number of events in this month and year
# if there is more then one result - return only one of them
def most_events_city(year, month):
	return """
		SELECT country,city
		FROM
				(SELECT city,country,count(*) AS num_of_events
				FROM    eventim,
						venues
				WHERE   eventim.venue_id = venues.venue_id AND
						Month(eventim.event_date) = {month} AND
						Year(eventim.event_date) = {year}
				GROUP BY city,country) AS event_city
		WHERE num_of_events = 
				(SELECT max(num_of_events)
				FROM
					(SELECT city,country,count(*) AS num_of_events
					FROM    eventim,
							venues
					WHERE   eventim.venue_id = venues.venue_id AND
							Month(eventim.event_date) = {month} AND
							Year(eventim.event_date) = {year}
					GROUP BY city,country) AS event_city)
		LIMIT 1
		""".format(month = month, year = year)


###### query 4 #####
# input:  none
# output: In which city and month can I attend the most events this year?
# the output includes the city, the country and the month and the current year
# if there is more then one result - return only one of them
#
# This query uses the view 'event_city_month': 
# which returns tuples of city,country,year(only the current year),month and number of events
def high_season():
	return """
		SELECT	country,city,event_month,event_year 
		FROM	event_city_month
		WHERE num_of_events = 
				(SELECT max(num_of_events) 
				FROM event_city_month)
		LIMIT 1
		"""

###### query 5 #####
# input:  artist name
# output: events where the performer has the same genre as this artist.
# ordered by their popularity (limited for top 50)
def similar_artists_events(artist_string):
	return """
		SELECT 	event_name, event_type, popularity, age_res, event_url, event_date,
				venue_name, country AS venue_country, city AS venue_city,
				GROUP_CONCAT(artist_name) AS artist_name
		FROM 	eventim,venues, artists,artists_events,
				(SELECT DISTINCT AE.event_id
				FROM 	artists_events AS AE,
						(SELECT DISTINCT artists.artist_id
						FROM artists,artist_genre,
								(SELECT artist_genre.Genre
								FROM 	artists, artist_genre
								WHERE 	artists.artist_name = {artist_string} AND
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
		""".format(artist_string = "\'" + artist_string + "\'")

###### query 6 #####
# input:  none
# output:  events of the artist who has the highest average rating
# ordered by their popularity (limited for top 50)

# This query uses the view 'artists_avg_rate': 
# returns list of artist ids with their average star rating
def highest_rated_artist_events():
	return """
		SELECT 	event_name, event_type, popularity, age_res, event_url, event_date,
				venue_name, country AS venue_country, city AS venue_city,
				GROUP_CONCAT(artist_name) AS artist_name
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
		"""

'''
###########################
		  USERS
###########################
'''

# create new-user
# input: username and password
def create_user(username, password):
	return """
	insert into users (username, password) values ({username_s}, {password_s});
	""".format(username_s = "\'" + username + "\'", password_s = "\'" + password + "\'" )

#select user
# input: username
# output: username+passord
def get_user(username):
	return """
	select * from users where users.username = {username_s};
	""".format(username_s = "\'" + username + "\'")


'''
###########################
	EDIT-CREATE-DELETE
	  REVIEW FLOW
###########################
'''

#insert review - (artistId,username,review)
#input: artistId, username, review text
def create_review(artist_id, username, text, star_rating):
	return """
	insert into reviews (artist_id, username, user_review,star_rating) values ({artist_id_s},{username_s},{text_s},{star_rating_s});	
	""".format(
		artist_id_s = "\'" + artist_id + "\'",
		username_s = "\'" + username + "\'",
		text_s = "\'" + text + "\'",
		star_rating_s = star_rating)

#edit review - (artistId,username,review)
#input: artistId, username, review text
def edit_review(review_id, text, star_rating):
	return """
	update reviews set user_review = {text_s},star_rating = {star_rating_s} where review_id = {review_id_s}	
	""".format(
		review_id_s = review_id,
		text_s = "\'" + text + "\'",
		star_rating_s = star_rating)


def get_review(review_id):
	return """
		select review_id,username from reviews where review_id = {review_id_s}
	""".format(review_id_s = review_id)

def delete_review(review_id):
	return """
		delete from reviews where review_id = {review_id_s}
	""".format(review_id_s = review_id)


'''
###########################
	  ARTIST PAGE:
###########################
'''

#artist information
# input: artist name
# output: id ,name, origin_country, type, artist genres list 
def artist_info(artist):
	return """
	SELECT 	artists.artist_id ,artist_name,artist_origin_country,artist_type,group_concat(genre) as artist_genres_list 
	FROM 	artists,artist_genre
	where 	artist_name = {artist_string} And artists.artist_id = artist_genre.artist_id 
	group by artist_genre.artist_id
	""".format(artist_string = "\'" + artist + "\'")


# select artist urls
# input: artist name
# output - artist urls by url type
def artist_urls(artist):
	return """
	select  url_type as type,artist_url.artist_url
	from	artist_url,artists
	where	artist_name = {artist_string} And artists.artist_id = artist_url.artist_id
	group by url_type
	""".format(artist_string = "\'" + artist + "\'")




# select artist reviews
# input: artist name
# output - all artist reviews
def artist_reviews(artist):
	return """
	SELECT 	review_id ,username,artist_name,user_review as review, star_rating
	from	artists,reviews
	where	artists.artist_id = reviews.artist_id And artist_name = {artist_string}
	order by review_id desc
	""".format(artist_string = "\'" + artist + "\'")



