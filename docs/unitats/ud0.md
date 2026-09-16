---
title: "Pensament computacional"
---

<p class="unit-num">Unitat 0</p>

# Pensament computacional

<p class="unit-meta"><span class="chip ra">RA1</span> <span class="chip" data-unit-chip="ud0"></span> <span class="chip">≈ 2–3 hores de treball</span></p>

Programar no és escriure codi: és pensar una solució tan clara que fins i tot una màquina la puga seguir. Esta unitat es fa amb llapis i paper.

## Què aprendràs

- Què és un algorisme i com es descompon un problema.
- Escriure pseudocodi i dibuixar diagrames de flux.
- Comprovar un algorisme a mà amb una taula de traça.

### Sessions d'aquesta unitat

<div class="unit-sessions" data-unit-sessions="ud0" markdown="0"></div>

## Què és un algorisme

Un **algorisme** és una seqüència finita d'instruccions clares que resol un problema. Una recepta de cuina ho és; «fes una truita bona» no ho és, perquè no diu com.

Un bon algorisme ha de ser:

- **Precís**: cada pas només es pot entendre d'una manera.
- **Finit**: acaba en algun moment.
- **Definit**: amb les mateixes dades, dona sempre el mateix resultat.

Tot programa segueix el mateix esquema: **entrada → procés → eixida**. Abans de programar, respon sempre tres preguntes: quines dades tinc, què he de calcular i què he de mostrar.

## Els quatre pilars

| Pilar | Què vol dir | Exemple a ASIX |
|---|---|---|
| Descomposició | Partir un problema gran en problemes xicotets | «Muntar una aula» = cablejar + instal·lar SO + crear usuaris + provar xarxa |
| Reconeixement de patrons | Veure què es repeteix | Crear 30 usuaris és el mateix pas 30 vegades |
| Abstracció | Quedar-se amb el que importa | Per a saber si un disc està ple, només necessite l'espai total i l'usat |
| Algorisme | Escriure els passos en ordre | El procediment que seguiries per a diagnosticar una xarxa |

## Pseudocodi

El **pseudocodi** és escriure l'algorisme en llenguatge natural però amb estructura de programa. No té regles estrictes; ha de ser llegible. Usarem aquestes paraules:

```text
INICI / FI
LLEGIR variable
ESCRIURE "missatge", variable
variable ← valor
SI condició LLAVORS … SI NO … FI SI
MENTRE condició FER … FI MENTRE
```

Exemple: decidir si un disc necessita atenció.

```text
INICI
  LLEGIR total_gb
  LLEGIR usat_gb
  percentatge ← usat_gb / total_gb * 100
  SI percentatge > 90 LLAVORS
      ESCRIURE "ALERTA: disc quasi ple"
  SI NO
      ESCRIURE "Disc correcte"
  FI SI
FI
```

## Diagrames de flux

Un **diagrama de flux** és el mateix algorisme en dibuix. Només necessites quatre símbols:

| Símbol | Significat |
|---|---|
| Oval | Inici o fi |
| Paral·lelogram | Entrada o eixida de dades (llegir, escriure) |
| Rectangle | Procés o càlcul |
| Rombe | Decisió (pregunta de sí o no) |

Aquest és el diagrama de l'exemple del disc:

<div class="flow-img table-wrap">
<svg aria-label="Diagrama de flux: inici, llegir total i usat, calcular percentatge, decisió percentatge major que 90, si és que sí escriure alerta, si no escriure correcte, fi" role="img" style="max-width:100%;height:auto;display:block;margin:0 auto;color:#16324f" viewbox="0 0 560 520" width="560">
<defs><marker id="ar" markerheight="7" markerwidth="7" orient="auto" refx="9" refy="5" viewbox="0 0 10 10"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"></path></marker></defs>
<g fill="none" font-family="Atkinson Hyperlegible Next, sans-serif" font-size="16" stroke="currentColor" stroke-width="2">
<rect height="40" rx="20" width="120" x="220" y="10"></rect>
<path d="M200 90 H370 L340 140 H170 Z"></path>
<rect height="46" width="230" x="165" y="180"></rect>
<path d="M280 262 L370 312 L280 362 L190 312 Z"></path>
<path d="M20 400 H200 L180 446 H0 Z"></path>
<path d="M380 400 H560 L540 446 H360 Z"></path>
<rect height="40" rx="20" width="120" x="220" y="470"></rect>
<path d="M280 50 V88" marker-end="url(#ar)"></path>
<path d="M270 140 V178" marker-end="url(#ar)"></path>
<path d="M280 226 V260" marker-end="url(#ar)"></path>
<path d="M370 312 H460 V398" marker-end="url(#ar)"></path>
<path d="M190 312 H100 V398" marker-end="url(#ar)"></path>
<path d="M100 446 V490 H218" marker-end="url(#ar)"></path>
<path d="M460 446 V490 H342" marker-end="url(#ar)"></path>
</g>
<g fill="currentColor" font-family="Atkinson Hyperlegible Next, sans-serif" font-size="16" text-anchor="middle">
<text x="280" y="35">Inici</text>
<text x="270" y="120">Llegir total, usat</text>
<text x="280" y="208">% ← usat / total × 100</text>
<text x="280" y="317">% &gt; 90 ?</text>
<text x="415" y="302">Sí</text>
<text x="145" y="302">No</text>
<text x="100" y="428">"Disc correcte"</text>
<text x="460" y="428">"ALERTA"</text>
<text x="280" y="495">Fi</text>
</g>
</svg>
</div>

