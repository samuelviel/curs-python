# Introducció a la Programació amb Python · 2n ASIX/DAW semipresencial

Web del mòdul optatiu **Introducció a la Programació** (curs 2026-2027), IES Maria Enríquez de Gandia.
Professor: Samuel Viel Malonda.

Feta amb [MkDocs](https://www.mkdocs.org/) i el tema [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). Els blocs de codi marcats com a `pyrun` s'executen al navegador amb [Pyodide](https://pyodide.org).

## Publicar a GitHub Pages (una sola vegada)

1. Crea un repositori a GitHub (per exemple `python`) i puja-hi tot el contingut d'aquesta carpeta, **inclosa la carpeta oculta `.github`**.
2. Edita `mkdocs.yml` i canvia `USUARI` pel teu nom d'usuari de GitHub (`site_url`, `repo_url`, `repo_name`).
3. Cada `push` a `main` executa l'acció **Publica la web**, que genera la web i la puja a la branca `gh-pages`. Pots seguir-la a la pestanya *Actions*.
4. Després del primer desplegament: **Settings → Pages → Source: Deploy from a branch**, branca `gh-pages`, carpeta `/ (root)`.
5. La web estarà a `https://USUARI.github.io/python/`.

## Treballar en local

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve                       # http://127.0.0.1:8000, es recarrega en guardar
```

Abans de pujar canvis, `mkdocs build --strict` avisa d'enllaços trencats.

## Estructura

```
mkdocs.yml                 Configuració i menú
docs/
  index.md                 Portada (pròxima classe, temari, FAQ)
  guia.md                  Com funciona el curs
  calendari.md             Calendari (es genera des de curs.js)
  recursos.md              Xuleta, enllaços, com preguntar
  unitats/                 entorn, ud0 … ud6, projecte
  assets/js/curs.js        ← DADES DEL CURS: sessions, festius, horaris, correu
  assets/js/curs-app.js    Calendari, pròxima classe, executor i qüestionaris
  assets/css/curs.css      Estils propis
.github/workflows/publica.yml
```

## Com s'escriu el contingut

Un exemple executable:

````markdown
```pyrun
nom = input("Com et dius? ")
print("Hola,", nom)
```
````

Un qüestionari (`p` pregunta, `o` opcions, `c` índex correcte començant per 0, `e` explicació, `pista` opcional):

````markdown
```quiz
[
 {"p": "Quin tipus retorna input()?", "o": ["int", "str"], "c": 1, "e": "Sempre text.", "pista": "Pensa en conversions."}
]
```
````

Caixes: `!!! tip "Títol"`, `!!! warning "Títol"`, `!!! tasca "T1 · Títol"` (tasca d'Aules), `!!! asix "Títol"` (connexió amb sistemes) i `??? question "Títol"` (desplegable).

A una unitat, `<div data-unit-sessions="ud1" markdown="0"></div>` mostra la taula amb les seues sessions i dates.

## El calendari

No s'escriuen dates a mà. `docs/assets/js/curs.js` conté:

- `sessions`: la llista ordenada del que es fa a cada classe (S1, S2…) i a quina unitat enllaça.
- `calendari.noLectius`: festius i vacances. Una sessió que cau en festiu passa al següent dia de classe.
- `calendari.paritat`: com es tria el torn de cada setmana.
  - `"iso"` (per defecte): setmana ISO parella → dijous, senar → dimecres. Tornada de Nadal: **dijous 14 de gener**.
  - `"alterna"`: s'alterna cada setmana natural des de la primera classe. Tornada de Nadal: **dijous 7 de gener**.
  La diferència apareix perquè 2026 té 53 setmanes ISO. Confirma amb el centre quin criteri s'aplica.

Si afegeixes o lleves sessions, el calendari, la portada i les taules de cada unitat es recalculen soles.


## Sobre les versions

Material for MkDocs està en mode manteniment (només correccions) i **no és compatible amb MkDocs 2.x**. Per això `requirements.txt` fixa `mkdocs<2`. L'equip de Material desenvolupa [Zensical](https://squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/), pensat per a llegir el mateix `mkdocs.yml`; si algun dia cal migrar, el contingut en Markdown es manté.

## Llicència

Continguts sota [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca). Idea inspirada en el [curs de Python d'Enrique Iborra](https://enriqueiborra.github.io/python/index.html).
# curs-phyton
