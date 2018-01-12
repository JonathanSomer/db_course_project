def events_data():
	return {
		"events": [
			{
				"event_id": 12345,
				"event_name": "a string",
				"event_type": "string",
				"popularity": 0.25,
				"age_res": 18,
				"event_url": "www.event.com/this_event",
				"event_date": "0000-00-00",
				"venue_name": "a string",
				"venue_country": "france",
				"venue_city": "paris",
				"artist_name": [
					"jimi hendrix",
					"kurt kubain"
				],
				"artist_url": "www.artist.com/this_artist"
			},
					{
				"event_id": 12345,
				"event_name": "a string",
				"event_type": "string",
				"popularity": 0.25,
				"age_res": 18,
				"event_url": "www.event.com/this_event",
				"event_date": "0000-00-00",
				"venue_name": "a string",
				"venue_country": "france",
				"venue_city": "paris",
				"artist_name": [
					"jimi hendrix",
					"kurt kubain"
				],
				"artist_url": "www.artist.com/this_artist"
			},
			{
				"event_id": 12345,
				"event_name": "a string",
				"event_type": "string",
				"popularity": 0.25,
				"age_res": 18,
				"event_url": "www.event.com/this_event",
				"event_date": "0000-00-00",
				"venue_name": "a string",
				"venue_country": "france",
				"venue_city": "paris",
				"artist_name": [
					"jimi hendrix",
					"kurt kubain"
				],
				"artist_url": "www.artist.com/this_artist"
			}
		]
	}

'''
	Query 8:
	return artist's info
	route: http://localhost:5000/artist_info/jimi
'''
def artist_info():
	return {
	"artist_id": "sdf435iojf",
	"artist_name": "Jack Johnson",
	"artist_type": "person",
	"artist_origin_country": "US",
	"artist_genres_list": ["rock",
		"pop",
		"indie"
	]}


'''
  Query 9:
  return all urls for artist
  route: http://localhost:5000/urls/jimi
'''
def artist_urls():  
	return {
    "url_list": [
      {
        "type": "official hompage",
        "url": "homepage.com"
      },
      {
        "type": "official hompage",
        "url": "homepage.com"
      }
  ]}

'''
  Query 10:
  return all reviews for artist
  route: http://localhost:5000/reviews/jimi
'''
def artist_reviews(): 
	return {
	"reviews": [
      {
        "review_id": 1,
        "username": "a string",
        "artist_name": "a string",
        "review": "text -  string",
        "star_rating": 5
      },
      {
        "review_id": 1,
        "username": "a string",
        "artist_name": "a string",
        "review": "text -  string",
        "star_rating": 5
      }
  ]}
