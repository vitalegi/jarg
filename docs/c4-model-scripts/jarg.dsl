workspace "JaRG" "JaRG architecture" {


    model {
        !include jarg_models.dsl
        !include jarg_relations.dsl


        live = deploymentEnvironment "Live" {
            deploymentNode "Netlify" {
                tags "Netlify"

                jarg_container_frontend_site = deploymentNode "Container Frontend" {
                    jarg_container_frontend_instance = containerInstance jarg_container_frontend
                }
                jarg_game_frontend_site = deploymentNode "Game Frontend" {
                    jarg_game_frontend_instance = containerInstance jarg_game_frontend
                }
                jarg_editor_frontend_site = deploymentNode "Game Editor Frontend" {
                    jarg_editor_frontend_instance = containerInstance jarg_editor_frontend
                }
            }
            deploymentNode "Fly.io" {
                tags "Fly"

                jarg_game_backend_app = deploymentNode "Game Backend App" {
                    containerInstance jarg_game_backend
                }
                jarg_editor_backend_app = deploymentNode "Game Editor App" {
                    containerInstance jarg_editor_backend
                }
                jarg_database_database = deploymentNode "PostgreSQL" {
                    containerInstance jarg_database
                }
            }
            deploymentNode "Firebase App" {
                tags "Firebase"
                deploymentNode "Firebase Live" {
                    containerInstance firebase_auth
                    containerInstance firebase_auth_app
                }
            }
        }
    }

    views {
        systemLandscape landscape {
            include *
            autoLayout
        }

        deployment jarg "Live" deployment_jarg_live {
            include *
            autolayout lr
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