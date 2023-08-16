# JaRG Editor Backend

## Components

| Component | Description |
| --- | --- |
| Edit Characters services |  |
| Edit Map services |  |
| Edit Missions services |  |
| Manages user accesses and grants |  |
| Verify SSO token |  |

## Diagrams

### JaRG - JaRG Editor Backend - Components

Description: Component view of JaRG Editor Backend

![component JaRG JaRG Editor Backend](../../../images/component%20JaRG%20JaRG%20Editor%20Backend.png)

[png](../../../images/component%20JaRG%20JaRG%20Editor%20Backend.png) | [svg](../../../images/component%20JaRG%20JaRG%20Editor%20Backend.svg)


## Relationships

### Used By

| Element | Description | Tags |
| --- | --- | --- |
| [Manages user accesses and grants](../../../software-systems/JaRG/JaRG%20Editor%20WebApp/README.md) |  | Element,Component |
| [Update characters](../../../software-systems/JaRG/JaRG%20Editor%20WebApp/README.md) | Allow to add/modify/delete missions | Element,Component |
| [Update maps](../../../software-systems/JaRG/JaRG%20Editor%20WebApp/README.md) | Allow to add/modify/delete missions | Element,Component |
| [Update missions](../../../software-systems/JaRG/JaRG%20Editor%20WebApp/README.md) | Allow to add/modify/delete missions | Element,Component |
| [JaRG Editor WebApp](../../../software-systems/JaRG/JaRG%20Editor%20WebApp/README.md) | Allows authorized users to update the game content | Element,Container |

### Uses

| Element | Description | Tags |
| --- | --- | --- |
| [Firebase Auth WebApp](../../../software-systems/Firebase/Firebase%20Auth%20WebApp/README.md) | Manages user authentication | Element,Container |
| [User SSO token](../../../software-systems/Firebase/Firebase%20Auth%20WebApp/README.md) |  | Element,Component |
| [Firebase](../../../software-systems/Firebase/README.md) |  | Element,Software System |
| [Database](../../../software-systems/JaRG/Database/README.md) |  | Element,Container |
| [Characters](../../../software-systems/JaRG/Database/README.md) |  | Element,Component |
| [Maps](../../../software-systems/JaRG/Database/README.md) |  | Element,Component |
| [Missions](../../../software-systems/JaRG/Database/README.md) |  | Element,Component |
| [Users](../../../software-systems/JaRG/Database/README.md) |  | Element,Component |