Per a dibuixar-los en l'ordinador pots usar [diagrams.net](https://app.diagrams.net/) (en línia) o **Dia** (`sudo apt install dia`). Per a practicar, el paper és més ràpid.

## Taula de traça

Per a comprovar si un algorisme és correcte, l'executes a mà i apuntes el valor de cada variable a cada pas. Algorisme: sumar els números de l'1 al 4.

```text
suma ← 0
i ← 1
MENTRE i <= 4 FER
    suma ← suma + i
    i ← i + 1
FI MENTRE
ESCRIURE suma
```

| Pas | i | suma | i <= 4? |
|---|---|---|---|
| Inici | 1 | 0 | Sí |
| Volta 1 | 2 | 1 | Sí |
| Volta 2 | 3 | 3 | Sí |
| Volta 3 | 4 | 6 | Sí |
| Volta 4 | 5 | 10 | No → ix i escriu 10 |

La mateixa idea en Python, perquè veges on anem. No cal que l'entengues encara:

```pyrun
suma = 0
i = 1
while i <= 4:
    suma = suma + i
    print(f"i={i}  suma={suma}")
    i = i + 1
print("Resultat:", suma)
```

## Exercicis

Fes-los en paper. Per a cada un: pseudocodi i diagrama de flux.

#### 1. Canvi d'unitats <span class="nivell n1">Bàsic</span>

Llegeix una quantitat de megabytes i mostra-la en gigabytes (1 GB = 1024 MB).

#### 2. Parell o senar <span class="nivell n1">Bàsic</span>

Llegeix un número i indica si és parell o senar. Pista: un número és parell si el residu de dividir-lo entre 2 és 0.

#### 3. Reinicia el servei <span class="nivell n2">Mitjà</span>

Descriu l'algorisme que seguiria un script que comprova si el servidor web respon. Si no respon, el reinicia i torna a comprovar-ho, com a màxim 3 vegades. Si després de 3 intents continua caigut, envia un avís.

#### 4. Traça <span class="nivell n2">Mitjà</span>

Fes la taula de traça de l'algorisme de la suma però amb la condició `i < 4`. Quin resultat dona? Per què canvia?

#### 5. El major de tres <span class="nivell n3">Repte</span>

Llegeix tres números diferents i mostra el major. Intenta fer-ho amb el mínim de preguntes possible.

## Tasca d'Aules

!!! tasca "T1 · Pensa abans de programar"

    Resol els exercicis 2 i 3 amb pseudocodi i diagrama de flux. Lliura un PDF (pot ser una foto ben il·luminada del paper) amb el teu nom.

## Comprova-ho

```quiz
[
 {
  "p": "Quin d'aquests és un algorisme?",
  "o": [
   "Fes una còpia de seguretat bona",
   "Obri el terminal, escriu 'df -h', mira la columna Use%",
   "Arregla la xarxa",
   "Configura el servidor com cal"
  ],
  "c": 1,
  "e": "És l'única opció amb passos precisos i en ordre."
 },
 {
  "p": "Quin símbol representa una decisió en un diagrama de flux?",
  "o": [
   "Oval",
   "Rectangle",
   "Rombe",
   "Paral·lelogram"
  ],
  "c": 2,
  "e": "El rombe té dues eixides: sí i no."
 },
 {
  "p": "Entrada → ? → eixida",
  "o": [
   "Compilació",
   "Procés",
   "Instal·lació",
   "Depuració"
  ],
  "c": 1,
  "e": "Tot programa llig dades, les processa i mostra un resultat."
 },
 {
  "p": "Crear 30 usuaris repetint els mateixos passos és un exemple de…",
  "o": [
   "Abstracció",
   "Reconeixement de patrons",
   "Descomposició",
   "Traça"
  ],
  "c": 1,
  "pista": "Busques el que es repeteix.",
  "e": "Detectar la repetició et permetrà usar un bucle."
 },
 {
  "p": "Per a què serveix una taula de traça?",
  "o": [
   "Per a dibuixar el diagrama",
   "Per a comprovar a mà el valor de les variables a cada pas",
   "Per a instal·lar Python",
   "Per a guardar dades"
  ],
  "c": 1,
  "e": "És la manera de «executar» un algorisme amb llapis."
 }
]
```
