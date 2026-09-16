---
title: "Una eina teua per al dia a dia"
---

<p class="unit-num">Projecte final</p>

# Una eina teua per al dia a dia

<p class="unit-meta"><span class="chip ra">RA1–RA6</span> <span class="chip" data-unit-chip="projecte"></span> <span class="chip">≈ 8 hores de treball</span></p>

Tria un problema real d'administració de sistemes i resol-lo amb Python. No ha de ser gran: ha d'estar ben fet i l'has d'entendre de cap a peus.

## Sessions del projecte

<div class="unit-sessions" data-unit-sessions="projecte" markdown="0"></div>

## Tria una opció

### A · Analitzador de logs

Llegeix un `auth.log` o un log d'Apache, detecta patrons (intents fallits, errors 404, IP més actives) i genera un informe en CSV i un resum per pantalla.

### B · Gestor d'inventari

Programa amb menú per a gestionar els equips d'una aula o empresa: altes, baixes, cerques, filtres (per RAM, sistema operatiu, estat) i persistència en CSV. Amb classes.

### C · Monitor de xarxa

Llig una llista de hosts d'un fitxer, fa ping a cadascun, mostra quins responen i guarda l'historial amb data i hora. Opcional: avisa quan un host canvia d'estat.

### D · Proposta pròpia

Crear usuaris en massa a partir d'un CSV, netejar fitxers antics, generar configuracions… Envia la proposta per Aules abans de començar i espera el vistiplau.

## Requisits mínims

Siga quina siga l'opció, el projecte ha d'incloure:

| Requisit | RA |
|---|---|
| Codi organitzat, amb comentaris i noms clars | RA1 |
| Almenys tres funcions pròpies amb docstring | RA2 |
| Decisions, bucles i control d'errors d'entrada | RA3 |
| Almenys una classe amb constructor i dos mètodes | RA4 |
| Lectura i escriptura de fitxers; ús d'algun mòdul estàndard | RA5 |
| Ús de llistes i diccionaris | RA6 |

## Com organitzar-te

Usa un tauler de tres columnes (paper, Trello o GitHub Projects): **Per fer**, **Fent** i **Fet**. Parteix el projecte en tasques xicotetes, com a la UD0, i mou-les a mesura que avances. Proposta de ritme:

1. **Setmana 1.** Tria l'opció, escriu en paper què entra i què ix, i divideix-ho en funcions.
2. **Setmana 2.** Programa les funcions una a una i prova-les per separat.
3. **Setmana 3.** Ajunta-ho, afig la classe i el menú o els arguments.
4. **Setmana 4.** Prova amb dades dolentes, escriu el README i lliura.

Les sessions del projecte són de taller: porta'l començat i treballarem dubtes concrets.

## Què has de lliurar

- Un ZIP amb els fitxers `.py` i les dades d'exemple necessàries per a provar-lo.
- Un `README.md` amb: què fa, com s'executa, un exemple d'ús i què milloraries amb més temps.
- Opcional (puja nota): un vídeo de 2 minuts on l'executes i expliques una funció.

## Com es valora

| Criteri | Excel·lent | Suficient | Pes |
|---|---|---|---|
| Funciona | Fa tot el que promet i no es trenca amb dades incorrectes | Fa la funció principal amb dades correctes | 30% |
| Requisits | Compleix tots els requisits mínims amb sentit | Compleix quasi tots | 30% |
| Qualitat del codi | Funcions curtes, noms clars, sense codi repetit | Llegible però millorable | 20% |
| Documentació | README complet i docstrings útils | README bàsic | 10% |
| Autoria | Explica qualsevol part del codi amb seguretat | Explica les parts principals | 10% |

## Esquelet per a començar

```python
#!/usr/bin/env python3
"""
monitor.py · El teu Nom Cognoms
Fa ping a una llista de hosts i guarda l'historial.
"""
import csv
from datetime import datetime

FITXER_HOSTS = "hosts.txt"
FITXER_HISTORIAL = "historial.csv"

class Host:
    def __init__(self, nom):
        self.nom = nom
        self.actiu = None

    def comprova(self):
        """Fa ping i actualitza self.actiu."""
        ...  # UD5: subprocess.run

    def __str__(self):
        estat = "UP" if self.actiu else "DOWN"
        return f"{self.nom:<20} {estat}"

def carrega_hosts(ruta):
    """Retorna una llista d'objectes Host llegits del fitxer."""
    ...

def guarda_historial(hosts, ruta):
    """Afig una fila per host amb la data i l'estat."""
    ...

def main():
    hosts = carrega_hosts(FITXER_HOSTS)
    for h in hosts:
        h.comprova()
        print(h)
    guarda_historial(hosts, FITXER_HISTORIAL)

if __name__ == "__main__":
    main()
```
