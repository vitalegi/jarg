# JaRG

## System Contexts

### JaRG - System Context

description: System Context of JaRG
![system_context JaRG](../../images/system_context%20JaRG.png)

[png](../../images/system_context%20JaRG.png) | [svg](../../images/system_context%20JaRG.svg)

## Containers

| Container | Description |
| --- | --- |
| Database |  |
| JaRG Container Webapp | Allows player to enter the game |
| JaRG Editor Backend |  |
| JaRG Editor WebApp | Allows authorized users to update the game content |
| JaRG Game Backend |  |
| JaRG Game WebApp | Allows player to play the game |

### JaRG - Containers

description: Container view of JaRG
![container JaRG](../../images/container%20JaRG.png)

[png](../../images/container%20JaRG.png) | [svg](../../images/container%20JaRG.svg)

## Components

| Container | Component | Description |
| --- | --- | --- |
| JaRG Container Webapp | Login |  |
| JaRG Container Webapp | Logout |  |
| JaRG Container Webapp | Public page |  |
| JaRG Container Webapp | Registration |  |
| JaRG Container Webapp | Start Game |  |
| Database | Characters |  |
| Database | Maps |  |
| Database | Missions |  |
| Database | Users |  |
| JaRG Game WebApp | Identify the user |  |
| JaRG Game WebApp | Mission selection |  |
| JaRG Editor WebApp | Identify the user |  |
| JaRG Editor WebApp | Manages user accesses and grants |  |
| JaRG Editor WebApp | Update characters | Allow to add/modify/delete missions |
| JaRG Editor WebApp | Update maps | Allow to add/modify/delete missions |
| JaRG Editor WebApp | Update missions | Allow to add/modify/delete missions |
| JaRG Game Backend | Characters services |  |
| JaRG Game Backend | Map services |  |
| JaRG Game Backend | Missions services |  |
| JaRG Game Backend | Verify SSO token |  |
| JaRG Editor Backend | Edit Characters services |  |
| JaRG Editor Backend | Edit Map services |  |
| JaRG Editor Backend | Edit Missions services |  |
| JaRG Editor Backend | Manages user accesses and grants |  |
| JaRG Editor Backend | Verify SSO token |  |

### JaRG - Database - Components

description: Component view of Database
![component JaRG Database](../../images/component%20JaRG%20Database.png)

[png](../../images/component%20JaRG%20Database.png) | [svg](../../images/component%20JaRG%20Database.svg)
### JaRG - JaRG Container Webapp - Components

description: Component view of JaRG Container Webapp
![component JaRG JaRG Container Webapp](../../images/component%20JaRG%20JaRG%20Container%20Webapp.png)

[png](../../images/component%20JaRG%20JaRG%20Container%20Webapp.png) | [svg](../../images/component%20JaRG%20JaRG%20Container%20Webapp.svg)
### JaRG - JaRG Editor Backend - Components

description: Component view of JaRG Editor Backend
![component JaRG JaRG Editor Backend](../../images/component%20JaRG%20JaRG%20Editor%20Backend.png)

[png](../../images/component%20JaRG%20JaRG%20Editor%20Backend.png) | [svg](../../images/component%20JaRG%20JaRG%20Editor%20Backend.svg)
### JaRG - JaRG Editor WebApp - Components

description: Component view of JaRG Editor WebApp
![component JaRG JaRG Editor WebApp](../../images/component%20JaRG%20JaRG%20Editor%20WebApp.png)

[png](../../images/component%20JaRG%20JaRG%20Editor%20WebApp.png) | [svg](../../images/component%20JaRG%20JaRG%20Editor%20WebApp.svg)
### JaRG - JaRG Game Backend - Components

description: Component view of JaRG Game Backend
![component JaRG JaRG Game Backend](../../images/component%20JaRG%20JaRG%20Game%20Backend.png)

[png](../../images/component%20JaRG%20JaRG%20Game%20Backend.png) | [svg](../../images/component%20JaRG%20JaRG%20Game%20Backend.svg)
### JaRG - JaRG Game WebApp - Components

