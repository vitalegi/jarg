package it.vitalegi.jarg.spritesheet.maker.model;

import java.nio.file.Path;
import java.util.List;

public class Animation {

    String name;
    Path dir;
    List<FrameData> frames;

    public Path getDir() {
        return dir;
    }

    public void setDir(Path dir) {
        this.dir = dir;
    }

    public List<FrameData> getFrames() {
        return frames;
    }

    public void setFrames(List<FrameData> frames) {
        this.frames = frames;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
