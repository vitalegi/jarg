package it.vitalegi.jarg.resource;

import it.vitalegi.jarg.asset.service.AssetService;
import it.vitalegi.jarg.logging.Performance;
import it.vitalegi.jarg.logging.Type;
import it.vitalegi.jarg.asset.model.AssetCollections;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequestMapping("/skins")
@RestController
@Performance(Type.ENDPOINT)
public class SkinResource {

    @Autowired
    AssetService service;

    @GetMapping("/collections")
    public AssetCollections getSkinsCollections() {
        var out = new AssetCollections();
        out.setCollections(service.getSkinsCollections());
        return out;
    }
}
