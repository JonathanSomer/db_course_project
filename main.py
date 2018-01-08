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




'''
###########################
		STATIC PAGES
###########################
'''
@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/Events')
def events():
    return render_template('Events.html')

@app.route('/Artists')
def artists():
    return render_template('Artists.html')

@app.route('/Locations')
def locations():
    return render_template('Locations.html')






'''
###########################
		  JSON
###########################
'''

'''
Query 1:
Top 10 most popular events in month X
route: http://127.0.0.1:5000/top_10/2018-7
 '''
@app.route('/top_10/<string:year_month>')
def top_10_events_in_month_X(year_month):
    print('GET top 10 events in month %s' % (year_month,))
    year, month = year_month.split('-')

    cur = mysql.connection.cursor()
    query = """
    	SELECT event_name, 
		       event_type, 
		       popularity, 
		       age_res, 
		       event_url, 
		       event_date, 
		       venue_name, 
		       country                   AS venue_country, 
		       city                      AS venue_city, 
		       Group_concat(artist_name) AS artists_list 
		FROM   artists, 
		       artists_events, 
		       venues, 
		       (SELECT * 
		        FROM   eventim 
		        WHERE  Month(event_date) = {} 
		               AND Year(event_date) = {} 
		        ORDER  BY popularity DESC 
		        LIMIT  10) AS top10 
		WHERE  top10.event_id = artists_events.event_id 
		       AND artists.artist_id = artists_events.artist_id 
		       AND top10.venue_id = venues.venue_id 
		GROUP  BY top10.event_id 
		ORDER  BY popularity DESC
    """.format(month, year)
    cur.execute(query)
    r = [dict((cur.description[i][0], value)
              for i, value in enumerate(row)) for row in cur.fetchall()]

    return jsonify({'events' : r})

@app.route('/similar_artists_events/<string:artist>')
def similar_artists_events(artist):
    print('GET similar artists events %s' % (artist))
    return jsonify(events_data)

@app.route('/highest_rated_artist_events/')
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



'''
###############
  FOR DEBUGGING
###############
'''
if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Development Server Help')
    parser.add_argument("-d", "--debug", action="store_true", dest="debug_mode",
                        help="run in debug mode (for use with PyCharm)", default=False)
    parser.add_argument("-p", "--port", dest="port",
                        help="port of server (default:%(default)s)", type=int, default=5000)
 
    cmd_args = parser.parse_args()
    app_options = {"port": cmd_args.port }
 
    if cmd_args.debug_mode:
        app_options["debug"] = True
        app_options["use_debugger"] = False
        app_options["use_reloader"] = False
 
    app.run(**app_options)
