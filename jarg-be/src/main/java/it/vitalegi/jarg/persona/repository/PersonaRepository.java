package it.vitalegi.jarg.persona.repository;

import it.vitalegi.jarg.persona.entity.PersonaEntity;
import it.vitalegi.jarg.persona.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonaRepository extends JpaRepository<PersonaEntity, Integer> {

    List<PersonaEntity> findAllByOwnerId(Integer ownerId);
}