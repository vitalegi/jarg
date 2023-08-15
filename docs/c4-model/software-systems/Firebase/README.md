# Firebase

## System Contexts

### Firebase - System Context

description: System Context of Firebase
![system_context Firebase](../../images/system_context%20Firebase.png)

[png](../../images/system_context%20Firebase.png) | [svg](../../images/system_context%20Firebase.svg)

## Containers

| Container | Description |
| --- | --- |
| Firebase Auth WebApp | Manages user authentication |
| Firebase Auth js | Proxy to user authentication |

### Firebase - Containers

description: Container view of Firebase
![container Firebase](../../images/container%20Firebase.png)

[png](../../images/container%20Firebase.png) | [svg](../../images/container%20Firebase.svg)

## Components

| Container | Component | Description |
| --- | --- | --- |
| Firebase Auth js | Login/Registration features |  |
| Firebase Auth js | User Identity |  |
| Firebase Auth js | User SSO token |  |
| Firebase Auth WebApp | Login/Registration features |  |
| Firebase Auth WebApp | User Identity |  |
| Firebase Auth WebApp | User SSO token |  |

### Firebase - Firebase Auth WebApp - Components

description: Component view of Firebase Auth WebApp
![component Firebase Firebase Auth WebApp](../../images/component%20Firebase%20Firebase%20Auth%20WebApp.png)

[png](../../images/component%20Firebase%20Firebase%20Auth%20WebApp.png) | [svg](../../images/component%20Firebase%20Firebase%20Auth%20WebApp.svg)
### Firebase - Firebase Auth js - Components

description: Component view of Firebase Auth js
![component Firebase Firebase Auth js](../../images/component%20Firebase%20Firebase%20Auth%20js.png)

[png](../../images/component%20Firebase%20Firebase%20Auth%20js.png) | [svg](../../images/component%20Firebase%20Firebase%20Auth%20js.svg)

## Relationships

### Called by

| Source Software System | Source Container | Source Component | Target Software System | Target Container | Target Component | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Firebase | Firebase Auth js | Login/Registration features | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js | Login/Registration features | Firebase | Firebase Auth WebApp | Login/Registration features |  |
| Firebase | Firebase Auth js | User Identity | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js | User Identity | Firebase | Firebase Auth WebApp | User Identity |  |
| Firebase | Firebase Auth js | User SSO token | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js | User SSO token | Firebase | Firebase Auth WebApp | User SSO token |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp | Login/Registration features |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp | User Identity |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp | User SSO token |  |
| JaRG | JaRG Container Webapp | Login | Firebase | Firebase Auth js |  | Perform login |
| JaRG | JaRG Container Webapp | Login | Firebase | Firebase Auth js | Login/Registration features | Perform login |
| JaRG | JaRG Container Webapp | Login | Firebase |  |  | Perform login |
| JaRG | JaRG Container Webapp | Logout | Firebase | Firebase Auth js |  | Logout session |
| JaRG | JaRG Container Webapp | Logout | Firebase | Firebase Auth js | Login/Registration features | Logout session |
| JaRG | JaRG Container Webapp | Logout | Firebase |  |  | Logout session |
| JaRG | JaRG Container Webapp | Registration | Firebase | Firebase Auth js |  | Perform registration |
| JaRG | JaRG Container Webapp | Registration | Firebase | Firebase Auth js | Login/Registration features | Perform registration |
| JaRG | JaRG Container Webapp | Registration | Firebase |  |  | Perform registration |
| JaRG | JaRG Container Webapp | Start Game | Firebase | Firebase Auth js |  | Check if user is logged in |
| JaRG | JaRG Container Webapp | Start Game | Firebase | Firebase Auth js | User Identity | Check if user is logged in |
| JaRG | JaRG Container Webapp | Start Game | Firebase |  |  | Check if user is logged in |
| JaRG | JaRG Container Webapp |  | Firebase | Firebase Auth js |  | Perform login |
| JaRG | JaRG Container Webapp |  | Firebase | Firebase Auth js | Login/Registration features | Perform login |
| JaRG | JaRG Container Webapp |  | Firebase | Firebase Auth js | User Identity | Check if user is logged in |
| JaRG | JaRG Container Webapp |  | Firebase |  |  | Perform login |
| JaRG | JaRG Editor Backend | Verify SSO token | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Editor Backend | Verify SSO token | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Editor Backend | Verify SSO token | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Editor Backend |  | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Editor Backend |  | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Editor Backend |  | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Editor WebApp | Identify the user | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Editor WebApp | Identify the user | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Editor WebApp | Identify the user | Firebase |  |  | Get SSO token |
| JaRG | JaRG Editor WebApp |  | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Editor WebApp |  | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Editor WebApp |  | Firebase |  |  | Get SSO token |
| JaRG | JaRG Game Backend | Verify SSO token | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Game Backend | Verify SSO token | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Game Backend | Verify SSO token | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Game Backend |  | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG | JaRG Game Backend |  | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG | JaRG Game Backend |  | Firebase |  |  | Validate SSO token |
| JaRG | JaRG Game WebApp | Identify the user | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Game WebApp | Identify the user | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Game WebApp | Identify the user | Firebase |  |  | Get SSO token |
| JaRG | JaRG Game WebApp |  | Firebase | Firebase Auth js |  | Get SSO token |
| JaRG | JaRG Game WebApp |  | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG | JaRG Game WebApp |  | Firebase |  |  | Get SSO token |
| JaRG |  |  | Firebase | Firebase Auth WebApp |  | Validate SSO token |
| JaRG |  |  | Firebase | Firebase Auth WebApp | User SSO token | Validate SSO token |
| JaRG |  |  | Firebase | Firebase Auth js |  | Perform login |
| JaRG |  |  | Firebase | Firebase Auth js | Login/Registration features | Perform login |
| JaRG |  |  | Firebase | Firebase Auth js | User Identity | Check if user is logged in |
| JaRG |  |  | Firebase | Firebase Auth js | User SSO token | Get SSO token |
| JaRG |  |  | Firebase |  |  | Perform login |

### Calls

| Source Software System | Source Container | Source Component | Target Software System | Target Container | Target Component | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Firebase | Firebase Auth js | Login/Registration features | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js | Login/Registration features | Firebase | Firebase Auth WebApp | Login/Registration features |  |
| Firebase | Firebase Auth js | User Identity | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js | User Identity | Firebase | Firebase Auth WebApp | User Identity |  |
| Firebase | Firebase Auth js | User SSO token | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js | User SSO token | Firebase | Firebase Auth WebApp | User SSO token |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp |  |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp | Login/Registration features |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp | User Identity |  |
| Firebase | Firebase Auth js |  | Firebase | Firebase Auth WebApp | User SSO token |  |

## Deployments


