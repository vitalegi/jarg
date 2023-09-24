package it.vitalegi.jarg.resource;

import io.swagger.v3.oas.annotations.Operation;
import it.vitalegi.jarg.auth.AuthService;
import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.battle.service.BattleTransactionalService;
import it.vitalegi.jarg.battleaction.model.AddPersonaRequest;
import it.vitalegi.jarg.battleaction.model.BattleAction;
import it.vitalegi.jarg.logging.Performance;
import it.vitalegi.jarg.logging.Type;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Log4j2
@RequestMapping("/battle")
@RestController
@Performance(Type.ENDPOINT)
public class BattleResource {

    @Autowired
    BattleTransactionalService battleTransactionalService;

    @Autowired
    AuthService authService;

    @Operation(description = "Create random map")
    @PutMapping("/random")
    public BattleMap createRandomMap() {
        return battleTransactionalService.createRandomMap(getUserId());
    }

    @Operation(description = "Add player's persona to battle")
    @PostMapping("/{battleId}/persona")
    public List<BattleAction> addPersona(@PathVariable("battleId") UUID battleId, @RequestBody AddPersonaRequest addPersona) {
        return battleTransactionalService.addPlayerPersona(battleId, getUserId(), addPersona);
    }

    @Operation(description = "Get battle")
    @GetMapping("/{battleId}")
    public BattleMap getBattle(@PathVariable("battleId") UUID battleId) {
        return battleTransactionalService.getBattle(battleId, getUserId());
    }

    @Operation(description = "Get battle position for first displacement")
    @GetMapping("/{battleId}/displacement/available")
    public List<Coordinate> getAvailableDisplacements(@PathVariable("battleId") UUID battleId) {
        return battleTransactionalService.getAvailableDisplacements(battleId, getUserId());
    }

    protected int getUserId() {
        return authService.getAccountId();
    }
}
