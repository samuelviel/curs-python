---
title: "Primers passos amb Python"
---

<p class="unit-num">Unitat 1</p>

# Primers passos amb Python

<p class="unit-meta"><span class="chip ra">RA1</span> <span class="chip ra">RA2</span> <span class="chip" data-unit-chip="ud1"></span> <span class="chip">≈ 5 hores de treball</span></p>

Guardar dades en variables, demanar-les a l'usuari, fer càlculs i mostrar resultats ben presentats. Amb això ja pots fer programes útils.

## Què aprendràs

- Mostrar informació amb `print()` i demanar-la amb `input()`.
- Crear variables i reconéixer els tipus bàsics: `int`, `float`, `str`, `bool`.
- Operar amb números i textos, i convertir d'un tipus a un altre.
- Formatar l'eixida amb f-strings.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="ud1" markdown="0"></div>

## Mostrar per pantalla: print

`print()` mostra el que li passes entre parèntesis. Si li passes diverses coses separades per comes, les separa amb un espai.

```pyrun
print("Hola, món")
print("Servidor:", "web01", "Port:", 443)
print()                      # línia en blanc
print("Línia 1\nLínia 2")    # \n és un salt de línia
```

Les línies que comencen per `#` són **comentaris**: Python les ignora. Serveixen per a explicar el codi a qui el llegirà, que sovint seràs tu d'ací a un mes.

## Variables

Una **variable** és un nom que apunta a un valor. Es crea la primera vegada que li assignes alguna cosa amb `=`, i el valor pot canviar després.

```pyrun
hostname = "srv-bd01"
cpus = 4
cpus = cpus * 2          # ara val 8
print(hostname, "té", cpus, "nuclis")
```

### Com posar noms

- Lletres, números i guió baix. No pot començar per número: `disc1` sí, `1disc` no.
- Distingeix majúscules: `Nom` i `nom` són variables diferents.
- En Python s'escriu en minúscules separant paraules amb `_` (*snake_case*): `espai_lliure`.
- No pots usar paraules reservades com `if`, `for`, `class` o `True`.
- Les **constants** s'escriuen en majúscules per convenció: `MAX_INTENTS = 3`.

## Tipus de dades bàsics

| Tipus | Què guarda | Exemples |
|---|---|---|
| `int` | Enters | `22`, `-5`, `65535` |
| `float` | Decimals (amb punt) | `3.14`, `0.5`, `99.9` |
| `str` | Text, entre cometes | `"eth0"`, `'192.168.1.1'` |
| `bool` | Cert o fals | `True`, `False` |

La funció `type()` et diu el tipus d'un valor:

```pyrun
print(type(22))
print(type(22.0))
print(type("22"))
print(type(22 > 10))
```

!!! warning "Compte"

    `22` i `"22"` no són el mateix. El primer és un número; el segon, un text que conté els caràcters 2 i 2.

## Demanar dades: input

`input()` mostra un missatge, espera que l'usuari escriga i prema Intro, i retorna el que ha escrit. **Sempre retorna text (`str`)**, encara que l'usuari escriga un número.

```pyrun
nom = input("Nom d'usuari: ")
print("Creant el compte de", nom)
```

Mira què passa quan intentes sumar dos números llegits amb `input()`:

```pyrun
a = input("Primer número: ")
b = input("Segon número: ")
print("Suma:", a + b)     # 2 i 3 donen... 23!
```

Com són textos, `+` els **concatena**. Cal convertir-los abans.

## Convertir tipus

| Funció | Converteix a | Exemple |
|---|---|---|
| `int()` | Enter | `int("42")` → `42` |
| `float()` | Decimal | `float("3.5")` → `3.5` |
| `str()` | Text | `str(80)` → `"80"` |
| `round()` | Arredoneix | `round(2.678, 2)` → `2.68` |

```pyrun
a = int(input("Primer número: "))
b = int(input("Segon número: "))
print("Suma:", a + b)
```

Si l'usuari escriu una lletra, `int()` falla amb un `ValueError`. De moment és normal; a la UD2 aprendrem a controlar-ho.

## Operadors

### Aritmètics

| Operador | Operació | Exemple | Resultat |
|---|---|---|---|
| `+ - *` | Suma, resta, producte | `4 * 3` | `12` |
| `/` | Divisió (sempre dona `float`) | `10 / 2` | `5.0` |
| `//` | Divisió entera | `17 // 5` | `3` |
| `%` | Residu (mòdul) | `17 % 5` | `2` |
| `**` | Potència | `2 ** 8` | `256` |

L'ordre és el de matemàtiques: primer `**`, després `* / // %` i finalment `+ -`. En cas de dubte, usa parèntesis.

!!! asix "A ASIX"

    `//` i `%` són perfectes per a passar segons a hores i minuts, i `**` per a calcular quants hosts caben en una xarxa.

```pyrun
# Uptime: passar segons a hores i minuts
segons = 200000
hores = segons // 3600
minuts = (segons % 3600) // 60
print("Uptime:", hores, "h", minuts, "min")

# Hosts útils d'una xarxa /24
mascara = 24
hosts = 2 ** (32 - mascara) - 2
print("Una /24 té", hosts, "hosts útils")
```

### D'assignació

