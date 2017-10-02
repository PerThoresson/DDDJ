class CDJ {
    private boolean master = false;
    private boolean onAir = false;
    private boolean playing = false;
    private String songName = "";
    private String artistName = "";

    public boolean isMaster() {
        return master;
    }

    public void setMaster(boolean master) {
        this.master = master;
    }

    public boolean isOnAir() {
        return onAir;
    }

    public void setOnAir(boolean onAir) {
        this.onAir = onAir;
    }

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public boolean isPlaying() {
        return playing;
    }

    public void setPlaying(boolean playing) {
        this.playing = playing;
    }

    @Override
    public String toString() {
        return "CDJ{" +
                "master=" + master +
                ", onAir=" + onAir +
                ", songName='" + songName + '\'' +
                ", artistName='" + artistName +
                '}';
    }
}
