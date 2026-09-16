---
title: "Fitxers i scripts de sistema"
---

<p class="unit-num">Unitat 5</p>

# Fitxers i scripts de sistema

<p class="unit-meta"><span class="chip ra">RA5</span> <span class="chip" data-unit-chip="ud5"></span> <span class="chip">≈ 6 hores de treball</span></p>

Les dades que viuen només en variables desapareixen en tancar el programa. Ara llegirem logs, guardarem informes i escriurem scripts que es poden llançar des del terminal.

## Què aprendràs

- Obrir, llegir i escriure fitxers de text amb `with open()`.
- Llegir i generar fitxers CSV.
- Moure't per carpetes amb `pathlib`.
- Fer scripts que reben arguments i executen ordres del sistema.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="ud5" markdown="0"></div>

## Obrir un fitxer

La forma correcta és amb `with`: el fitxer es tanca sol en acabar el bloc, encara que hi haja un error.

| Mode | Per a què | Si el fitxer no existeix |
|---|---|---|
| `"r"` | Llegir (per defecte) | Error |
| `"w"` | Escriure des de zero (esborra el que hi havia!) | El crea |
| `"a"` | Afegir al final | El crea |

Indica sempre `encoding="utf-8"` perquè els accents es vegen bé en Windows i Linux.

## Escriure

```pyrun
with open("equips.txt", "w", encoding="utf-8") as f:
    f.write("web01\n")
    f.write("bd01\n")

with open("equips.txt", "a", encoding="utf-8") as f:
    f.write("dns01\n")

print("Fitxer escrit")
```

`write()` no afig salt de línia: posa tu el `\n`.

## Llegir

La manera més habitual és recórrer el fitxer línia a línia amb `for`. Cada línia porta el `\n` final: lleva'l amb `strip()`.

```pyrun
# Creem un log d'exemple
with open("auth.log", "w", encoding="utf-8") as f:
    f.write("""Oct 15 10:01:02 srv sshd[811]: Failed password for root from 203.0.113.7 port 52211 ssh2
Oct 15 10:01:09 srv sshd[811]: Failed password for root from 203.0.113.7 port 52213 ssh2
Oct 15 10:02:11 srv sshd[902]: Accepted password for anna from 10.0.213.5 port 40022 ssh2
Oct 15 10:03:40 srv sshd[915]: Failed password for admin from 198.51.100.2 port 60001 ssh2
Oct 15 10:03:44 srv sshd[915]: Failed password for root from 203.0.113.7 port 52290 ssh2
""")

# L'analitzem
fallits = {}
with open("auth.log", encoding="utf-8") as f:
    for linia in f:
        if "Failed password" in linia:
            ip = linia.split(" from ")[1].split()[0]
            fallits[ip] = fallits.get(ip, 0) + 1

for ip, n in fallits.items():
    print(f"{ip:<15} {n} intents fallits")
```

Altres formes: `f.read()` torna tot el fitxer en un sol text i `f.readlines()`, una llista de línies. Per a fitxers grans, el `for` és millor perquè no carrega tot en memòria.

### Si el fitxer no existeix

```pyrun
try:
    with open("no_existeix.txt", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("No trobe el fitxer. Comprova el nom i la carpeta.")
```

## Fitxers CSV

Un **CSV** és una taula en text: una fila per línia i les columnes separades per comes. S'obri amb LibreOffice Calc o Excel. El mòdul `csv` s'encarrega de les cometes i els separadors.

```pyrun
import csv

inventari = [
    {"nom": "web01", "ip": "10.0.0.10", "ram": 8},
    {"nom": "bd01", "ip": "10.0.0.20", "ram": 32},
]

# Escriure
with open("inventari.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["nom", "ip", "ram"])
    w.writeheader()
    w.writerows(inventari)

# Llegir
with open("inventari.csv", newline="", encoding="utf-8") as f:
    for fila in csv.DictReader(f):
        print(fila["nom"], "→", fila["ip"], f"({fila['ram']} GB)")
```

!!! warning "Tot el que llegeixes és text"

    Des d'un CSV, `fila["ram"]` és `"8"`, no `8`. Converteix-lo amb `int()` abans de sumar.

## Rutes i carpetes: pathlib

`pathlib` treballa amb rutes igual en Windows i Linux, sense preocupar-te per les barres.

```pyrun
from pathlib import Path

carpeta = Path("informes")
carpeta.mkdir(exist_ok=True)                  # crea si no existeix

(carpeta / "dilluns.txt").write_text("ok\n", encoding="utf-8")
(carpeta / "dimarts.txt").write_text("error disc\n", encoding="utf-8")

for fitxer in sorted(carpeta.glob("*.txt")):
    print(fitxer.name, fitxer.stat().st_size, "bytes")

print("Existeix dimecres?", (carpeta / "dimecres.txt").exists())
```

