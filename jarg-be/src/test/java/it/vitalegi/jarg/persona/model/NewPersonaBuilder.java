package it.vitalegi.jarg.persona.model;

public class NewPersonaBuilder {

    NewPersona build;

    public NewPersonaBuilder() {
        build = new NewPersona();
    }

    public NewPersona build() {
        return build;
    }

    public NewPersonaBuilder name(String name) {
        build.setName(name);
        return this;
    }

    public NewPersonaBuilder classId(long classId) {
        build.setClassId(classId);
        return this;
    }

    public NewPersonaBuilder raceId(long raceId) {
        build.setRaceId(raceId);
        return this;
    }

    public NewPersonaBuilder skin(String skin) {
        build.setSkin(skin);
        return this;
    }
}
