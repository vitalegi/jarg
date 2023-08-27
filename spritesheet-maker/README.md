# README

CLI util to convert a gif to a pixi.js spritesheet.

## Prerequirements

- Java 11
- Maven

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
java -cp target/structurizr-md-jar-with-dependencies.jar $mainClass $arg1 $arg2 ...
```

Run the distribution version

```
java -cp structurizr-md.jar $mainClass $arg1 $arg2 ...
```

```
mvn dependency:tree "-DoutputFile=dependencies-tree.txt"
mvn dependency:list "-DoutputFile=dependencies-list.txt"
```
