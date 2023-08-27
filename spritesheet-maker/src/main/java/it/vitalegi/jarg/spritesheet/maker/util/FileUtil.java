package it.vitalegi.jarg.spritesheet.maker.util;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class FileUtil {
    public static void writeFile(Path file, String content) {
        try (var writer = new OutputStreamWriter(new FileOutputStream(file.toFile()), StandardCharsets.UTF_8)) {
            writer.write(content);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void createDirs(Path dir) {
        try {
            Files.createDirectories(dir);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Stream<Path> findFilesWithExtension(Path dir, String extension) {
        try {
            return Files.list(dir).filter(FileUtil::isFile) //
                        .filter(p -> extension.equalsIgnoreCase(getFileExtension(p)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static boolean isFile(Path path) {
        return path.toFile().isFile();
    }

    public static String getFileExtension(Path path) {
        var file = path.toFile();
        var name = file.getName();
        if (name.indexOf('.') == -1) {
            return null;
        }
        return name.substring(name.lastIndexOf('.') + 1);
    }

    public static String getFilenameWithoutExtension(Path path) {
        var file = path.toFile();
        var name = file.getName();
        if (name.indexOf('.') == -1) {
            return name;
        }
        return name.substring(0, name.lastIndexOf('.'));
    }
}
