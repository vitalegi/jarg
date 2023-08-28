package it.vitalegi.jarg.asset.service;

import it.vitalegi.jarg.asset.model.AssetCollection;
import it.vitalegi.jarg.util.ResourceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {

    @Autowired
    ResourceUtil resourceUtil;

    public List<AssetCollection> getSkinsCollections() {
        return resourceUtil.readValues("/collections_001.json");
    }
}
