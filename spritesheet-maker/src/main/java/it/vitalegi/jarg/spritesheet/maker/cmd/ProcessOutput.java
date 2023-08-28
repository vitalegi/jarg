package it.vitalegi.jarg.spritesheet.maker.cmd;

import java.util.List;

public class ProcessOutput {
    List<String> out;
    List<String> err;
    int exitCode;

    public ProcessOutput(int exitCode, List<String> out, List<String> err) {
        this.exitCode = exitCode;
        this.out = out;
        this.err = err;
    }

    public List<String> getErr() {
        return err;
    }

    public int getExitCode() {
        return exitCode;
    }

    public List<String> getOut() {
        return out;
    }
}
