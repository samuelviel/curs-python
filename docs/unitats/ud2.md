---
title: "Decisions i bucles"
---

<p class="unit-num">Unitat 2</p>

# Decisions i bucles

<p class="unit-meta"><span class="chip ra">RA3</span> <span class="chip" data-unit-chip="ud2"></span> <span class="chip">≈ 6 hores de treball</span></p>

Fins ara els programes s'executaven de dalt a baix sense pensar. Ara decidiran què fer segons les dades i repetiran tasques les vegades que calga.

## Què aprendràs

- Escriure condicions amb operadors de comparació i lògics.
- Prendre decisions amb `if`, `elif` i `else`.
- Repetir amb `while` i `for`.
- Evitar que el programa s'ature per una dada incorrecta amb `try`.
- Trobar errors executant pas a pas.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="ud2" markdown="0"></div>

## Condicions

Una **condició** és una expressió que val `True` o `False`.

| Operador | Significat | Exemple |
|---|---|---|
| `==` | Igual (dos iguals!) | `port == 22` |
| `!=` | Diferent | `estat != "actiu"` |
| `< > <= >=` | Menor, major… | `us_cpu >= 90` |
| `in` | Està dins de | `"admin" in usuari` |

!!! warning "L'error més repetit"

    `=` assigna un valor; `==` compara. `if port = 22:` dona `SyntaxError`.

## Decidir: if, elif, else

Després de la condició van **dos punts**, i el bloc que depén d'ella va **sagnat** amb 4 espais. El sagnat no és estètic: és el que diu a Python què està dins de l'`if`.

```pyrun
us_disc = int(input("Percentatge d'ús del disc: "))

if us_disc >= 90:
    print("CRÍTIC: allibera espai ja")
elif us_disc >= 75:
    print("AVÍS: el disc s'està omplint")
else:
    print("Correcte")

print("Comprovació acabada")   # fora de l'if: s'executa sempre
```

Python comprova les condicions en ordre i executa **només el primer bloc** que siga cert. `elif` i `else` són opcionals.

## Condicions compostes

| Operador | És cert quan… |
|---|---|
| `and` | les dues condicions són certes |
| `or` | almenys una és certa |
| `not` | la condició és falsa |

```pyrun
port = int(input("Port: "))

if port < 1 or port > 65535:
    print("Port no vàlid")
elif 1 <= port <= 1023:            # Python permet encadenar comparacions
    print("Port ben conegut (cal ser root)")
else:
    print("Port registrat o dinàmic")
```

## Repetir mentre: while

`while` repeteix el bloc **mentre** la condició siga certa. Úsa'l quan no saps quantes voltes caldran, per exemple, per a tornar a demanar una dada fins que siga correcta.

```pyrun
CONTRASENYA = "asix2026"
intents = 0

while intents < 3:
    clau = input("Contrasenya: ")
    if clau == CONTRASENYA:
        print("Accés concedit")
        break                       # ix del bucle
    intents += 1
    print(f"Incorrecta. Et queden {3 - intents} intents")

if intents == 3:
    print("Compte bloquejat")
```

!!! warning "Bucle infinit"

    Si dins del `while` res fa canviar la condició, no acabarà mai. A Thonny, para'l amb el botó roig **Stop** (Ctrl+F2).

## Repetir N vegades: for

`for` recorre una seqüència d'elements. Amb `range()` generes números:

| Crida | Genera |
|---|---|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 |
| `range(10, 0, -2)` | 10, 8, 6, 4, 2 |

```pyrun
# Generar els noms dels equips d'una aula
for i in range(1, 6):
    print(f"pc-aula213-{i:02}")

# Recórrer els caràcters d'un text
for lletra in "eth0":
    print(lletra)
```

### Comptadors i acumuladors

Dos patrons que usaràs sempre: un **comptador** suma 1 cada vegada que passa alguna cosa; un **acumulador** va sumant valors.

```pyrun
total_gb = 0        # acumulador
grans = 0           # comptador

for n in range(1, 4):
    mida = float(input(f"Mida del disc {n} (GB): "))
    total_gb += mida
    if mida > 500:
        grans += 1

print(f"Total: {total_gb} GB. Discos de més de 500 GB: {grans}")
```

## Controlar errors d'entrada: try

Si l'usuari escriu `abc` on esperaves un número, `int()` llança un `ValueError`. Amb `try / except` captures l'error i continues. Combinat amb `while`, el programa insisteix fins que la dada és bona:

