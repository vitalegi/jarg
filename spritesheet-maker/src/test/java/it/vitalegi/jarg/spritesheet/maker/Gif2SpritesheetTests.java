package it.vitalegi.jarg.spritesheet.maker;

import it.vitalegi.jarg.spritesheet.maker.model.FrameData;
import it.vitalegi.jarg.spritesheet.maker.util.FileUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Path;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
public class Gif2SpritesheetTests {
    final static Path SOURCE = Path.of("src", "test", "resources", "gif");
    final static Path TARGET = Path.of("target", "gif2spritesheets");
    Logger log = LoggerFactory.getLogger(getClass());

    @InjectMocks
    Gif2Spritesheet gif2Spritesheet;

    @Test
    void given_dirWithGifs_when_getSources_then_shouldRetrieveFiles() {
        var sources = gif2Spritesheet.getSources().sorted().collect(Collectors.toList());
        assertEquals(2, sources.size());
        assertEquals("abra.gif", sources.get(0).toFile().getName());
        assertEquals("aerodactyl.gif", sources.get(1).toFile().getName());
    }

    @Test
    void given_dirWithGifs_when_run_then_shouldGeneratePngs() {
        gif2Spritesheet.run();
        var entries1 = FileUtil.findFilesWithExtension(TARGET.resolve("abra"), "png").collect(Collectors.toList());
        assertEquals(113, entries1.size());
        var entries2 = FileUtil.findFilesWithExtension(TARGET.resolve("aerodactyl"), "png")
                               .collect(Collectors.toList());
        assertEquals(17, entries2.size());
    }

    @Test
    void given_gifImage_when_processGif_then_shouldProduceMetadata() {
        var out = gif2Spritesheet.gif2pngs(SOURCE.resolve("abra.gif"));
        log.info("OUT:   {}", out.stream().map(FrameData::getFile).collect(Collectors.toList()));
        var outPaths = FileUtil.findFilesWithExtension(TARGET.resolve("abra"), "png").collect(Collectors.toList());
        log.info("FILES: {}", out.stream().map(FrameData::getFile).collect(Collectors.toList()));

        assertEquals(113, outPaths.size());
        assertEquals(113, out.size());
        outPaths.forEach(p -> {
            var name = p.toFile().getName();
            var expectedName = TARGET.resolve("abra").resolve(name);
            assertTrue(out.stream().anyMatch(o -> o.getFile().equals(expectedName)), "File " + p + " is missing.");
        });
        var w = out.get(0).getWidth();
        assertEquals(63.0, w);
        var h = out.get(0).getHeight();
        assertEquals(53.0, h);

        for (var i = 0; i < out.size(); i++) {
            var entry = out.get(i);
            assertTrue(entry.getDuration() > 1, "Image " + i + " has wrong duration (" + entry.getDuration() + ")");
            assertEquals(w, entry.getWidth(), "Image " + i + " has wrong width. All images should have the same size.");
            assertEquals(h, entry.getHeight(),
                    "Image " + i + " has wrong height. All images should have the same " + "size.");
        }
    }

    @BeforeEach
    void init() {
        gif2Spritesheet = new Gif2Spritesheet(SOURCE, TARGET);

    }
}
