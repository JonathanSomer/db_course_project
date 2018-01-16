from flask import Flask, jsonify, json, render_template, request, abort
from logging.config import dictConfig
from flask_cors import CORS
from flask_mysqldb import MySQL
import queries
import stub_data

app = Flask(__name__)
CORS(app)
app.config.from_envvar('SETTINGS')
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

@app.route('/SignUp')
def SignUp():
    return render_template('SignUp.html')

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
    return jsonify({'events': serialized_results(queries.highest_rated_artist_events())})


# text splitted with $
@app.route('/artists_by_name/<string:artist>')
def artists_by_name(artist):
	artist = decode(artist)
	return jsonify({'artists' : serialized_results(queries.artists_by_name(artist))})


'''
###########################
	  ARTIST PAGE:
###########################
'''

'''
	Query 8:
	return artist's info
	route: http://localhost:5000/artist_info/jimi
'''
@app.route('/artist_info/<string:artist>')
def artist_info(artist):
	artist = decode(artist)
	return jsonify(serialized_results(queries.artist_info(artist)))

'''
  Query 9:
  return all urls for artist
  route: http://localhost:5000/urls/jimi
'''
@app.route('/urls/<string:artist>')
def artist_urls(artist):
	artist = decode(artist)
	return jsonify(serialized_results(queries.artist_urls(artist)))


'''
  Query 10:
  return all reviews for artist
  route: http://localhost:5000/reviews/jimi
'''
@app.route('/reviews/<string:artist>')
def artist_reviews(artist):
	artist = decode(artist)
	return jsonify(serialized_results(queries.artist_reviews(artist)))



'''
###########################
	EDIT-CREATE-DELETE
	  REVIEW FLOW
###########################
'''

'''
	Create review:
  route: http://localhost:5000/create_review
'''
@app.route('/create_review', methods=['POST'])
def create_review():
	j = request.json
	auth = authenticate(j["username"], j["password"])
	if(auth["status"] != SUCCESS):
		return jsonify(auth)

	q = queries.create_review(j["review"]["artist_id"], 
							  j["username"], 
							  j["review"]["text"], 
							  j["review"]["rank"])
	execute(q)
	return jsonify(status(SUCCESS))

'''
	Edit review:
  route: http://localhost:5000/edit_review
'''
@app.route('/edit_review', methods=['POST'])
def edit_review():
	j = request.json
	auth = authenticate(j["username"], j["password"])
	if(auth["status"] != SUCCESS):
		return jsonify(auth)

	if (belongs_to_user(j["review"]["id"], j["username"])):
		q = queries.edit_review(j["review"]["id"], 
								  j["review"]["text"], 
								  j["review"]["rank"])
		execute(q)
	else:
		return jsonify(status("cannot edit other users reviews"))

	return jsonify(status(SUCCESS))

'''
	Delete review:
  route: http://localhost:5000/edit_review
'''
@app.route('/delete_review', methods=['POST'])
def delete_review():
	j = request.json
	auth = authenticate(j["username"], j["password"])
	if(auth["status"] != SUCCESS):
		return jsonify(auth)
		
	if (belongs_to_user(j["review"]["id"], j["username"])):
		q = queries.delete_review(j["review"]["id"])
		execute(q)
	else:
		return jsonify(status("cannot delete other users reviews"))

	return jsonify(status(SUCCESS))


def belongs_to_user(review_id, username):
	matches = serialized_results(queries.get_review(review_id))
	if(len(matches) == 0):
		return False
	else:
		fetched_review = matches[0]
		if (fetched_review["username"] == username):
			return True
		else: 
			return False


'''
###########################
		  USERS
###########################
'''
SUCCESS = "success"
NO_USER = "no such user"
WRONG_PASSWORD = "incorrect password"

def status(s):
	return {"status" : s}

'''
	Create user:
 	route: http://localhost:5000/create_user
'''
@app.route('/create_user', methods=['POST'])
def create_user():
	j = request.json
	username_taken = len(serialized_results(queries.get_user(j["username"]))) > 0
	if (not username_taken):
		execute(queries.create_user(j["username"], j["password"]))
		return jsonify(status(SUCCESS))
	else:
		return jsonify(status("username already taken"))

def authenticate(username, password):
	user_matches = serialized_results(queries.get_user(username))
	if (len(user_matches) == 0):
		return status(NO_USER)
	else:
		fetched_user = user_matches[0]
		if (password == fetched_user["password"]):
			return status(SUCCESS)
		else:
			return status(WRONG_PASSWORD)


'''
###########################
	HELPER FUNCTIONS
###########################
'''
def serialized_results(query):
	cur = mysql.connection.cursor()
	try:
		cur.execute(query)
		res = ( [dict((cur.description[i][0], value) for i, value in enumerate(row)) for row in cur.fetchall()] )
		cur.close()
		return res
	except:
		print("The following query has failed: ")
		print(query)
		print("WE ARE AWARE THAT PRINTING THE QUERY WOULD NOT BE A GOOD IDEA IN PRODUCTION")
		abort(400)

def execute(query):
	cur = mysql.connection.cursor()
	try:
		cur.execute(query)
		mysql.connection.commit()
		cur.close()
	except:
		print("The following query has failed: ")
		print(query)
		print("WE ARE AWARE THAT PRINTING THE QUERY WOULD NOT BE A GOOD IDEA IN PRODUCTION")
		abort(400)
		


def decode(string):
	return " ".join(string.split("$"))
