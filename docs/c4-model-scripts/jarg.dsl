workspace "JaRG" "JaRG architecture" {


    model {
        !include jarg_models.dsl
        !include jarg_relations.dsl
    }

    views {
        systemLandscape landscape {
            include *
            autoLayout
        }

        styles {
            element "Element" {
                shape roundedbox
                background #ffffff
            }
            element "Container" {
                background #ffffff
            }
            element "Application" {
                background #ffffff
            }
            element "Database" {
                shape cylinder
            }
        }

        themes https://static.structurizr.com/themes/amazon-web-services-2020.04.30/theme.json
    }

}