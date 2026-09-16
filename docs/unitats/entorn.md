---
title: "Prepara l'entorn"
---

<p class="unit-num">Unitat 00</p>

# Prepara l'entorn

<p class="unit-meta"><span class="chip ra">RA1</span> <span class="chip" data-unit-chip="entorn"></span> <span class="chip">≈ 1 hora</span></p>

Abans de programar necessitem dues coses: l'intèrpret de Python, que executa el codi, i un editor on escriure'l. Ací ho deixem llest i fem el primer programa.

## Què aconseguiràs

- Tindre Python 3 i Thonny instal·lats i funcionant.
- Saber la diferència entre la consola interactiva i un fitxer `.py`.
- Executar el teu primer programa i entregar-ne la prova a Aules.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="entorn" markdown="0"></div>

## Per què Python i per què Thonny

**Python** és el llenguatge més usat per a automatitzar tasques de sistemes: el trobaràs instal·lat a quasi tots els servidors Linux, i eines com Ansible estan escrites amb ell. La seua sintaxi és curta i llegible, així que et centres en la lògica i no en la puntuació.

**Thonny** és un editor pensat per a qui comença. Porta Python integrat, mostra les variables mentre el programa s'executa i té un depurador molt senzill. Més endavant, si vols, pots passar a VS Code.

## Instal·lació

### Ubuntu o Debian (recomanat, com a l'aula)

Python 3 ja ve instal·lat. Obri un terminal i instal·la Thonny:

```bash
sudo apt update
sudo apt install thonny
python3 --version
```

L'última ordre ha de mostrar alguna cosa com `Python 3.12.3`. Qualsevol versió 3.10 o superior ens serveix.

### Windows o macOS

1. Ves a [thonny.org](https://thonny.org) i descarrega l'instal·lador del teu sistema.
2. Instal·la'l amb les opcions per defecte. Ja inclou Python, no cal instal·lar res més.
3. Obri Thonny. Si et pregunta per l'idioma, pots triar català o castellà.

!!! warning "Evita confusions"

    No cal que instal·les Python des de python.org si uses Thonny. Si ja el tens, no passa res: Thonny usarà el seu.

### Sense instal·lar res

Els blocs de codi amb el botó **Executa** d'aquesta web funcionen amb Python directament al navegador. La primera vegada tarda uns segons a carregar. Prova-ho:

```pyrun
import sys
print("Hola! Estàs executant Python", sys.version.split()[0])
print("2 elevat a 100 és", 2 ** 100)
```

És perfecte per a provar coses ràpides, però per a les tasques usa Thonny: és on faràs l'examen.

## Un volt per Thonny

| Zona | Per a què serveix |
|---|---|
| Editor (dalt) | Escrius el programa i el guardes com a fitxer `.py`. |
| Shell (baix) | Ací ix el resultat. També pots escriure ordres soltes després de `>>>`. |
| Botó verd ▶ (F5) | Executa el programa de l'editor. |
| Botó de l'insecte (Ctrl+F5) | Executa pas a pas per a trobar errors. |
| Menú Visualitza → Variables | Mostra el valor de cada variable. Activa-ho ja. |

## Consola interactiva o fitxer

A la **Shell** escrius una ordre, prems Intro i Python la respon a l'instant. Serveix per a provar:

```text
>>> 3 + 4
7
>>> "ASIX" * 3
'ASIXASIXASIX'
```

Un **programa** és un fitxer amb moltes ordres que s'executen de dalt a baix. Això és el que guardaràs i lliuraràs. Fora de Thonny, s'executa així:

```bash
python3 hola.py
```

## El teu primer programa

1. Crea una carpeta `curs-python` i, dins, una per unitat: `ud1`, `ud2`…
2. A Thonny, escriu el codi següent i guarda'l com a `ud1/hola.py`.
3. Prem F5.

```pyrun
# hola.py · El teu Nom Cognoms
nom = input("Com et dius? ")
print("Hola,", nom)
print("Benvingut al curs de Python")
```

!!! warning "Noms de fitxer"

    Sense espais, sense accents i en minúscules: `calcul_ip.py`. I mai no poses a un fitxer el nom d'una llibreria de Python, com `random.py` o `math.py`: trencaria els `import`.

## I VS Code?

VS Code és l'editor que usaràs en molts llocs de treball. Si ja el coneixes, pots usar-lo amb l'extensió oficial de Python. Obri sempre la **carpeta** del projecte (no el fitxer solt) i executa amb el botó ▶ de dalt a la dreta. Per a l'examen, però, tindràs Thonny.

## Tasca d'Aules

!!! tasca "T0 · Entorn a punt"

    Lliura el fitxer `hola.py` i una captura de pantalla de Thonny on es veja el programa executat amb el teu nom a la Shell i la finestra de Variables oberta.

## Comprova-ho

```quiz
[
 {
  "p": "Quin programa executa realment el codi Python?",
  "o": [
   "Thonny",
   "L'intèrpret de Python",
   "El navegador",
   "El sistema de fitxers"
  ],
  "c": 1,
  "e": "Thonny és l'editor; qui llig i executa les instruccions és l'intèrpret."
 },
 {
  "p": "Quina extensió ha de tindre un programa de Python?",
  "o": [
   ".txt",
   ".python",
   ".py",
   ".exe"
  ],
  "c": 2,
  "e": "Els programes de Python es guarden amb extensió .py."
 },
 {
  "p": "Quina tecla executa el programa a Thonny?",
  "o": [
   "F1",
   "F5",
   "F12",
   "Ctrl+S"
  ],
  "c": 1,
  "e": "F5 o el botó verd."
 },
 {
  "p": "Quin d'aquests noms de fitxer és millor?",
  "o": [
   "Pràctica 1.py",
   "random.py",
   "calcul_hosts.py",
   "PROGRAMA FINAL.PY"
  ],
  "c": 2,
  "pista": "Sense espais ni accents, i sense el nom d'una llibreria.",
  "e": "calcul_hosts.py és clar, en minúscules i sense conflictes."
 },
 {
  "p": "Per a què serveix la Shell (>>>)?",
  "o": [
   "Per a guardar programes",
   "Per a provar ordres soltes i veure el resultat",
   "Per a instal·lar Python",
   "Per a lliurar tasques"
  ],
  "c": 1,
  "e": "És una consola interactiva: ideal per a proves ràpides."
 }
]
```
