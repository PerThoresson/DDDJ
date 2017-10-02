
import org.deepsymmetry.beatlink.*;
import org.deepsymmetry.beatlink.data.*;

import java.net.SocketException;
import java.util.*;

class CDJWatcherService {

    private HashMap<Integer, CDJ> playerState = new HashMap<>();
    private DatabaseService database;

    void startService() throws InterruptedException {
        database = new DatabaseService();

        try {
            DeviceFinder.getInstance().start();
        } catch (SocketException e) {
            e.printStackTrace();
        }
        // Need to find all devices before moving forward
        System.out.println("Finding devices..");
        Thread.sleep(3000);

        Set<DeviceAnnouncement> devices = DeviceFinder.getInstance().getCurrentDevices();

        boolean cdjs[] = {false, false, false, false};

        devices.forEach(deviceAnnouncement -> {
            if (deviceAnnouncement.getName().startsWith("C")) { // Is CDJ
                playerState.put(deviceAnnouncement.getNumber(), new CDJ());
                cdjs[deviceAnnouncement.getNumber()-1] = true;
            }
        });

        int virtualCdjNumber = 0;
        for (int i=0; i<cdjs.length; i++) {
            if (!cdjs[i]) {
                virtualCdjNumber = i+1;
                break;
            }
            if (i == cdjs.length-1) {
                throw new IllegalStateException("Could not find a device number to grab, exiting");
            }
        }

        System.out.println("Setting up virtual CDJ with device number " + virtualCdjNumber);
        VirtualCdj.getInstance().setDeviceNumber((byte) virtualCdjNumber);

        try {
            VirtualCdj.getInstance().start();
        } catch (SocketException e) {
            e.printStackTrace();
        }
        Thread.sleep(1000);
        System.out.println("Virtual CDJ started");

        try {
            MetadataFinder.getInstance().start();
        } catch (Exception e) {
            e.printStackTrace();
        }
        Thread.sleep(1000);
        System.out.println("MetadataFinder started");

        try {
            TimeFinder.getInstance().start();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("TimeFinder started");

        MetadataFinder.getInstance().addTrackMetadataListener(new TrackMetadataListener() {

            public void metadataChanged(TrackMetadataUpdate update) {
                if (update != null && update.metadata != null) {
                    CDJ currentState = playerState.get(update.player);

                    String newArtist = update.metadata.getArtist().label;
                    String newTitle = update.metadata.getTitle();
                    String oldArtist = currentState.getArtistName();
                    String oldTitle = currentState.getSongName();

                    boolean artistChanged = !oldArtist.equals(newArtist);
                    boolean titleChanged = !oldTitle.equals(newTitle);

                    if (artistChanged || titleChanged) {
                        System.out.println("Updating state for new song on device " + update.player);

                        // Update local state
                        currentState.setArtistName(newArtist);
                        currentState.setSongName(newTitle);

                        // Call DB with updated state
                        database.updatePlayerState(currentState, update.player);
                        System.out.println("New song state is: " + newArtist + " - " + newTitle);

                        long milliseconds = TimeFinder.getInstance().getLatestPositionFor(update.player).milliseconds;
                        if (oldArtist != "" && oldTitle != "") {
                            database.addSongToHistory(oldArtist, oldTitle, milliseconds, new Date().getTime());
                        }
                    }
                }
            }
        });

        VirtualCdj.getInstance().addUpdateListener(new DeviceUpdateListener() {
            @Override
            public void received(DeviceUpdate deviceUpdate) {
                if (deviceUpdate instanceof CdjStatus) {
                    CDJ currentState = playerState.get(deviceUpdate.getDeviceNumber());

                    String artist = currentState.getArtistName();
                    String title = currentState.getSongName();

                    if (artist.isEmpty() || title.isEmpty()) {
                        return;
                    }

                    boolean masterChanged = currentState.isMaster() != deviceUpdate.isTempoMaster();
                    boolean onAirChanged = currentState.isOnAir() != ((CdjStatus) deviceUpdate).isOnAir();
                    boolean isPlayingChanged = currentState.isPlaying() != ((CdjStatus) deviceUpdate).isPlaying();

                    if (masterChanged || onAirChanged || isPlayingChanged) {
                        System.out.println("Updating state for device " + deviceUpdate.getDeviceNumber());
                        currentState.setMaster(deviceUpdate.isTempoMaster());
                        currentState.setOnAir(((CdjStatus) deviceUpdate).isOnAir());
                        currentState.setPlaying(((CdjStatus) deviceUpdate).isPlaying());

                        // Call DB with updated state
                        if (masterChanged) System.out.println("Master changed to " + deviceUpdate.isTempoMaster());
                        if (onAirChanged) System.out.println("On air changed to " + ((CdjStatus) deviceUpdate).isOnAir());
                        if (isPlayingChanged) System.out.println("Playing changed to " + ((CdjStatus) deviceUpdate).isPlaying());
                        database.updatePlayerState(currentState, deviceUpdate.getDeviceNumber());
                    }
                }
            }
        });
    }
}
