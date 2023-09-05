package it.vitalegi.jarg.resource;

import io.swagger.v3.oas.annotations.Operation;
import it.vitalegi.jarg.asset.model.AssetCollection;
import it.vitalegi.jarg.logging.Performance;
import it.vitalegi.jarg.logging.Type;
import it.vitalegi.jarg.persona.model.NewPersona;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequestMapping("/persona")
@RestController
@Performance(Type.ENDPOINT)
public class PersonaResource {

    @Autowired
    PersonaService personaService;

    @Operation(description = "Create new persona")
    @PutMapping
    public Persona createPersona(@RequestBody NewPersona request) {
        return personaService.create(request.getName(), request.getClassId(), request.getRaceId(), request.getSkin());
    }

    @Operation(description = "Get all my personas")
    @GetMapping()
    public List<Persona> getMyPersonas() {
        return personaService.getMyPersonas();
    }
}
