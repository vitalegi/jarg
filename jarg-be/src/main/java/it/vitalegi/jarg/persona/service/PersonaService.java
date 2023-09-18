package it.vitalegi.jarg.persona.service;

import it.vitalegi.jarg.auth.AuthService;
import it.vitalegi.jarg.persona.entity.PersonaEntity;
import it.vitalegi.jarg.persona.model.*;
import it.vitalegi.jarg.persona.repository.PersonaRepository;
import it.vitalegi.jarg.util.SerializrUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Log4j2
@Service
public class PersonaService {

    @Autowired
    AuthService authService;

    @Autowired
    PersonaRepository personaRepository;

    public Persona create(String name, long classId, long raceId, String skin) {
        var accountId = authService.getAccountId();
        var persona = initPersona(name, classId, raceId, skin);
        return doCreatePersona(persona, accountId);
    }

    public Persona createNpc() {
        var persona = initPersona("???", 1, 2, "arcanine");
        return persona;
    }

    protected Persona initPersona(String name, long classId, long raceId, String skin) {
        var persona = new Persona();
        persona.setName(name);
        persona.setHp(consumableStat(30, 30));
        persona.setMp(consumableStat(10, 10));
        persona.setExp(0);
        persona.setClasses(new ArrayList<>());
        persona.getClasses().add(getPersonaClass(classId));
        persona.setRace(getRace(raceId));
        persona.setSkin(skin);
        persona.setLevel(1);
        persona.setSkills(new ArrayList<>());
        persona.setBaseStats(baseStats());
        persona.setStatsGrowth(statsGrowth());
        return persona;
    }

    public List<Persona> getMyPersonae() {
        var accountId = authService.getAccountId();
        log.info("get personae for {}", accountId);
        var personae = personaRepository.findAllByOwnerId(accountId);
        return personae.stream().map(this::map).sorted(Comparator.comparing(Persona::getId)).collect(Collectors.toList());
    }

    protected Persona doCreatePersona(Persona persona, int ownerId) {
        var entity = new PersonaEntity();
        entity.setOwnerId(ownerId);
        entity.setPayload(SerializrUtil.toByte(persona));
        entity = personaRepository.save(entity);
        log.info("Create persona {}", entity.getPersonaId());
        return map(entity);
    }

    private ConsumableStat consumableStat(int current, int max) {
        var out = new ConsumableStat();
        out.setCurrent(current);
        out.setMax(max);
        return out;
    }

    private Race getRace(long raceId) {
        var race = new Race();
        race.setId(raceId);
        race.setName("???");
        return race;
    }

    private PersonaClass getPersonaClass(long classId) {
        var out = new PersonaClass();
        out.setLevel(1);
        out.setDef(getClassModel(classId));
        return out;
    }

    private ClassModel getClassModel(long classId) {
        var out = new ClassModel();
        out.setId(classId);
        out.setName("???");
        return out;
    }

    private BaseStats baseStats() {
        var out = new BaseStats();
        out.setAttack(5);
        out.setDefence(5);
        out.setIntelligence(5);
        out.setResistance(5);
        return out;
    }

    private StatsGrowth statsGrowth() {
        var out = new StatsGrowth();
        out.setHp(5);
        out.setMp(5);
        out.setAttack(5);
        out.setDefence(5);
        out.setIntelligence(5);
        out.setResistance(5);
        return out;
    }

    private Persona map(PersonaEntity entity) {
        var persona = SerializrUtil.fromByte(entity.getPayload(), Persona.class);
        persona.setId(entity.getPersonaId());
        return persona;
    }
}
