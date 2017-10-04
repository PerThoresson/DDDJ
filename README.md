# DDDJ - 🏆🏆 Winning hack of Spotify Weekend Hack 2017 🏆🏆

## What is this?
This hack shows what songs that are currently playing at a pair of connected CDJ2000Nexus. By tapping in to the data being sent between CDJ2000Nexus players we can see what songs are currently being played. We fetch metadata about the tracks from the Spotify API which we use to show album art as well as to show statistics about the songs that has been played during the night.

_Live view_
![Live view](https://user-images.githubusercontent.com/3661913/31198540-f26414c6-a954-11e7-9bcc-128db422f934.png)

_Statistics view_
![Statistics view](https://user-images.githubusercontent.com/3661913/31198527-e95ef12a-a954-11e7-933a-b94dccfea169.png)

### ⚠️⚠️⚠️⚠️⚠️⚠️
We have not touched this code since the hack so it is not pretty. However, it is still kinda runnable 🤓

## Requirements
MongoDB

Node

Java

## Setup
Connect your Mac to a switch connected CDJ2000Nexus and DJM900Nexus.

Set environment variables `DDDJ_SPOTIFY_CLIENT_ID` and `DDDJ_SECRET_KEY`

run `make all`

run java project

Good to go, have fun!
