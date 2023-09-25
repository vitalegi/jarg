package it.vitalegi.jarg.battleaction.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({ //
        @JsonSubTypes.Type(value = AddPersona.class, name = "add-persona"), //
        @JsonSubTypes.Type(value = DeletePersona.class, name = "delete-persona") //
})
public abstract class BattleAction {
}
