from flask import Flask,jsonify,json
from logging.config import dictConfig
app = Flask(__name__)


events_data = {
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


city_data_genres = {
    "country": "france",
    "city": "paris",
    "month": "0000-00-00",
    "genres": [
        "pop",
        "rock",
        "metal"
    ]
}


city_data = {
    "country": "france",
    "city": "paris",
    "month": "0000-00-00"
}




@app.route('/')
def main_page():
    return "main page"

@app.route('/top_10/<int:month_number>')
def top_10_events_in_month_X(month_number):
    print('GET top 10 events in month %d' % (month_number,))
    return jsonify(events_data)

@app.route('/similar_artists_events/<string:artist>')
def similar_artists_events(artist):
    print('GET similar artists events %s' % (artist))
    return jsonify(events_data)


'''
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/')
def hello_world():
    return 'Hello, World!'
'''