description: Component view of JaRG Game WebApp
![component JaRG JaRG Game WebApp](../../images/component%20JaRG%20JaRG%20Game%20WebApp.png)

[png](../../images/component%20JaRG%20JaRG%20Game%20WebApp.png) | [svg](../../images/component%20JaRG%20JaRG%20Game%20WebApp.svg)

## Relationships

### Called by

| Source Software System | Source Container | Source Component | Target Software System | Target Container | Target Component | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Admin |  |  | JaRG | JaRG Editor WebApp |  |  |
| Admin |  |  | JaRG |  |  |  |
| JaRG | JaRG Container Webapp | Public page | JaRG | JaRG Container Webapp | Login | Access to login page |
| JaRG | JaRG Container Webapp | Public page | JaRG | JaRG Container Webapp | Logout | Logout |
| JaRG | JaRG Container Webapp | Public page | JaRG | JaRG Container Webapp | Registration | Access to registration page |
| JaRG | JaRG Container Webapp | Start Game | JaRG | JaRG Game WebApp |  | Start game |
| JaRG | JaRG Container Webapp | Start Game | JaRG | JaRG Game WebApp | Mission selection | Start game |
| JaRG | JaRG Container Webapp |  | JaRG | JaRG Game WebApp |  | Start game |
| JaRG | JaRG Container Webapp |  | JaRG | JaRG Game WebApp | Mission selection | Start game |
| JaRG | JaRG Editor Backend | Edit Characters services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Characters services | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Characters services | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Edit Map services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Map services | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Map services | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Edit Missions services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Missions services | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Missions services | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Manages user accesses and grants | JaRG | Database |  |  |
| JaRG | JaRG Editor Backend | Manages user accesses and grants | JaRG | Database | Users |  |
| JaRG | JaRG Editor Backend | Manages user accesses and grants | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Verify SSO token | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Editor Backend | Verify SSO token | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Editor Backend |  | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Editor WebApp | Manages user accesses and grants | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Manages user accesses and grants | JaRG | JaRG Editor Backend | Manages user accesses and grants |  |
| JaRG | JaRG Editor WebApp | Manages user accesses and grants | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp | Update characters | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Update characters | JaRG | JaRG Editor Backend | Edit Missions services |  |
| JaRG | JaRG Editor WebApp | Update characters | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp | Update maps | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Update maps | JaRG | JaRG Editor Backend | Edit Map services |  |
| JaRG | JaRG Editor WebApp | Update maps | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp | Update missions | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Update missions | JaRG | JaRG Editor Backend | Edit Missions services |  |
| JaRG | JaRG Editor WebApp | Update missions | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend | Edit Map services |  |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend | Edit Missions services |  |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend | Manages user accesses and grants |  |
| JaRG | JaRG Game Backend | Characters services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Game Backend | Characters services | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Game Backend | Characters services | JaRG | JaRG Game Backend | Verify SSO token |  |
| JaRG | JaRG Game Backend | Map services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Game Backend | Map services | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Game Backend | Map services | JaRG | JaRG Game Backend | Verify SSO token |  |
| JaRG | JaRG Game Backend | Missions services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Game Backend | Missions services | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Game Backend | Missions services | JaRG | JaRG Game Backend | Verify SSO token |  |
| JaRG | JaRG Game Backend | Verify SSO token | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Game Backend | Verify SSO token | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Game Backend |  | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Game Backend |  | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Game Backend |  | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Game Backend |  | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Game Backend |  | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Game WebApp | Mission selection | JaRG | JaRG Game Backend |  |  |
| JaRG | JaRG Game WebApp | Mission selection | JaRG | JaRG Game Backend | Missions services |  |
| JaRG | JaRG Game WebApp | Mission selection | JaRG | JaRG Game WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Game WebApp |  | JaRG | JaRG Game Backend |  |  |
| JaRG | JaRG Game WebApp |  | JaRG | JaRG Game Backend | Missions services |  |
| Player |  |  | JaRG | JaRG Container Webapp |  | Access the homepage |
| Player |  |  | JaRG | JaRG Container Webapp | Public page | Access the homepage |
| Player |  |  | JaRG | JaRG Game WebApp |  | Access the mission selection |
| Player |  |  | JaRG | JaRG Game WebApp | Mission selection | Access the mission selection |
| Player |  |  | JaRG |  |  | Access the homepage |

