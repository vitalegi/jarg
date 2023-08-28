# README

CLI util to convert a gif to a pixi.js spritesheet.

## Prerequirements

- Java 11
- Maven
- Image Magick 7 (with ImageMagick Legacy Tools)

```
$env:PATH = $env:PATH + ";C:\Program Files\ImageMagick-7.1.1-Q16-HDRI"
```

## Build

```
mvn clean package
```

## Run

There are several way to run the application.

Compile and run with maven

```
mvn clean compile exec:java "-Dexec.args=$arg1 $arg2 ..." "-Dexec.mainClass=$mainClass"
```

Run from the target folder

```
java -cp target/spritesheet-maker-jar-with-dependencies.jar $mainClass $arg1 $arg2 ...
```

Run the distribution version

```
java -cp spritesheet-maker.jar $mainClass $arg1 $arg2 ...
```

### Convert GIF to Spritesheets

```
mvn clean compile exec:java "-Dexec.args=path/to/source/folder path/to/output/folder" "-Dexec.mainClass=it.vitalegi.jarg.spritesheet.maker.Gif2Spritesheet"
mvn clean compile exec:java "-Dexec.args=./src/test/resources/gif/ ./out/" "-Dexec.mainClass=it.vitalegi.jarg.spritesheet.maker.Gif2Spritesheet"
```

## Track dependencies

```
mvn dependency:tree "-DoutputFile=dependencies-tree.txt"
mvn dependency:list "-DoutputFile=dependencies-list.txt"
```
