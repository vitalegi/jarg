package it.vitalegi.jarg.spritesheet.maker.cmd;

import it.vitalegi.jarg.spritesheet.maker.model.Animation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SpritesheetJS {
    private final Logger log = LoggerFactory.getLogger(getClass());

    CmdRunner runner = new CmdRunner();

    public void generateSpritesheet(Animation animation) {
        var cmd = command(animation);
        log.info("Execute: {}", printable(cmd));
        var out = runner.execute(cmd);
        if (out.getExitCode() != 0) {
            throw new RuntimeException("Failed processing command with error " + out.getExitCode() + ": " + printable(cmd));
        }
    }

    protected String[] command(Animation animation) {
        var name = animation.getName();
        return new String[]{"spritesheet-js.cmd", "-f", "pixi.js", "-n", name, "--prefix", name, getPngsPath(animation)};
    }

    protected String printable(String[] cmd) {
        return String.join(" ", cmd);
    }

    protected String getPngsPath(Animation animation) {
        return animation.getDir().toFile().getPath() + "\\*.png";
    }

}
