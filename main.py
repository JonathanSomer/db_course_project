from flask import Flask, jsonify, json, render_template
from logging.config import dictConfig
from flask_cors import CORS
from flask_mysqldb import MySQL
import queries
import stub_data

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
    year, month = year_month.split('-')
    query = queries.top10_events(year, month)
    return jsonify({'events': serialized_results(query)})

###### query2 #####
# input:  month and year in integers: 2017, 5
# output: Which city has the largest number of genres in this month and year
# the output includes the city, the country and the number of genres
# if there is more then one result - return only one of them
# input arrives as: year-month
@app.route('/most_genre_city/<string:year_month>')
def most_genre_city(year_month):
	year, month = year_month.split('-')
	query = queries.most_genre_city(year, month)
	return jsonify(serialized_results(query))

###### query3 #####
# input:  month and year in integers: 2017, 5
# output: Which city has the largest number of events in this month and year
# if there is more then one result - return only one of them
@app.route('/most_events_city/<string:year_month>')
def most_events_city(year_month):
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
# which returns tuples of city,country,year(only the current year),month
# and number of events
@app.route('/high_season')
def high_season():
    return jsonify(serialized_results(queries.high_season()))

###### query 5 #####
# input:  artist name
# output: events where the performer has the same genre as this artist.
# ordered by their popularity (limited for top 50)
@app.route('/similar_artists_events/<string:artist>')
def similar_artists_events(artist):
    artist = decode(artist)
    query = queries.similar_artists_events(artist)
    return jsonify({'events': serialized_results(query)})

###### query 6 #####
# input:  none
# output:  events of the artist who has the highest average rating
# ordered by their popularity (limited for top 50)
# This query uses the view 'artists_avg_rate':
# returns list of artist ids with their average star rating
@app.route('/highest_rated_artist_events/')
def highest_rated_artist_events():
    return jsonify(serialized_results(queries.highest_rated_artist_events()))


# splitted with $
@app.route('/events_by_artist_review/<string:text_in_review>')
def events_by_artist_review(text_in_review):
    return jsonify(events_data)

### ARTIST PAGE: ###

'''
	Query 8:
	return artist's info
	route: http://localhost:5000/artist_info/jimi
'''
@app.route('/artist_info/<string:artist>')
def artist_info(artist):
	artist = decode(artist)
	return jsonify(stub_data.artist_info())

'''
  Query 9:
  return all urls for artist
  route: http://localhost:5000/urls/jimi
'''
@app.route('/urls/<string:artist>')
def artist_urls(artist):
	artist = decode(artist)
	return jsonify(stub_data.artist_urls())


'''
  Query 10:
  return all reviews for artist
  route: http://localhost:5000/reviews/jimi
'''
@app.route('/reviews/<string:artist>')
def artist_reviews(artist):
	artist = decode(artist)
	return jsonify(stub_data.artist_reviews())


'''
###########################
	HELPER FUNCTIONS
###########################
'''
def serialized_results(query):
	cur = mysql.connection.cursor()
	cur.execute(query)
	return( [dict((cur.description[i][0], value) for i, value in enumerate(row)) for row in cur.fetchall()] )

def decode(string):
	return " ".join(string.split("$"))
