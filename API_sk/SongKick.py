import csv
import collections
from r_songkick import Songkick


def convert(data):
    if isinstance(data, basestring):
        return str(data.encode('latin1', 'ignore'))
    elif isinstance(data, collections.Mapping):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data


songkick = Songkick(api_key="eWgmcSaZs6M6PDzG")


# min_date = "2015-12-01"
# max_date = "2019-12-31"
# artist_name = '61993454'
# response = songkick.events.get(min_date=min_date, max_date=max_date, artist_id=artist_name)
# response = songkick.events.get(artist_name=artist_name)
# music__id = '8bfac288-ccc5-448d-9573-c33ea2aa5c30'
# response = songkick.artistsmbid_calendar.get(music__id)
# response = response['resultsPage']['results']['event']
# print response
# print response[0]['type']
# print response[0]['id']
# print response[0]['popularity']
# print response[0]['displayName']
# a = response[2]['location']
# print response[0]['start']
# print response[0]['start']['date']
# print response[0]['uri']




def getTablesFromArtistsFile():
    venues = set()
    events = set()
    events_ids = set()
    fa = open("artists_events.csv", "w")
    fb = open("events.csv", "w")
    fc = open("venues.csv", "w")
    fz = open("useless.csv", "w")
    fy = open("performers.csv", "w")
    wa = csv.writer(fa)
    wb = csv.writer(fb)
    wc = csv.writer(fc)
    wz = csv.writer(fz)
    wy = csv.writer(fy)
    fileA = open("A.csv", "r")
    wa.writerow(['artist_MB_id', 'event_id'])
    wb.writerow(['id', 'displayName', 'type', 'popularity', 'ageRestriction', 'venue_id', 'date', 'uri'])
    wc.writerow(['id', 'displayName', 'city', 'country'])
    performers_num = 0
    counter = 0
    # Repeat for each artist in the text file
    for line in fileA:
        try:
            music_brainz_id = line.strip()  # .decode("utf-8-sig").encode("utf-8")
            result = convert(songkick.artistsmbid_calendar.get(music_brainz_id))
            try:
                events_list = result['resultsPage']['results']['event']
                for event in events_list:
                    # update artist - event table
                    if not ((music_brainz_id, event['id']) in events_ids):
                        events_ids.add((music_brainz_id, event['id']))
                        wa.writerow([music_brainz_id, event['id']])
                    # update events table
                    if not (event['id'] in events):
                        events.add(event['id'])
                        age = event['ageRestriction']
                        if not age: age = 0
                        wb.writerow([event['id'], event['displayName'], event['type'], event['popularity'], age,
                                     event['venue']['id'], event['start']['date'], event['uri']])
                    # update venues table
                    if not (event['venue']['id'] in venues):
                        loc = event['location']['city'].split(',', 3)
                        city = loc[0]
                        country = loc[1]
                        country2 = None
                        try:
                            country2 = loc[2]
                        except:
                            pass
                        ven = event['venue']
                        venues.add(ven['id'])
                        wc.writerow([ven['id'], ven['displayName'], city, country, country2])
                wy.writerow([music_brainz_id])
                performers_num += 1
                print "Num of performers = ", str(performers_num)
            except:
                wz.writerow([music_brainz_id])
        except:
            wz.writerow([music_brainz_id])
        if counter % 500 == 0:
            print "Counter=", str(counter)
        counter += 1
    fileA.close()
    fa.close()
    fb.close()
    fc.close()
    fz.close()
    fy.close()


getTablesFromArtistsFile()