| Codi | Què fa |
|---|---|
| `Path.home()` | La carpeta de l'usuari |
| `p.exists()` · `p.is_file()` · `p.is_dir()` | Comprovacions |
| `p.name` · `p.suffix` · `p.parent` | Nom, extensió, carpeta pare |
| `p.glob("*.log")` · `p.rglob("*.log")` | Buscar fitxers (rglob, també en subcarpetes) |
| `p.read_text()` · `p.write_text()` | Llegir o escriure tot d'una vegada |

## Scripts de sistema

Aquests exemples depenen del sistema operatiu real: executa'ls a Thonny o al terminal.

### Espai en disc

```python
import shutil

total, usat, lliure = shutil.disk_usage("/")
print(f"Disc: {usat / total * 100:.1f}% ocupat, {lliure // 1024**3} GB lliures")
```

### Executar ordres

`subprocess.run` llança una ordre del sistema i et permet llegir-ne el resultat.

```python
import subprocess, platform

param = "-n" if platform.system() == "Windows" else "-c"
res = subprocess.run(["ping", param, "1", "8.8.8.8"], capture_output=True, text=True)

if res.returncode == 0:
    print("Hi ha connexió")
else:
    print("Sense resposta")
```

!!! warning "Seguretat"

    Passa l'ordre com una llista, com a l'exemple. No construïsques ordres ajuntant text que ha escrit l'usuari: és la porta d'entrada a una injecció d'ordres.

### Arguments des del terminal

`sys.argv` és una llista amb el nom del script i els arguments que li passes.

```python
#!/usr/bin/env python3
# comptar_linies.py · Ús: ./comptar_linies.py fitxer.log
import sys

if len(sys.argv) != 2:
    print("Ús: comptar_linies.py FITXER")
    sys.exit(1)

with open(sys.argv[1], encoding="utf-8") as f:
    n = sum(1 for _ in f)
print(f"{sys.argv[1]}: {n} línies")
```

```bash
chmod +x comptar_linies.py
./comptar_linies.py /var/log/syslog
```

La primera línia (*shebang*) diu a Linux amb quin intèrpret s'ha d'executar. Amb `crontab -e` pots programar-lo perquè s'execute sol cada nit.

## Exercicis

#### 1. Diari d'incidències <span class="nivell n1">Bàsic</span>

Demana una descripció i l'afig a `incidencies.txt` amb la data i hora davant. Cada execució afig una línia nova.

#### 2. Informe de latències <span class="nivell n1">Bàsic</span>

Llegeix un fitxer amb un número per línia i mostra la mitjana, la mínima i la màxima.

#### 3. Detector d'atacs <span class="nivell n2">Mitjà</span>

A partir de l'exemple d'`auth.log`, mostra només les IP amb 3 o més intents fallits i guarda-les a `bloquejar.txt`, una per línia.

#### 4. Inventari persistent <span class="nivell n2">Mitjà</span>

Modifica la tasca T5 perquè l'inventari es carregue d'`inventari.csv` en arrancar i es guarde en eixir.

#### 5. Còpia de seguretat amb data <span class="nivell n3">Repte</span>

Script que rep una carpeta per argument i en fa un ZIP amb el nom `copia_AAAAMMDD_HHMM.zip`. Pista: `shutil.make_archive` i `datetime.now().strftime()`.

## Tasca d'Aules

!!! tasca "T6 · Analitzador de logs"

    Lliura l'exercici 3 ampliat: el nom del fitxer de log es passa com a argument, i a més de `bloquejar.txt` genera un `resum.csv` amb les columnes `ip, intents, usuaris_provats`.

## Comprova-ho

```quiz
[
 {
  "p": "Quin mode d'obertura esborra el contingut anterior del fitxer?",
  "o": [
   "\"r\"",
   "\"a\"",
   "\"w\"",
   "Cap"
  ],
  "c": 2,
  "e": "\"w\" escriu des de zero; per a afegir, usa \"a\"."
 },
 {
  "p": "Per què usem with open(...) as f?",
  "o": [
   "És més ràpid",
   "Tanca el fitxer automàticament",
   "És obligatori en Linux",
   "Per a llegir en binari"
  ],
  "c": 1,
  "e": "El fitxer es tanca en eixir del bloc, fins i tot si hi ha errors."
 },
 {
  "p": "Quin error es produeix si obris per a llegir un fitxer que no existeix?",
  "o": [
   "KeyError",
   "IndexError",
   "FileNotFoundError",
   "ValueError"
  ],
  "c": 2,
  "e": "FileNotFoundError."
 },
 {
  "p": "Si llegeixes \"8\" d'un CSV i vols sumar-lo…",
  "o": [
   "Ja és un número",
   "Cal fer int(\"8\")",
   "Cal usar csv.int",
   "No es pot"
  ],
  "c": 1,
  "e": "Tot el que es llig d'un fitxer de text és str."
 },
 {
  "p": "Què conté sys.argv[0]?",
  "o": [
   "El primer argument",
   "El nom del script",
   "El nombre d'arguments",
   "L'usuari"
  ],
  "c": 1,
  "pista": "Els arguments comencen a la posició 1.",
  "e": "La posició 0 és el nom del script."
 }
]
```
