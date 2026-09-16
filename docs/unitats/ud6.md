---
title: "Objectes i classes"
---

<p class="unit-num">Unitat 6</p>

# Objectes i classes

<p class="unit-meta"><span class="chip ra">RA2</span> <span class="chip ra">RA4</span> <span class="chip" data-unit-chip="ud6"></span> <span class="chip">≈ 4 hores de treball</span></p>

Fins ara les dades (diccionaris) i les accions (funcions) anaven per separat. Una classe les ajunta: un equip sap la seua IP i també sap fer ping.

## Què aprendràs

- Diferenciar classe i objecte.
- Crear classes amb atributs i mètodes.
- Usar `__init__`, `self` i `__str__`.
- Reutilitzar una classe amb herència.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="ud6" markdown="0"></div>

## La idea

Una **classe** és un plànol; un **objecte** és una cosa construïda amb eixe plànol. «Servidor» és la classe; `web01` i `bd01` són objectes diferents, cadascun amb les seues dades.

| Concepte | Què és | Exemple |
|---|---|---|
| Classe | El plànol | `Equip` |
| Objecte (instància) | Un element concret | `pc05 = Equip("pc05", "10.0.213.5")` |
| Atribut | Una dada de l'objecte | `pc05.ip` |
| Mètode | Una acció que sap fer | `pc05.encen()` |

Sense saber-ho, ja has usat objectes: `"hola".upper()` crida el mètode `upper` d'un objecte de la classe `str`.

## La primera classe

```pyrun
class Equip:
    def __init__(self, nom, ip, ram=8):
        self.nom = nom          # atributs: dades de CADA objecte
        self.ip = ip
        self.ram = ram
        self.engegat = False

    def encen(self):
        self.engegat = True
        print(f"{self.nom} arrancant...")

    def amplia_ram(self, gb):
        self.ram += gb

pc05 = Equip("pc05", "10.0.213.5")
srv = Equip("srv-bd", "10.0.0.20", ram=32)

pc05.encen()
srv.amplia_ram(16)
print(pc05.nom, pc05.engegat, pc05.ram)
print(srv.nom, srv.engegat, srv.ram)
```

- `__init__` és el **constructor**: s'executa automàticament en crear l'objecte i hi prepara els atributs.
- `self` és l'objecte concret amb què estàs treballant. Va sempre com a primer paràmetre dels mètodes, però no el passes en cridar-los.
- Els noms de classe s'escriuen amb majúscula inicial: `Equip`, `CompteUsuari`.

## Mostrar un objecte: __str__

Si fas `print(pc05)` veuràs alguna cosa com `<__main__.Equip object at 0x...>`. Defineix `__str__` per a decidir com es mostra:

```pyrun
class Equip:
    def __init__(self, nom, ip, ram=8):
        self.nom = nom
        self.ip = ip
        self.ram = ram

    def __str__(self):
        return f"{self.nom:<8} {self.ip:<14} {self.ram:>3} GB"

aula = [Equip("pc01", "10.0.213.1"), Equip("pc02", "10.0.213.2", 16)]
for e in aula:
    print(e)
```

## Protegir les dades

Un mètode pot comprovar que els canvis tenen sentit abans de fer-los. Així l'objecte no queda mai en un estat impossible.

```pyrun
class Disc:
    def __init__(self, nom, total_gb):
        self.nom = nom
        self.total = total_gb
        self.usat = 0

    def escriu(self, gb):
        if gb <= 0:
            print("Quantitat no vàlida")
        elif self.usat + gb > self.total:
            print(f"{self.nom}: no hi ha espai per a {gb} GB")
        else:
            self.usat += gb

    def percentatge(self):
        return self.usat / self.total * 100

sda = Disc("sda", 500)
sda.escriu(300)
sda.escriu(250)
print(f"{sda.nom}: {sda.percentatge():.0f}% ocupat")
```

Per convenció, un atribut que comença per `_` (per exemple `self._usat`) indica «no el toques des de fora, usa els mètodes».

## Herència

Una classe pot **heretar** d'una altra: rep tots els seus atributs i mètodes i n'afig o en canvia alguns. Un servidor és un equip amb serveis.

```pyrun
class Equip:
    def __init__(self, nom, ip):
        self.nom = nom
        self.ip = ip

    def __str__(self):
        return f"{self.nom} ({self.ip})"

class Servidor(Equip):
    def __init__(self, nom, ip, serveis):
        super().__init__(nom, ip)      # reutilitza el constructor d'Equip
        self.serveis = serveis

    def __str__(self):
        return super().__str__() + " → " + ", ".join(self.serveis)

xarxa = [Equip("pc01", "10.0.213.1"), Servidor("srv01", "10.0.0.1", ["dns", "dhcp"])]
for e in xarxa:
    print(e)
```

## Exercicis

#### 1. Compte d'usuari <span class="nivell n1">Bàsic</span>

Classe `CompteUsuari` amb nom, grup i un atribut `actiu`. Mètodes `bloqueja()`, `desbloqueja()` i `__str__`.

#### 2. Disc amb alertes <span class="nivell n2">Mitjà</span>

Amplia `Disc` amb un mètode `esborra(gb)` i un altre `estat()` que retorne OK, AVÍS o CRÍTIC com a la UD2.

#### 3. Inventari amb classes <span class="nivell n3">Repte</span>

Reescriu l'inventari de la UD4/UD5 amb una classe `Equip` i una classe `Inventari` que tinga la llista d'equips i els mètodes `afegeix`, `busca`, `elimina`, `guarda_csv` i `carrega_csv`.

## Tasca d'Aules

!!! tasca "T7 · Objectes a la xarxa"

    Lliura l'exercici 3. Si prefereixes, pots fer una classe `Servidor` que herete d'`Equip` i afegisca una llista de serveis.

## Comprova-ho

```quiz
[
 {
  "p": "Quina és la relació entre classe i objecte?",
  "o": [
   "Són el mateix",
   "La classe és el plànol; l'objecte, un element creat amb ell",
   "L'objecte defineix la classe",
   "Una classe només pot tindre un objecte"
  ],
  "c": 1,
  "e": "D'una classe pots crear tants objectes com vulgues."
 },
 {
  "p": "Quan s'executa __init__?",
  "o": [
   "En importar el mòdul",
   "En crear un objecte",
   "En fer print",
   "Mai automàticament"
  ],
  "c": 1,
  "e": "És el constructor."
 },
 {
  "p": "Què representa self?",
  "o": [
   "La classe",
   "El mòdul",
   "L'objecte concret sobre el qual s'executa el mètode",
   "Una variable global"
  ],
  "c": 2,
  "e": "self és l'objecte actual."
 },
 {
  "p": "Per a què serveix __str__?",
  "o": [
   "Per a convertir a número",
   "Per a decidir com es mostra l'objecte amb print",
   "Per a esborrar l'objecte",
   "Per a comparar objectes"
  ],
  "c": 1,
  "e": "print(objecte) usa __str__."
 },
 {
  "p": "class Servidor(Equip): vol dir que…",
  "o": [
   "Servidor és un atribut d'Equip",
   "Servidor hereta d'Equip",
   "Equip hereta de Servidor",
   "Són classes independents"
  ],
  "c": 1,
  "pista": "La classe entre parèntesis és la classe pare.",
  "e": "Servidor rep tot el que té Equip."
 }
]
```
