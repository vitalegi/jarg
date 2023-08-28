package it.vitalegi.jarg.asset.model;

import lombok.Data;

import java.util.List;

@Data
public class AssetCollection {
    String url;
    List<String> animations;
}