```pyrun
while True:
    try:
        port = int(input("Port (1-65535): "))
        if 1 <= port <= 65535:
            break
        print("Fora de rang")
    except ValueError:
        print("Això no és un número")

print("Port acceptat:", port)
```

## Depurar amb Thonny

**Depurar** és buscar i corregir errors. Quan el programa no falla però fa una cosa que no esperaves, executa'l pas a pas:

1. Activa **Visualitza → Variables**.
2. Prem el botó de l'insecte (**Depura**, Ctrl+F5).
3. Usa **Pas per damunt** (F6) per a avançar línia a línia i mira com canvien les variables.
4. Quan veges un valor que no esperaves, ja saps on està l'error.

Un altre truc senzill: posar `print()` temporals per a veure valors intermedis. Prova de trobar l'error d'aquest programa, que hauria de sumar de l'1 al 10:

```pyrun
suma = 0
for i in range(1, 10):
    suma += i
    # print(f"i={i} suma={suma}")   # descomenta per a investigar
print("Suma de l'1 al 10:", suma)    # hauria de ser 55
```

## Exercicis

#### 1. Parell o senar <span class="nivell n1">Bàsic</span>

Passa a Python l'exercici 2 de la UD0.

#### 2. Classe d'una adreça IPv4 <span class="nivell n1">Bàsic</span>

Demana el primer octet d'una IPv4 i indica la classe (A: 1–126, B: 128–191, C: 192–223) o si no és vàlid.

#### 3. Menú d'administració <span class="nivell n2">Mitjà</span>

Mostra un menú amb les opcions 1) Mostrar data 2) Calcular hosts 3) Eixir. El programa repeteix el menú fins que l'usuari tria 3. De moment, les opcions 1 i 2 poden mostrar només un missatge.

#### 4. Taula de potències de 2 <span class="nivell n2">Mitjà</span>

Mostra una taula de /24 a /30 amb el nombre de hosts útils de cada màscara, ben alineada.

#### 5. Endevina el port <span class="nivell n3">Repte</span>

El programa tria un número a l'atzar entre 1 i 100 amb `import random` i `random.randint(1, 100)`. L'usuari té 7 intents; després de cada intent, el programa diu «més alt» o «més baix». Controla les entrades no numèriques.

## Tasca d'Aules

!!! tasca "T3 · Monitor de recursos (simulat)"

    Programa que demana, per a 5 servidors, el nom i el percentatge de CPU. Per a cada un mostra OK, AVÍS (≥ 75) o CRÍTIC (≥ 90). Al final mostra quants n'hi ha de cada tipus i la mitjana de CPU. Ha de tornar a demanar el percentatge si no és un número entre 0 i 100.

## Comprova-ho

```quiz
[
 {
  "p": "Què passa si oblides els dos punts al final d'un if?",
  "o": [
   "Res",
   "SyntaxError",
   "El bloc s'executa sempre",
   "Python els afegeix"
  ],
  "c": 1,
  "e": "Els dos punts són obligatoris després de if, elif, else, while i for."
 },
 {
  "p": "Quants números genera range(2, 8)?",
  "o": [
   "8",
   "7",
   "6",
   "5"
  ],
  "c": 2,
  "pista": "El final no s'inclou.",
  "e": "2, 3, 4, 5, 6 i 7: sis números."
 },
 {
  "p": "Quan és certa la condició (a > 0 and b > 0)?",
  "o": [
   "Si a o b són positius",
   "Només si tots dos són positius",
   "Si cap és positiu",
   "Sempre"
  ],
  "c": 1,
  "e": "and necessita que les dues parts siguen certes."
 },
 {
  "p": "Quin bucle és més adequat per a demanar una contrasenya fins que siga correcta?",
  "o": [
   "for amb range",
   "while",
   "if",
   "try"
  ],
  "c": 1,
  "e": "No saps quantes voltes caldran: while."
 },
 {
  "p": "Què fa break dins d'un bucle?",
  "o": [
   "Para el programa sencer",
   "Salta a la següent volta",
   "Ix del bucle immediatament",
   "Reinicia el bucle"
  ],
  "c": 2,
  "e": "break acaba el bucle; el programa continua després d'ell."
 },
 {
  "p": "Quin error captures per a controlar que int(input()) reba un text no numèric?",
  "o": [
   "TypeError",
   "NameError",
   "ValueError",
   "SyntaxError"
  ],
  "c": 2,
  "e": "int(\"abc\") llança ValueError."
 }
]
```
