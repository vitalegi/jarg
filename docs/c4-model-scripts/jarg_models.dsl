player = person "Player"
admin = person "Admin"

jarg = softwaresystem "JaRG" {
    jarg_container_frontend = container "JaRG Container Webapp" "Allows player to enter the game" {
        jarg_container_frontend_public = component "Public page"
        jarg_container_frontend_signin = component "Login"
        jarg_container_frontend_signup = component "Registration"
        jarg_container_frontend_logout = component "Logout"
        jarg_container_frontend_game = component "Start Game"
    }
    
    jarg_game_frontend = container "JaRG Game WebApp" "Allows player to play the game" {
        jarg_game_frontend_missions = component "Mission selection"
        jarg_game_frontend_identity = component "Identify the user"
    }

    jarg_game_backend = container "JaRG Game Backend" {
        jarg_game_backend_auth = component "Verify SSO token"
        jarg_game_backend_missions = component "Missions services"
        jarg_game_backend_characters = component "Characters services"
        jarg_game_backend_maps = component "Map services"
    }

    jarg_editor_frontend = container "JaRG Editor WebApp" "Allows authorized users to update the game content" {
        jarg_editor_frontend_identity = component "Identify the user"
        jarg_editor_frontend_missions = component "Update missions" "Allow to add/modify/delete missions"
        jarg_editor_frontend_characters = component "Update characters" "Allow to add/modify/delete missions"
        jarg_editor_frontend_maps = component "Update maps" "Allow to add/modify/delete missions"
        jarg_editor_frontend_permissions = component "Manages user accesses and grants"
    }
    jarg_editor_backend = container "JaRG Editor Backend" {
        jarg_editor_backend_auth = component "Verify SSO token"
        jarg_editor_backend_missions = component "Edit Missions services"
        jarg_editor_backend_characters = component "Edit Characters services"
        jarg_editor_backend_maps = component "Edit Map services"
        jarg_editor_backend_permissions = component "Manages user accesses and grants"
    }
    
    jarg_database = container "Database" {
        jarg_database_users = component "Users"
        jarg_database_characters = component "Characters"
        jarg_database_missions = component "Missions"
        jarg_database_maps = component "Maps"
    }
}

firebase = softwaresystem "Firebase" {
    firebase_auth = container "Firebase Auth js" "Proxy to user authentication" {
        firebase_auth_access = component "Login/Registration features"
        firebase_auth_identity = component "User Identity"
        firebase_auth_token = component "User SSO token"
    }
    firebase_auth_app = container "Firebase Auth WebApp" "Manages user authentication" {
        firebase_auth_app_access = component "Login/Registration features"
        firebase_auth_app_identity = component "User Identity"
        firebase_auth_app_token = component "User SSO token"
    }
}