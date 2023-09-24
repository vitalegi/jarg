package it.vitalegi.jarg.persona.repository;

import it.vitalegi.jarg.persona.entity.PersonaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PersonaRepository extends JpaRepository<PersonaEntity, UUID> {

    List<PersonaEntity> findAllByOwnerId(Integer ownerId);
}