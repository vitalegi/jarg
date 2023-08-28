package it.vitalegi.jarg.asset.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "A collection contains a list of animations")
@Data
public class AssetCollection {
    @Schema(description = "Collection's URL")
    String url;
    @Schema(description = "Available animations in this collection")
    List<String> animations;
}
