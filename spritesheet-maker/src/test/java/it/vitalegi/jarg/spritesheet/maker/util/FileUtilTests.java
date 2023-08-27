package it.vitalegi.jarg.spritesheet.maker.util;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(MockitoExtension.class)
public class FileUtilTests {

    @Test
    public void given_pathWithDotWithoutExtension_when_getFileExtension_then_shouldReturnEmptyExtension() {
        var ext = FileUtil.getFileExtension(Path.of("a", "b", "c", "foo."));
        assertEquals("", ext);
    }

    @Test
    public void given_pathWithoutExtension_when_getFileExtension_then_shouldReturnNull() {
        var ext = FileUtil.getFileExtension(Path.of("a", "b", "c", "foo"));
        assertNull(ext);
    }

    @Test
    public void given_path_when_getFileExtension_then_shouldExtractExtension() {
        var ext = FileUtil.getFileExtension(Path.of("a", "b", "c", "foo.bar"));
        assertEquals("bar", ext);
    }
    @Test
    public void given_pathWithMultipleDots_when_getFileExtension_then_shouldExtractExtension() {
        var ext = FileUtil.getFileExtension(Path.of("a", "b", "c", "foo.bar.xxx.yyy.zzz"));
        assertEquals("zzz", ext);
    }

}
