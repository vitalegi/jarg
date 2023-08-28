package it.vitalegi.jarg.resource;

import io.swagger.v3.oas.annotations.Operation;
import it.vitalegi.jarg.asset.model.AssetCollection;
import it.vitalegi.jarg.asset.service.AssetService;
import it.vitalegi.jarg.logging.Performance;
import it.vitalegi.jarg.logging.Type;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RequestMapping("/skins")
@RestController
@Performance(Type.ENDPOINT)
public class SkinResource {

    @Autowired
    AssetService service;

    @Operation(description = "Retrieve all collections containing skins")
    @GetMapping("/collections")
    public List<AssetCollection> getSkinsCollections() {
        return service.getSkinsCollections();
    }
}
