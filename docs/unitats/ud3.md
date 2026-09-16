---
title: "Funcions i mòduls"
---

<p class="unit-num">Unitat 3</p>

# Funcions i mòduls

<p class="unit-meta"><span class="chip ra">RA2</span> <span class="chip ra">RA5</span> <span class="chip" data-unit-chip="ud3"></span> <span class="chip">≈ 4 hores de treball</span></p>

Quan un tros de codi es repeteix, li poses nom i el tornes a usar. Això és una funció. I quan algú ja l'ha escrita per tu, l'importes d'una llibreria.

## Què aprendràs

- Definir funcions amb paràmetres i valor de retorn.
- Distingir entre `return` i `print`.
- Entendre que les variables d'una funció són locals.
- Importar llibreries estàndard i crear el teu propi mòdul.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="ud3" markdown="0"></div>

## Per què funcions

Imagina que en cinc llocs del programa has de calcular els hosts d'una xarxa. Si copies la fórmula cinc vegades i després trobes un error, l'has de corregir en cinc llocs. Amb una funció, l'escrius una vegada i la **crides** quan la necessites. A més, el programa es llig com una llista de tasques amb nom.

## Definir i cridar

```pyrun
def saluda():
    print("Benvingut al sistema")
    print("-" * 22)

saluda()     # la cridem
saluda()     # i una altra vegada
```

`def`, el nom, parèntesis, dos punts i el cos sagnat. Definir una funció no l'executa: només s'executa quan la crides.

### Paràmetres

Els **paràmetres** són les dades que la funció necessita. Quan la crides, li passes els **arguments**.

```pyrun
def crea_usuari(nom, grup):
    print(f"useradd -m -G {grup} {nom}")

crea_usuari("anna", "asix")
crea_usuari("pau", "daw")
```

### Valors per defecte

```pyrun
def crea_usuari(nom, grup="alumnes", shell="/bin/bash"):
    print(f"useradd -m -G {grup} -s {shell} {nom}")

crea_usuari("marta")                       # usa els valors per defecte
crea_usuari("admin", "sudo")
crea_usuari("backup", shell="/usr/sbin/nologin")   # per nom
```

## Retornar un resultat

`return` torna un valor a qui ha cridat la funció, que el pot guardar en una variable, operar-lo o mostrar-lo. `return` també acaba la funció.

```pyrun
def hosts_utils(mascara):
    """Retorna el nombre de hosts útils d'una xarxa IPv4."""
    return 2 ** (32 - mascara) - 2

h = hosts_utils(24)
print("Una /24 té", h, "hosts")
print("Dues /26 sumen", hosts_utils(26) * 2, "hosts")
```

!!! tip "return o print?"

    Una funció que **calcula** hauria de fer `return` i deixar que qui la crida decidisca què fer amb el resultat. Una funció que fa `print` només serveix per a mostrar-lo; no el pots aprofitar per a un altre càlcul.

El text entre triples cometes just després del `def` és la **docstring**: explica què fa la funció. Escriu-ne sempre una.

### Retornar més d'un valor

```pyrun
def hores_minuts(segons):
    return segons // 3600, (segons % 3600) // 60

h, m = hores_minuts(7500)
print(f"{h} h {m} min")
```

## Àmbit de les variables

Les variables creades dins d'una funció són **locals**: existeixen només mentre la funció s'executa. Per a comunicar-se amb l'exterior, usa paràmetres i `return`, no variables globals.

```pyrun
def calcula():
    resultat = 42
    return resultat

calcula()
print(resultat)   # NameError: fora de la funció no existeix
```

## Llibreries: import

Python porta centenars de mòduls ja fets (la *biblioteca estàndard*). Per a usar-ne un, l'importes al principi del fitxer.

```pyrun
import math
import random
from datetime import datetime

print(math.sqrt(144))
print(math.ceil(4.1))                 # arredoneix cap amunt
print(random.randint(1, 6))           # dau
print(random.choice(["web01", "web02", "web03"]))
print(datetime.now().strftime("%d/%m/%Y %H:%M"))
```

