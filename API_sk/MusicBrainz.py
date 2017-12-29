
import musicbrainzngs
import csv


def getDictionaryOfArtistsIDs(maxArtists):
    limit = 100
    offset = 0
    artists = []
    page = 1
    #print("fetching page number %d.." % page)
    result = musicbrainzngs.search_artists(ended="false", country="US", limit=limit)
    page_artists = result['artist-list']
    artists += page_artists
    if "artist-count" in result:
        count = result['artist-count']
    ##while len(page_artists) >= limit:
    while len(artists) < maxArtists:
        offset += limit
        page += 1
        #print("fetching page number %d.." % page)
        result = musicbrainzngs.search_artists(ended="false", country="US", limit=limit, offset=offset)
        page_artists = result['artist-list']
        artists += page_artists
    #print("")

    #for artist in artists:
        #print(u"{id}: {name}".format(id=artist['id'], name=artist["name"]))

    return artists

def getDictionaryOfArtistsDetails(artists):
    artistsInfo = []
    for artist in artists:
        artist_id = artist['id']
        try:
            result = musicbrainzngs.get_artist_by_id(artist_id, includes=["url-rels"])
        except musicbrainzngs.WebServiceError as exc:
            print("Something went wrong with the request: %s" % exc)
        else:
            artist = result["artist"]
            artistsInfo += artist
            print(artist)


def getArtistsIDsFromFile():
    ids = {}
    f = open("new.csv", "w")
    w = csv.writer(f)
    file = open("artists.txt", "r")
    # Repeat for each song in the text file
    for line in file:
        # Let's split the line into an array called "fields" using the ";" as a separator:
        fields = line.split(",")
        for name in fields:
            result = musicbrainzngs.search_artists(ended="false", artist=name)
            artist=result['artist-list'][0]
            if not(artist['id'] in ids):
                getArt = musicbrainzngs.get_artist_by_id(artist['id'], includes=["url-rels"])
                ids[artist['id']] = artist["name"]
                id = artist['id'].encode('ascii', 'ignore').decode('ascii')
                w.writerow([id, getArt])

    file.close()
    f.close()
    return ids

# Accessing a text file - www.101computing.net/mp3-playlist/

musicbrainzngs.set_useragent("events", 1.0)

myDict = getArtistsIDsFromFile()

# artists = getDictionaryOfArtistsIDs(300)
# artistsInfo = getDictionaryOfArtistsDetails(artists)
