---
title: "Cadenes, llistes i diccionaris"
---

<p class="unit-num">Unitat 4</p>

# Cadenes, llistes i diccionaris

<p class="unit-meta"><span class="chip ra">RA6</span> <span class="chip" data-unit-chip="ud4"></span> <span class="chip">≈ 6 hores de treball</span></p>

Un administrador no gestiona un equip: en gestiona cinquanta. Ara aprendrem a guardar moltes dades juntes i a recórrer-les.

## Què aprendràs

- Accedir a parts d'un text i usar els mètodes més útils de les cadenes.
- Crear, modificar i recórrer llistes.
- Guardar dades amb nom en diccionaris.
- Combinar-les: una llista de diccionaris és un inventari.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="ud4" markdown="0"></div>

## Cadenes a fons

### Índexs i porcions

Cada caràcter té una posició que comença en **0**. Els índexs negatius compten des del final.

```pyrun
iface = "enp0s3"
print(iface[0])      # e
print(iface[-1])     # 3
print(iface[0:3])    # enp   (del 0 al 2, el 3 no s'inclou)
print(iface[3:])     # 0s3
print(len(iface))    # 6
```

Les cadenes són **immutables**: `iface[0] = "E"` dona error. Per a «canviar» un text, en crees un de nou.

### Mètodes útils

| Mètode | Què fa | Exemple → resultat |
|---|---|---|
| `.lower()` · `.upper()` | Minúscules / majúscules | `"ADMIN".lower()` → `"admin"` |
| `.strip()` | Lleva espais i salts de línia dels extrems | `"  pc01\n".strip()` → `"pc01"` |
| `.split(sep)` | Trosseja en una llista | `"10.0.0.1".split(".")` → `['10','0','0','1']` |
| `sep.join(llista)` | Uneix una llista en un text | `"-".join(["a","b"])` → `"a-b"` |
| `.replace(a, b)` | Substitueix | `"pc 01".replace(" ", "")` |
| `.startswith()` · `.endswith()` | Comença o acaba per | `"log.txt".endswith(".txt")` → `True` |
| `.isdigit()` | Només conté dígits | `"443".isdigit()` → `True` |

```pyrun
linia = "  Failed password for root from 203.0.113.7 port 52211 ssh2  "
parts = linia.strip().split()
print(parts)
print("Usuari:", parts[3])
print("IP:", parts[5])
```

## Llistes

Una **llista** guarda diversos valors en ordre, entre claudàtors. Al contrari que les cadenes, es pot modificar.

```pyrun
servidors = ["web01", "web02", "bd01"]
print(servidors[0])          # web01
print(len(servidors))        # 3

servidors.append("dns01")    # afegir al final
servidors.remove("web02")    # esborrar per valor
servidors[0] = "web01-nou"   # canviar un element
servidors.sort()             # ordenar
print(servidors)
print("bd01" in servidors)   # True
```

| Operació | Codi |
|---|---|
| Afegir al final | `llista.append(x)` |
| Inserir en una posició | `llista.insert(0, x)` |
| Traure i obtindre l'últim | `llista.pop()` |
| Esborrar per valor | `llista.remove(x)` |
| Quantes vegades apareix | `llista.count(x)` |
| Suma, màxim, mínim | `sum(l)`, `max(l)`, `min(l)` |

### Recórrer una llista

```pyrun
latencies = [12, 15, 230, 14, 18, 190]

for ms in latencies:
    marca = "  ← lenta" if ms > 100 else ""
    print(f"{ms:>4} ms{marca}")

print(f"Mitjana: {sum(latencies) / len(latencies):.1f} ms")
print("Màxima:", max(latencies), "ms")
```

Si necessites també la posició, usa `enumerate`: `for i, ms in enumerate(latencies):`.

### Construir una llista a partir d'una altra

```pyrun
latencies = [12, 15, 230, 14, 18, 190]
lentes = []
for ms in latencies:
    if ms > 100:
        lentes.append(ms)
print(lentes)

# El mateix en una línia (llista per comprensió). Opcional.
print([ms for ms in latencies if ms > 100])
```

### Tuples

Una **tupla** és com una llista però no es pot modificar. S'escriu amb parèntesis: `("10.0.0.1", 22)`. S'usa per a dades que van juntes i no han de canviar.

## Diccionaris

Un **diccionari** guarda parelles **clau → valor**. En lloc de recordar que la IP està a la posició 1, li poses nom.

```pyrun
equip = {"nom": "pc-213-05", "ip": "10.0.213.5", "ram": 16}

print(equip["ip"])
equip["ram"] = 32                  # modificar
equip["so"] = "Ubuntu 24.04"       # afegir clau nova
print(equip.get("mac", "desconeguda"))   # get no falla si no existeix

for clau, valor in equip.items():
    print(f"{clau:>5}: {valor}")
```