| Mòdul | Per a què l'usaràs |
|---|---|
| `math` | Arrels, arredoniments, logaritmes |
| `random` | Números i eleccions a l'atzar, contrasenyes |
| `datetime` | Dates i hores (noms de còpies de seguretat) |
| `os`, `platform` | Informació del sistema operatiu |
| `ipaddress` | Treballar amb IP i xarxes de veritat |

```pyrun
import ipaddress

xarxa = ipaddress.ip_network("192.168.10.0/26")
print("Hosts útils:", xarxa.num_addresses - 2)
print("Màscara:", xarxa.netmask)
print("Broadcast:", xarxa.broadcast_address)
print("És privada?", xarxa.is_private)
```

## El teu propi mòdul

Qualsevol fitxer `.py` és un mòdul. Si guardes les teues funcions a `eines_xarxa.py`, pots importar-les des d'un altre fitxer de la **mateixa carpeta**:

```python
# eines_xarxa.py
def hosts_utils(mascara):
    """Retorna el nombre de hosts útils d'una xarxa IPv4."""
    return 2 ** (32 - mascara) - 2

if __name__ == "__main__":
    # Açò només s'executa si llances eines_xarxa.py directament,
    # no quan un altre programa l'importa. Ideal per a proves.
    print(hosts_utils(24))
```

```python
# principal.py
from eines_xarxa import hosts_utils

m = int(input("Màscara: "))
print("Hosts:", hosts_utils(m))
```

## Exercicis

#### 1. Conversor <span class="nivell n1">Bàsic</span>

Escriu `bytes_a_gb(bytes)` que retorne els GB amb dos decimals. Prova-la amb tres valors.

#### 2. És vàlid? <span class="nivell n1">Bàsic</span>

Escriu `port_valid(port)` que retorne `True` o `False`. Usa-la en un programa que demane un port.

#### 3. Generador de contrasenyes <span class="nivell n2">Mitjà</span>

Escriu `genera_contrasenya(longitud=12)` que retorne una contrasenya aleatòria. Pista: `import string` i `string.ascii_letters + string.digits`; tria caràcters amb `random.choice` dins d'un bucle.

#### 4. Menú amb funcions <span class="nivell n2">Mitjà</span>

Reescriu el menú de la UD2 perquè cada opció siga una funció.

#### 5. Mòdul d'eines <span class="nivell n3">Repte</span>

Crea `eines_asix.py` amb almenys tres funcions de la teua elecció i un `principal.py` que les importe i les use amb un menú.

## Tasca d'Aules

!!! tasca "T4 · La meua caixa d'eines"

    Lliura l'exercici 5 (els dos fitxers). Cada funció ha de tindre docstring, i el mòdul ha d'incloure el bloc `if __name__ == "__main__":` amb proves.

## Comprova-ho

```quiz
[
 {
  "p": "Què fa la paraula def?",
  "o": [
   "Executa una funció",
   "Defineix una funció",
   "Importa una llibreria",
   "Declara una variable"
  ],
  "c": 1,
  "e": "def crea la funció; s'executa quan la crides."
 },
 {
  "p": "Quina diferència hi ha entre return i print?",
  "o": [
   "Cap",
   "return torna el valor a qui crida; print només el mostra",
   "print és més ràpid",
   "return mostra per pantalla"
  ],
  "c": 1,
  "e": "Amb return pots guardar i reutilitzar el resultat."
 },
 {
  "p": "Si una funció no té return, què retorna?",
  "o": [
   "0",
   "Un text buit",
   "None",
   "Error"
  ],
  "c": 2,
  "e": "Retorna None, el valor «res» de Python."
 },
 {
  "p": "Com importes només la funció sqrt del mòdul math?",
  "o": [
   "import sqrt",
   "from math import sqrt",
   "math.import(sqrt)",
   "include math.sqrt"
  ],
  "c": 1,
  "e": "from mòdul import nom."
 },
 {
  "p": "Una variable creada dins d'una funció…",
  "o": [
   "és visible a tot el programa",
   "només existeix dins de la funció",
   "es guarda al disc",
   "és una constant"
  ],
  "c": 1,
  "pista": "Pensa en l'àmbit.",
  "e": "És local."
 }
]
```
