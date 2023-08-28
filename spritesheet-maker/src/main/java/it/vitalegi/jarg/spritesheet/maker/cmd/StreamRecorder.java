package it.vitalegi.jarg.spritesheet.maker.cmd;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class StreamRecorder implements Runnable {

    InputStream inputStream;
    List<String> lines;

    public StreamRecorder(InputStream inputStream) {
        this.inputStream = inputStream;
        lines = new ArrayList<>();
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public List<String> getLines() {
        return lines;
    }

    @Override
    public void run() {
        new BufferedReader(new InputStreamReader(inputStream)).lines().forEach(lines::add);
    }
}