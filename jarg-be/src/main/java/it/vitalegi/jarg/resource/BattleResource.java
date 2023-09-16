package it.vitalegi.jarg.resource;

import io.swagger.v3.oas.annotations.Operation;
import it.vitalegi.jarg.auth.AuthService;
import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.service.BattleMapBuilderService;
import it.vitalegi.jarg.logging.Performance;
import it.vitalegi.jarg.logging.Type;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequestMapping("/battle")
@RestController
@Performance(Type.ENDPOINT)
public class BattleResource {

    @Autowired
    BattleMapBuilderService battleMapBuilderService;

    @Autowired
    AuthService authService;

    @Operation(description = "Create random map")
    @PutMapping("/random")
    public BattleMap createRandomMap() {
        return battleMapBuilderService.createRandomMap(authService.getAccountId());
    }

}
