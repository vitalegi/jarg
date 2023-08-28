package it.vitalegi.jarg.spritesheet.maker;

import com.madgag.gif.fmsware.GifDecoder;
import it.vitalegi.jarg.spritesheet.maker.cmd.SpritesheetJS;
import it.vitalegi.jarg.spritesheet.maker.model.Animation;
import it.vitalegi.jarg.spritesheet.maker.model.FrameData;
import it.vitalegi.jarg.spritesheet.maker.util.FileUtil;
import it.vitalegi.jarg.spritesheet.maker.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Gif2Spritesheet {

    private static final Logger log = LoggerFactory.getLogger(Gif2Spritesheet.class);

    Path source;
    Path target;

    SpritesheetJS spritesheetJS = new SpritesheetJS();

    public Gif2Spritesheet(Path source, Path target) {
        this.source = source;
        this.target = target;
    }

    public static void main(String[] args) {
        if (args.length < 2) {
            throw new IllegalArgumentException("Expected 2 arguments: path/to/file.dsl path/to/out/dir/");
        }
        var source = Path.of(args[0]);
        var target = Path.of(args[1]);

        log.info("Source: {}", source);
        log.info("Target: {}", target);
        new Gif2Spritesheet(source, target).run();

    }

    public void run() {
        var sources = getSources();
        sources.forEach(source -> {
            var frames = gif2pngs(source);
            var animation = animation(source, frames);
            //spritesheetJS.generateSpritesheet(animation);
        });
    }

    protected Stream<Path> getSources() {
        return FileUtil.findFilesWithExtension(source, "gif");
    }

    protected List<FrameData> gif2pngs(Path path) {
        log.info("Convert {} to PNGs", path);
        var name = getName(path);
        try (InputStream is = new FileInputStream(path.toFile())) {
            var out = pngOutputDir(name);
            FileUtil.createDirs(out);
            return gif2pngs(is, name, out);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    protected Animation animation(Path path, List<FrameData> frames) {
        var animation = new Animation();
        var name = getName(path);
        animation.setName(name);
        animation.setFrames(frames.stream().collect(Collectors.toList()));
        animation.setDir(pngOutputDir(name));
        return animation;
    }

    protected String getName(Path path) {
        return FileUtil.getFilenameWithoutExtension(path);
    }

    protected Path pngOutputDir(String name) {
        return target.resolve(name);
    }

    protected List<FrameData> gif2pngs(InputStream is, String name, Path targetDir) {
        var decoder = new GifDecoder();
        decoder.read(is);

        var frames = new ArrayList<FrameData>();
        int n = decoder.getFrameCount();
        for (int i = 0; i < n; i++) {
            var frame = new FrameData();
            var frameName = getFrameFilename(name, i);
            var out = targetDir.resolve(frameName);
            frame.setFile(out);
            frame.setDuration(decoder.getDelay(i));
            frame.setWidth(decoder.getFrameSize().getWidth());
            frame.setHeight(decoder.getFrameSize().getHeight());
            var image = decoder.getFrame(i);
            saveImage(out, image);
            frames.add(frame);
        }
        return frames;
    }

    protected String getFrameFilename(String baseName, int index) {
        return baseName + "_" + StringUtil.leftPad("" + index, 3, '0') + ".png";
    }

    protected void saveImage(Path target, BufferedImage image) {
        File outputfile = target.toFile();
        try {
            ImageIO.write(image, "png", outputfile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}