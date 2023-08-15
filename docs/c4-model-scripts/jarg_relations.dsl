# users
player -> jarg_container_frontend_public "Access the homepage"
player -> jarg_game_frontend_missions "Access the mission selection"
admin -> jarg_editor_frontend

# jarg

## jarg_container_frontend
jarg_container_frontend_public -> jarg_container_frontend_signin "Access to login page"
jarg_container_frontend_public -> jarg_container_frontend_signup "Access to registration page"
jarg_container_frontend_public -> jarg_container_frontend_logout "Logout"

jarg_container_frontend_signin -> firebase_auth_access "Perform login"
jarg_container_frontend_signup -> firebase_auth_access "Perform registration"
jarg_container_frontend_logout -> firebase_auth_access "Logout session"
jarg_container_frontend_game -> firebase_auth_identity "Check if user is logged in"
jarg_container_frontend_game -> jarg_game_frontend_missions "Start game"

## jarg_game_frontend
jarg_game_frontend_identity -> firebase_auth_token "Get SSO token"
jarg_game_frontend_missions -> jarg_game_frontend_identity "Retrieve user identity token"
jarg_game_frontend_missions -> jarg_game_backend_missions

## jarg_game_backend
jarg_game_backend_auth -> firebase_auth_app_token "Validate SSO token"
jarg_game_backend_auth -> jarg_database_users "Is user authorized?"
jarg_game_backend_missions -> jarg_game_backend_auth
jarg_game_backend_missions -> jarg_database_missions "Get user's missions"
jarg_game_backend_characters -> jarg_game_backend_auth
jarg_game_backend_characters -> jarg_database_characters "Get user's missions"
jarg_game_backend_maps -> jarg_game_backend_auth
jarg_game_backend_maps -> jarg_database_maps "Get user's missions"

## jarg_editor_frontend
jarg_editor_frontend_identity -> firebase_auth_token "Get SSO token"
jarg_editor_frontend_missions -> jarg_editor_frontend_identity "Retrieve user identity token"
jarg_editor_frontend_missions -> jarg_editor_backend_missions
jarg_editor_frontend_characters -> jarg_editor_frontend_identity "Retrieve user identity token"
jarg_editor_frontend_characters -> jarg_editor_backend_missions
jarg_editor_frontend_maps -> jarg_editor_frontend_identity "Retrieve user identity token"
jarg_editor_frontend_maps -> jarg_editor_backend_maps
jarg_editor_frontend_permissions -> jarg_editor_frontend_identity "Retrieve user identity token"
jarg_editor_frontend_permissions -> jarg_editor_backend_permissions

## jarg_editor_backend
jarg_editor_backend_auth -> firebase_auth_app_token "Validate SSO token"
jarg_editor_backend_auth -> jarg_database_users "Is user authorized?"
jarg_editor_backend_missions -> jarg_editor_backend_auth
jarg_editor_backend_missions -> jarg_database_missions "Get user's missions"
jarg_editor_backend_characters -> jarg_editor_backend_auth
jarg_editor_backend_characters -> jarg_database_characters "Get user's missions"
jarg_editor_backend_maps -> jarg_editor_backend_auth
jarg_editor_backend_maps -> jarg_database_maps "Get user's missions"
jarg_editor_backend_permissions -> jarg_editor_backend_auth
jarg_editor_backend_permissions -> jarg_database_users

## jarg_database

# firebase
## firebase_auth
firebase_auth_access -> firebase_auth_app_access
firebase_auth_identity -> firebase_auth_app_identity
firebase_auth_token -> firebase_auth_app_token
