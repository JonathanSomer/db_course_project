from flask import Flask,jsonify,json
from logging.config import dictConfig
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask import render_template



app = Flask(__name__)
CORS(app)

app.config.update(
	MYSQL_HOST='127.0.0.1',
	MYSQL_PORT=3306,
	MYSQL_DB='DbMysql03',
	MYSQL_PASSWORD='DbMysql03',
	MYSQL_USER='DbMysql03'
)
mysql = MySQL(app)


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

reviews = {
	"reviews": [
		{
			"stars_rating": 3,
			"review_text": "bla bla bla",
			"username": "a name"
		},
		{
			"stars_rating": 3,
			"review_text": "bla bla bla",
			"username": "a name"
		},
		{
			"stars_rating": 3,
			"review_text": "bla bla bla",
			"username": "a name"
		},
		{
			"stars_rating": 3,
			"review_text": "bla bla bla",
			"username": "a name"
		}
	]
}



@app.route('/')
def main_page():
    # cur = mysql.connection.cursor()
    # cur.execute('''SELECT * FROM artists LIMIT 10''')
    # rv = cur.fetchall()
    # return str(rv)
    return render_template('Home.html')

@app.route('/top_10/<int:month_number>')
def top_10_events_in_month_X(month_number):
    print('GET top 10 events in month %d' % (month_number,))
    return jsonify(events_data)

@app.route('/similar_artists_events/<string:artist>')
def similar_artists_events(artist):
    print('GET similar artists events %s' % (artist))
    return jsonify(events_data)

@app.route('/highest_rated_artist_events')
def highest_rated_artist_events():
    print('GET highest rated artist events')
    return jsonify(events_data)

@app.route('/events_by_artist_review/<string:text_in_review>')
def events_by_artist_review(text_in_review):
    print('GET events by artist review %s' % (text_in_review))
    return jsonify(events_data)

@app.route('/reviews_by_artist/<string:artist>')
def reviews_by_artist(artist):
    print('GET reviews by artist %s' % (artist))
    return jsonify(reviews)

@app.route('/most_genre_city/<int:month_number>')
def most_genre_city(month_number):
    print('GET most genre city in month: %d' % (month_number))
    return jsonify(city_data_genres)

@app.route('/most_events_city/<int:month_number>')
def most_events_city(month_number):
    print('GET most events city in month: %d' % (month_number))
    return jsonify(city_data)

@app.route('/high_season')
def high_season():
    print('GET high season')
    return jsonify(city_data)
