
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.client.model.DBCollectionUpdateOptions;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.Properties;

class DatabaseService {
    private DB connection;
    private String historyTableName;
    private String stateTableName;
    private String name;
    private int port;
    private String ip;

    DatabaseService() {
        this.readConfig();
        this.getConnection();
    }

    private void readConfig() {
        Properties prop = new Properties();
        InputStream input = null;

        try {
            input = new FileInputStream("src/main/resources/database.properties");
            prop.load(input);

            this.name = prop.getProperty("dbName");
            this.historyTableName = prop.getProperty("dbHistoryTable");
            this.stateTableName = prop.getProperty("dbStateTable");
            this.port = Integer.parseInt(prop.getProperty("dbPort"));
            this.ip = prop.getProperty("dbIP");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void getConnection() {
        MongoClient mongo = null;
        mongo = new MongoClient(this.ip, this.port);
        DB db = mongo.getDB(this.name);

        this.connection = db;
    }

    void updatePlayerState(BeatLinkPlayer player, int deviceNumber) {
        DBCollection stateTable = connection.getCollection(stateTableName);
        String devNum = "" + deviceNumber;
        BasicDBObject newDocument = new BasicDBObject();
        newDocument.put("deviceNumber", devNum);
        newDocument.put("title", player.getSongName());
        newDocument.put("artist", player.getArtistName());
        newDocument.put("onAir", player.isOnAir());
        newDocument.put("master", player.isMaster());
        newDocument.put("isPlaying", player.isPlaying());
        BasicDBObject searchQuery = new BasicDBObject().append("deviceNumber", devNum);
        DBCollectionUpdateOptions options = new DBCollectionUpdateOptions().upsert(true);

        stateTable.update(searchQuery, newDocument, options);
    }

    public void addSongToHistory(String artist, String title, long milliseconds, long timestamp) {
        DBCollection historyTable = connection.getCollection(historyTableName);
        BasicDBObject newDocument = new BasicDBObject();
        newDocument.put("title", title);
        newDocument.put("artist", artist);
        newDocument.put("start_time", "" + milliseconds);
        newDocument.put("timestamp", "" + timestamp);
        BasicDBObject searchQuery = new BasicDBObject().append(
                "title", title).append(
                        "artist", artist);
        DBCollectionUpdateOptions options = new DBCollectionUpdateOptions().upsert(true);

        historyTable.update(searchQuery, newDocument, options);
    }
}
