---
title: Recursos
---

# Recursos

Una xuleta per a tindre a mà, enllaços que val la pena guardar i una plantilla per a preguntar bé.

## Xuleta de Python

Tot el que veurem al curs en una pàgina. Imprimeix-la si vols (Ctrl+P): la web està preparada per a imprimir-se neta.

| Vull… | Codi | Unitat |
|---|---|---|
| Mostrar per pantalla | `print("Hola", nom)` | UD1 |
| Llegir del teclat | `edat = int(input("Edat: "))` | UD1 |
| Formatar un número | `f"{preu:.2f} €"` | UD1 |
| Divisió entera i residu | `17 // 5` → 3, `17 % 5` → 2 | UD1 |
| Decidir | `if x > 0: … elif x == 0: … else: …` | UD2 |
| Repetir mentre | `while intents < 3:` | UD2 |
| Repetir N vegades | `for i in range(5):` | UD2 |
| Controlar un error | `try: … except ValueError: …` | UD2 |
| Definir una funció | `def area(b, h): return b * h` | UD3 |
| Usar una llibreria | `import random` · `random.randint(1, 6)` | UD3 |
| Trossejar un text | `"192.168.1.10".split(".")` | UD4 |
| Afegir a una llista | `equips.append("pc01")` | UD4 |
| Diccionari | `ports = {"ssh": 22, "http": 80}` | UD4 |
| Llegir un fitxer | `with open("log.txt", encoding="utf-8") as f:` | UD5 |
| Arguments d'un script | `import sys` · `sys.argv[1]` | UD5 |
| Crear una classe | `class Equip: def __init__(self, nom): …` | UD6 |

## Enllaços recomanats

### Per a consultar

- [Tutorial oficial de Python](https://docs.python.org/es/3/tutorial/index.html) (en castellà). La referència de confiança.
- [Aprende Python](https://aprendepython.es/), de Sergio Delgado. Molt clar i amb exercicis.
- [Python Tutor](https://pythontutor.com/visualize.html#mode=edit). Dibuixa les variables mentre el programa s'executa, ideal quan no entens què passa.

### Per a practicar

- [Exercism](https://exercism.org/tracks/python). Exercicis graduats amb correcció automàtica (en anglés).
- [Codewars](https://www.codewars.com/). Reptes curts; comença pel nivell 8 kyu.

### Per a anar més enllà (orientat a sistemes)

- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/). Llibre gratuït en línia sobre automatitzar tasques: fitxers, correus, fulls de càlcul.
- [Curs de Python d'Enrique Iborra](https://enriqueiborra.github.io/python/index.html). Versió més extensa d'aquest curs, per si vols aprofundir.

## Com preguntar al fòrum

Una bona pregunta es respon en cinc minuts. Una pregunta com «no em funciona» necessita cinc missatges d'anar i tornar. Copia aquesta plantilla:

```text
Unitat i exercici: UD2 · Exercici 3
Què vull fer: que el programa torne a demanar el port si no és vàlid.
Què passa: quan escric "abc" el programa s'atura.
Missatge d'error (copiat sencer):
    ValueError: invalid literal for int() with base 10: 'abc'
El meu codi (només la part que falla):
    port = int(input("Port: "))
Què he provat: he posat un if, però l'error ix abans.
```

!!! tip "Abans de preguntar"

    Llig l'última línia del missatge d'error: diu el tipus d'error i sovint la causa. La línia que diu `line 7` t'indica on mirar.

## Els errors més habituals

| Error | Què significa | Causa típica |
|---|---|---|
| `SyntaxError` | Python no entén com està escrit | Falten dos punts, cometes o un parèntesi |
| `IndentationError` | Els sagnats no quadren | Barrejar espais i tabuladors, o oblidar sagnar després d'un `if` |
| `NameError` | Una variable no existeix | Error d'escriptura o majúscules: `Nom` no és `nom` |
| `TypeError` | Operació amb tipus incompatibles | Sumar un text i un número sense convertir |
| `ValueError` | El tipus és correcte però el valor no | `int("hola")` |
| `IndexError` | Posició fora de la llista | Accedir a `llista[5]` quan només té 5 elements (0–4) |
| `KeyError` | La clau no està al diccionari | Usa `dic.get(clau)` si no n'estàs segur |
| `FileNotFoundError` | El fitxer no es troba | El programa s'executa en una altra carpeta |