!!! warning "KeyError"

    `equip["mac"]` falla si la clau no existeix. Si no n'estàs segur, usa `equip.get("mac")` o comprova-ho abans amb `"mac" in equip`.

### Comptar coses amb un diccionari

Patró molt útil per a analitzar logs: la clau és el que compte, el valor és quantes vegades apareix.

```pyrun
ips = ["203.0.113.7", "198.51.100.2", "203.0.113.7", "203.0.113.7", "198.51.100.2"]
intents = {}
for ip in ips:
    intents[ip] = intents.get(ip, 0) + 1

for ip, n in intents.items():
    print(f"{ip:<15} {n} intents")
```

## Llista de diccionaris: un inventari

```pyrun
inventari = [
    {"nom": "web01", "ip": "10.0.0.10", "ram": 8,  "actiu": True},
    {"nom": "bd01",  "ip": "10.0.0.20", "ram": 32, "actiu": True},
    {"nom": "old01", "ip": "10.0.0.99", "ram": 2,  "actiu": False},
]

print(f"{'NOM':<8}{'IP':<12}{'RAM':>5}")
for e in inventari:
    if e["actiu"]:
        print(f"{e['nom']:<8}{e['ip']:<12}{e['ram']:>4}G")

ram_total = sum(e["ram"] for e in inventari if e["actiu"])
print("RAM total activa:", ram_total, "GB")
```

## Exercicis

#### 1. Validar una IPv4 <span class="nivell n1">Bàsic</span>

Escriu `ip_valida(text)`: ha de tindre 4 parts separades per punts, totes numèriques i entre 0 i 255.

#### 2. Usuaris a partir de noms <span class="nivell n1">Bàsic</span>

A partir de la llista `["Anna Puig", "Pau Ferrer", "Marta Soler"]`, genera noms d'usuari amb la inicial i el cognom en minúscules: `apuig`, `pferrer`…

#### 3. Estadístiques de ping <span class="nivell n2">Mitjà</span>

Demana latències fins que l'usuari escriga una línia buida. Mostra la mínima, la màxima, la mitjana i quantes superen 100 ms.

#### 4. Ports i serveis <span class="nivell n2">Mitjà</span>

Crea un diccionari amb almenys 8 ports i el seu servei (22 → ssh, 80 → http…). El programa pregunta un port i diu el servei, o «desconegut».

#### 5. Inventari amb menú <span class="nivell n3">Repte</span>

Programa amb menú per a gestionar un inventari (llista de diccionaris): afegir equip, llistar, buscar per nom i donar de baixa. Usa funcions.

## Tasca d'Aules

!!! tasca "T5 · Inventari de l'aula"

    Lliura l'exercici 5. Guarda'l bé: a la UD5 afegirem que l'inventari es guarde en un fitxer i, a la UD6, el convertirem en classes.

## Comprova-ho

```quiz
[
 {
  "p": "Què val \"servidor\"[0:3]?",
  "o": [
   "ser",
   "serv",
   "erv",
   "s"
  ],
  "c": 0,
  "pista": "L'índex final no s'inclou.",
  "e": "Posicions 0, 1 i 2."
 },
 {
  "p": "Què retorna \"a,b,c\".split(\",\")?",
  "o": [
   "\"abc\"",
   "['a', 'b', 'c']",
   "('a','b','c')",
   "3"
  ],
  "c": 1,
  "e": "split trosseja el text i retorna una llista."
 },
 {
  "p": "Com afiges \"pc07\" al final de la llista equips?",
  "o": [
   "equips.add(\"pc07\")",
   "equips + \"pc07\"",
   "equips.append(\"pc07\")",
   "equips[end] = \"pc07\""
  ],
  "c": 2,
  "e": "append afig un element al final."
 },
 {
  "p": "Quin és l'índex de l'últim element d'una llista de 10 elements?",
  "o": [
   "10",
   "9",
   "-0",
   "11"
  ],
  "c": 1,
  "e": "Comença en 0: l'últim és el 9 (o -1)."
 },
 {
  "p": "Què fa d.get(\"mac\", \"?\") si la clau no existeix?",
  "o": [
   "KeyError",
   "Retorna \"?\"",
   "Crea la clau",
   "Retorna None sempre"
  ],
  "c": 1,
  "e": "get retorna el valor per defecte que li indiques."
 },
 {
  "p": "Quina estructura triaries per a guardar la IP, el nom i la RAM d'un equip?",
  "o": [
   "Una cadena",
   "Un diccionari",
   "Un int",
   "Un bool"
  ],
  "c": 1,
  "e": "Dades amb nom: diccionari."
 }
]
```