`x += 1` és una forma curta de `x = x + 1`. Igual amb `-=`, `*=` i `/=`.

### Amb textos

```pyrun
usuari = "anna"
domini = "iesmariaenriquez.es"
print(usuari + "@" + domini)   # concatenar
print("-" * 30)                # repetir
print(len(domini))             # quants caràcters té
```

## Eixida amb format: f-strings

Posant una `f` davant de les cometes, pots ficar variables i càlculs dins del text entre claus `{}`. És la manera recomanada de mostrar resultats.

```pyrun
servidor = "web01"
usat = 187.456
total = 250
print(f"{servidor}: {usat} GB de {total} GB")
print(f"Ocupació: {usat / total * 100:.1f}%")   # 1 decimal
print(f"|{servidor:<10}|{usat:>10.2f}|")       # alinear
```

| Format | Què fa |
|---|---|
| `{x:.2f}` | Dos decimals |
| `{x:8}` | Ocupa 8 caràcters |
| `{x:<8}` · `{x:>8}` · `{x:^8}` | Alinea a l'esquerra, dreta o centre |
| `{x:05}` | Omple amb zeros: `00042` |
| `{x:,}` | Separador de milers |

## Errors típics d'aquesta unitat

??? question "SyntaxError: unterminated string literal"

    Has obert unes cometes i no les has tancat: `print("Hola)`.

??? question "NameError: name 'nom' is not defined"

    Uses una variable que no existeix: l'has escrita malament o encara no li has donat valor.

??? question "TypeError: can only concatenate str (not 'int') to str"

    Intentes sumar text i número: `"Port " + 22`. Usa una coma a `print`, una f-string o `str(22)`.

??? question "ValueError: invalid literal for int()"

    Has fet `int()` d'un text que no és un número, per exemple `int("3.5")` o `int("tres")`.

## Exercicis

Recorda: primer en paper (entrada, procés, eixida), després a Thonny. Guarda'ls a la carpeta `ud1`.

#### 1. Fitxa de l'equip <span class="nivell n1">Bàsic</span>

Demana el nom d'un equip, la seua IP i la quantitat de RAM en GB. Mostra-ho així:

```text
Equip: pc-aula12 | IP: 10.0.12.5 | RAM: 16 GB
```

#### 2. De bytes a gigabytes <span class="nivell n1">Bàsic</span>

Demana una mida en bytes i mostra-la en MB i GB amb dos decimals (1 GB = 1024³ bytes).

#### 3. Temps de descàrrega <span class="nivell n2">Mitjà</span>

Demana la mida d'una ISO en GB i la velocitat de la connexió en Mbps. Calcula quants minuts tardarà a descarregar-se. Pista: 1 byte = 8 bits.

#### 4. Hosts d'una xarxa <span class="nivell n2">Mitjà</span>

Demana la longitud de la màscara (per exemple 26) i mostra el nombre total d'adreces i de hosts útils.

#### 5. Uptime complet <span class="nivell n3">Repte</span>

Demana un nombre de segons i mostra'l en dies, hores, minuts i segons, amb el format `3d 04:05:09`.

??? question "Pista per a l'exercici 5"

    Un dia té 86400 segons. Usa `//` per a traure els dies i `%` per a quedar-te amb la resta. Repeteix amb hores i minuts. Per als zeros de davant, `{h:02}`.

## Tasca d'Aules

!!! tasca "T2 · Calculadora de l'administrador"

    Un únic programa `calculadora_asix.py` que faça els exercicis 2, 3 i 4 un darrere de l'altre, amb una eixida ben formatada amb f-strings. Posa el teu nom en un comentari a la primera línia.

## Comprova-ho

```quiz
[
 {
  "p": "Quin tipus de dada retorna sempre input()?",
  "o": [
   "int",
   "float",
   "str",
   "Depén del que escriga l'usuari"
  ],
  "c": 2,
  "e": "Sempre text. Si necessites un número, converteix-lo amb int() o float()."
 },
 {
  "p": "Quant val 17 % 5?",
  "o": [
   "3",
   "2",
   "3.4",
   "85"
  ],
  "c": 1,
  "pista": "És el residu de la divisió entera.",
  "e": "17 = 5·3 + 2, el residu és 2."
 },
 {
  "p": "Quin nom de variable és vàlid i segueix l'estil de Python?",
  "o": [
   "2usuaris",
   "espai lliure",
   "espaiLliure",
   "espai_lliure"
  ],
  "c": 3,
  "e": "snake_case: minúscules i guió baix."
 },
 {
  "p": "Què mostra print(f\"{3.14159:.2f}\")?",
  "o": [
   "3.14159",
   "3.14",
   "3.1",
   "3"
  ],
  "c": 1,
  "e": ".2f vol dir dos decimals."
 },
 {
  "p": "Quin és el resultat de 10 / 2?",
  "o": [
   "5",
   "5.0",
   "\"5\"",
   "Error"
  ],
  "c": 1,
  "e": "L'operador / sempre retorna un float."
 },
 {
  "p": "Què fa \"=\" * 5?",
  "o": [
   "Error",
   "=====",
   "5",
   "Compara amb 5"
  ],
  "c": 1,
  "e": "Multiplicar un text el repeteix."
 }
]
```