### Calls

| Source Software System | Source Container | Source Component | Target Software System | Target Container | Target Component | Description |
| --- | --- | --- | --- | --- | --- | --- |
| JaRG | JaRG Container Webapp | Login | Firebase | Firebase Auth js |  | Perform login |
| JaRG | JaRG Container Webapp | Login | Firebase | Firebase Auth js | Login/Registration features | Perform login |
| JaRG | JaRG Container Webapp | Login | Firebase |  |  | Perform login |
| JaRG | JaRG Container Webapp | Logout | Firebase | Firebase Auth js |  | Logout session |
| JaRG | JaRG Container Webapp | Logout | Firebase | Firebase Auth js | Login/Registration features | Logout session |
| JaRG | JaRG Container Webapp | Logout | Firebase |  |  | Logout session |
| JaRG | JaRG Container Webapp | Public page | JaRG | JaRG Container Webapp | Login | Access to login page |
| JaRG | JaRG Container Webapp | Public page | JaRG | JaRG Container Webapp | Logout | Logout |
| JaRG | JaRG Container Webapp | Public page | JaRG | JaRG Container Webapp | Registration | Access to registration page |
| JaRG | JaRG Container Webapp | Registration | Firebase | Firebase Auth js |  | Perform registration |
| JaRG | JaRG Container Webapp | Registration | Firebase | Firebase Auth js | Login/Registration features | Perform registration |
| JaRG | JaRG Container Webapp | Registration | Firebase |  |  | Perform registration |
| JaRG | JaRG Container Webapp | Start Game | Firebase | Firebase Auth js |  | Check if user is logged in |
| JaRG | JaRG Container Webapp | Start Game | Firebase | Firebase Auth js | User Identity | Check if user is logged in |
| JaRG | JaRG Container Webapp | Start Game | Firebase |  |  | Check if user is logged in |
| JaRG | JaRG Container Webapp | Start Game | JaRG | JaRG Game WebApp |  | Start game |
| JaRG | JaRG Container Webapp | Start Game | JaRG | JaRG Game WebApp | Mission selection | Start game |
| JaRG | JaRG Container Webapp |  | Firebase | Firebase Auth js |  | Perform login |
| JaRG | JaRG Container Webapp |  | Firebase | Firebase Auth js | Login/Registration features | Perform login |
| JaRG | JaRG Container Webapp |  | Firebase | Firebase Auth js | User Identity | Check if user is logged in |
| JaRG | JaRG Container Webapp |  | Firebase |  |  | Perform login |
| JaRG | JaRG Container Webapp |  | JaRG | JaRG Game WebApp |  | Start game |
| JaRG | JaRG Container Webapp |  | JaRG | JaRG Game WebApp | Mission selection | Start game |
| JaRG | JaRG Editor Backend | Edit Characters services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Characters services | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Characters services | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Edit Map services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Map services | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Map services | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Edit Missions services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Missions services | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Editor Backend | Edit Missions services | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Manages user accesses and grants | JaRG | Database |  |  |
| JaRG | JaRG Editor Backend | Manages user accesses and grants | JaRG | Database | Users |  |
| JaRG | JaRG Editor Backend | Manages user accesses and grants | JaRG | JaRG Editor Backend | Verify SSO token |  |
| JaRG | JaRG Editor Backend | Verify SSO token | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Editor Backend | Verify SSO token | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Editor Backend | Verify SSO token | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Editor Backend | Verify SSO token | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Editor Backend | Verify SSO token | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Editor Backend |  | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Editor Backend |  | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Editor Backend |  | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Editor Backend |  | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Editor Backend |  | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Editor WebApp | Identify the user | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Editor WebApp | Identify the user | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Editor WebApp | Identify the user | Firebase |  |  | Get SSO token |
| JaRG | JaRG Editor WebApp | Manages user accesses and grants | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Manages user accesses and grants | JaRG | JaRG Editor Backend | Manages user accesses and grants |  |
| JaRG | JaRG Editor WebApp | Manages user accesses and grants | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp | Update characters | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Update characters | JaRG | JaRG Editor Backend | Edit Missions services |  |
| JaRG | JaRG Editor WebApp | Update characters | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp | Update maps | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Update maps | JaRG | JaRG Editor Backend | Edit Map services |  |
| JaRG | JaRG Editor WebApp | Update maps | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp | Update missions | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp | Update missions | JaRG | JaRG Editor Backend | Edit Missions services |  |
| JaRG | JaRG Editor WebApp | Update missions | JaRG | JaRG Editor WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Editor WebApp |  | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Editor WebApp |  | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Editor WebApp |  | Firebase |  |  | Get SSO token |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend |  |  |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend | Edit Map services |  |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend | Edit Missions services |  |
| JaRG | JaRG Editor WebApp |  | JaRG | JaRG Editor Backend | Manages user accesses and grants |  |
| JaRG | JaRG Game Backend | Characters services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Game Backend | Characters services | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Game Backend | Characters services | JaRG | JaRG Game Backend | Verify SSO token |  |
| JaRG | JaRG Game Backend | Map services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Game Backend | Map services | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Game Backend | Map services | JaRG | JaRG Game Backend | Verify SSO token |  |
| JaRG | JaRG Game Backend | Missions services | JaRG | Database |  | Get user's missions |
| JaRG | JaRG Game Backend | Missions services | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Game Backend | Missions services | JaRG | JaRG Game Backend | Verify SSO token |  |
| JaRG | JaRG Game Backend | Verify SSO token | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Game Backend | Verify SSO token | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Game Backend | Verify SSO token | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Game Backend | Verify SSO token | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Game Backend | Verify SSO token | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Game Backend |  | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Game Backend |  | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Game Backend |  | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Game Backend |  | JaRG | Database |  | Is user authorized? |
| JaRG | JaRG Game Backend |  | JaRG | Database | Characters | Get user's missions |
| JaRG | JaRG Game Backend |  | JaRG | Database | Maps | Get user's missions |
| JaRG | JaRG Game Backend |  | JaRG | Database | Missions | Get user's missions |
| JaRG | JaRG Game Backend |  | JaRG | Database | Users | Is user authorized? |
| JaRG | JaRG Game WebApp | Identify the user | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Game WebApp | Identify the user | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Game WebApp | Identify the user | Firebase |  |  | Get SSO token |
| JaRG | JaRG Game WebApp | Mission selection | JaRG | JaRG Game Backend |  |  |
| JaRG | JaRG Game WebApp | Mission selection | JaRG | JaRG Game Backend | Missions services |  |
| JaRG | JaRG Game WebApp | Mission selection | JaRG | JaRG Game WebApp | Identify the user | Retrieve user identity token |
| JaRG | JaRG Game WebApp |  | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Game WebApp |  | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Game WebApp |  | Firebase |  |  | Get SSO token |
| JaRG | JaRG Game WebApp |  | JaRG | JaRG Game Backend |  |  |
| JaRG | JaRG Game WebApp |  | JaRG | JaRG Game Backend | Missions services |  |
| JaRG |  |  | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG |  |  | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG |  |  | Firebase | Firebase Auth js |  | Perform login |
| JaRG |  |  | Firebase | Firebase Auth js | Login/Registration features | Perform login |
| JaRG |  |  | Firebase | Firebase Auth js | User Identity | Check if user is logged in |
| JaRG |  |  | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG |  |  | Firebase |  |  | Perform login |

## Deployments


