package it.vitalegi.jarg.spritesheet.maker.cmd;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class CmdRunner {
    private final Logger log = LoggerFactory.getLogger(getClass());

    public ProcessOutput execute(String... command) {
        try {
            return doExecute(command);
        } catch (InterruptedException | IOException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    protected ProcessOutput doExecute(String... command) throws ExecutionException, InterruptedException, IOException {
        log.debug("Start process for {}", String.join(" ", command));
        Process process = new ProcessBuilder(command).start();
        var stdOut = new StreamRecorder(process.getInputStream());
        var stdErr = new StreamRecorder(process.getErrorStream());
        Future<?> futureOut = Executors.newSingleThreadExecutor().submit(stdOut);
        Future<?> futureErr = Executors.newSingleThreadExecutor().submit(stdErr);
        int exitCode = process.waitFor();
        log.debug("Process is completed");
        if (exitCode != 0) {
            log.error("Completed with exit code {}, command {}", exitCode, String.join(" ", command));
        }
        futureOut.get();
        if (!stdOut.getLines().isEmpty()) {
            stdOut.getLines().forEach(log::info);
        }
        futureErr.get();
        if (!stdErr.getLines().isEmpty()) {
            stdErr.getLines().forEach(log::error);
        }
        return new ProcessOutput(exitCode, stdOut.getLines(), stdErr.getLines());
    }

}
