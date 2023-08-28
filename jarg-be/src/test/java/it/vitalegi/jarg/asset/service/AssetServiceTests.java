package it.vitalegi.jarg.asset.service;


import it.vitalegi.jarg.asset.model.AssetCollection;
import it.vitalegi.jarg.util.ResourceUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AssetServiceTests {

    @Mock
    ResourceUtil resourceUtil;
    @InjectMocks
    AssetService assetService;

    @Test
    void when_getSkinsCollections_then_valueIsCorrect() {
        when(resourceUtil.readValues("/collections_001.json")).thenReturn(asList(//
                assetCollection("http://localhost:8080/1", "A", "B", "C"), //
                assetCollection("http://localhost:8080/2", "D", "E", "F") //
        ));
        var actual = assetService.getSkinsCollections();
        assertEquals("http://localhost:8080/1", actual.get(0).getUrl());
        assertEquals(asList("A", "B", "C"), actual.get(0).getAnimations());
        assertEquals("http://localhost:8080/2", actual.get(1).getUrl());
        assertEquals(asList("D", "E", "F"), actual.get(1).getAnimations());
    }

    AssetCollection assetCollection(String url, String... animations) {
        var out = new AssetCollection();
        out.setUrl(url);
        out.setAnimations(asList(animations));
        return out;
    }
}
