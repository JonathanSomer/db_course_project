from flask import Flask,jsonify,json
from logging.config import dictConfig
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask import render_template
import queries

print("******")
print(__name__)
app = Flask(__name__)
CORS(app)

app.config.update(
	MYSQL_HOST='127.0.0.1',
	MYSQL_PORT=3306,
	MYSQL_DB='DbMysql03',
	MYSQL_PASSWORD='DbMysql03',
	MYSQL_USER='DbMysql03'
)

print(app.config)
mysql = MySQL(app)
cur = mysql.connection.cursor()

# print(serialized_results(queries.top10_events(2017, 6)))

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

@app.route('/Reviews')
def Reviews():
    return render_template('Reviews.html')



'''
###########################
		  JSON
###########################
'''

###### query1 #####
# input:  month and year in integers: 2017, 5
# output: Top 10 most popular events in this year and month 
# ordered by their popularity 
# input arrives as: year-month
@app.route('/top_10/<string:year_month>')
def top_10_events(year_month):
    print('GET top 10 events in month %s' % (year_month,))
    year, month = year_month.split('-')
    query = queries.top10_events(year, month)
    return jsonify({'events' : serialized_results(query)})

###### query2 #####
# input:  month and year in integers: 2017, 5
# output: Which city has the largest number of genres in this month and year
# the output includes the city, the country and the number of genres
# if there is more then one result - return only one of them
# input arrives as: year-month
@app.route('/most_genre_city/<string:year_month>')
def most_genre_city(year_month):
	print('GET most genere city %s' % (year_month))
	year, month = year_month.split('-')
	query = queries.most_genre_city(year, month)
	return jsonify(serialized_results(query))

###### query3 #####
# input:  month and year in integers: 2017, 5
# output: Which city has the largest number of events in this month and year
# if there is more then one result - return only one of them
@app.route('/most_events_city/<string:year_month>')
def most_events_city(year_month):
    print('GET most events city in month: %s' % (year_month))
    year, month = year_month.split('-')
    query = queries.most_events_city(year, month)
    return jsonify(serialized_results(query))

###### query 4 #####
# input:  none
# output: In which city and month can I attend the most events this year?
# the output includes the city, the country and the month and the current year
# if there is more then one result - return only one of them
#
# This query uses the view 'event_city_month': 
# which returns tuples of city,country,year(only the current year),month and number of events
@app.route('/high_season')
def high_season():
    print('GET high season')
    return jsonify(serialized_results(queries.high_season))

###### query 5 #####
# input:  artist name
# output: events where the performer has the same genre as this artist.
# ordered by their popularity (limited for top 50)
@app.route('/similar_artists_events/<string:artist>')
def similar_artists_events(artist):
    print('GET similar artists events %s' % (artist))
    query = queries.similar_artists_events(artist)
    return jsonify(serialized_results(query))

###### query 6 #####
# input:  none
# output:  events of the artist who has the highest average rating
# ordered by their popularity (limited for top 50)
# This query uses the view 'artists_avg_rate': 
# returns list of artist ids with their average star rating
@app.route('/highest_rated_artist_events/')
def highest_rated_artist_events():
    print('GET highest rated artist events')
    return jsonify(serialized_results(queries.highest_rated_artist_events))







@app.route('/events_by_artist_review/<string:text_in_review>')
def events_by_artist_review(text_in_review):
    print('GET events by artist review %s' % (text_in_review))
    return jsonify(events_data)

@app.route('/reviews_by_artist/<string:artist>')
def reviews_by_artist(artist):
    print('GET reviews by artist %s' % (artist))
    return jsonify(reviews)

'''
###########################
	HELPER FUNCTIONS
###########################
'''
def serialized_results(query):
    cur.execute(query)
    return( [dict((cur.description[i][0], value) 
    			for i, value in enumerate(row)) for row in cur.fetchall()] )



'''
####################
   FOR DEBUGGING
###################
'''
# if __name__ == '__main__':
#     import argparse
#     parser = argparse.ArgumentParser(description='Development Server Help')
#     parser.add_argument("-d", "--debug", action="store_true", dest="debug_mode",
#                         help="run in debug mode (for use with PyCharm)", default=False)
#     parser.add_argument("-p", "--port", dest="port",
#                         help="port of server (default:%(default)s)", type=int, default=5000)

#     cmd_args = parser.parse_args()
#     app_options = {"port": cmd_args.port }

#     if cmd_args.debug_mode:
#         app_options["debug"] = True
#         app_options["use_debugger"] = False
#         app_options["use_reloader"] = False

#     app.run(**app_options)
