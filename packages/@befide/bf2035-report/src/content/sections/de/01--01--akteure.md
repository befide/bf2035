---
supertitle: Forschen, Entwickeln, Ausbilden
subtitle: Eine kleine Gemeinschaft mit großem Hebel
title: Beschleunigerforschung in Deutschland
sectionNumber: A.1
pageType: spread
backgroundImageSrc: "@assets/media/community.png"
pageClass: spread--default
pageName: community
---

import { Image } from "astro:assets";
import AffiliationList from "@components/AffiliationList.astro";
import FacilityList from "@components/FacilityList.astro";

import communityMap from "./community-map.png";

<div class="spread--left spread-area--intro">

Deutschland ist an mehr als 20 nationalen und internationalen Großgeräten beteiligt, um Wissenschaftlerinnen und Wissenschaftlern einzigartigen Forschungsmöglichkeiten zu gewähren. Die Hälfte dieser Anlagen ist beschleunigerbetrieben.

Innovationen in der Beschleunigertechnologie -- seien sie inkrementell oder radikal -- wirken sich damit auch auf einen größeren Bereich der Grundlagenforschung aus. Um dieses Potenzial zu realisieren, benötigt es der Beschleunigerforschung. In diesem Teilbereich der Physik arbeiten in der Bundesrepublik Deutschland etwa 500 Personen, unterstützt von einer weitaus größeren Zahl von Fachleuten aus dem technischen Bereich. Für Innovationen in der Beschleunigertechnik stehen nicht nur Zeitfenster an den Nutzereinrichtungen zur Verfügung, sondern auch die mehr als 20 Testanlagen spielen hier eine immer wichtigere Rolle.

Die Beschleunigerforschung in Deutschland findet an Großgeräten der Helmholtz-Gemeinschaft sowie an Universitäten und Max-Planck-Instituten statt, die zum Teil über eigene Beschleunigeranlagen verfügen.
In Deutschland sind ca. 500 wissenschaftlich Beschäftigte in der Beschleunigerforschung tätig. Sie sind zum Teil auch für den Betrieb von Großgeräten verantwortlich und in der Ausbildung des Nachwuchses engagiert. Ihre Tätigkeit wird von einer weit größeren Zahl an Personen im technischen Bereich unterstützt.

</div>

<div class="spread--left spread-area--c-3 spread-area--small">

## Forschen & Entwickeln

Teilchenbeschleuniger werden nicht nur für die Forschung genutzt, sondern können selbst Gegenstand von Forschung sein. Diese Beschleunigerforschung erfolgt entweder an Großgeräten im Nutzerbetrieb, wozu ein Teil der Strahlzeit explizit reserviert ist. Oder sie findet an eigenständigen Testanlagen statt.

Völlig neue Beschleunigerkonzepte werden meist zunächst in Computersimulationen und dann Experimenten an Testanlagen entwickelt. Andererseits bilden bestehende Großgeräte oft den Ausgangspunkt für die nächste Generation. Daher ist es oft sinnvoll, dass diejenigen, die neue Beschleuniger entwickeln, auch in den Betrieb der heutigen Anlagen eingebunden sind.

## Beschleunigerbetrieb

Teilchenbeschleuniger für die Forschung müssen rund um die Uhr mit hoher Stabilität und Zuverlässigkeit betrieben werden können. Da der Betrieb komplexer Beschleunigeranlagen ein hohes Maß an Spezialisierung erfordert, kommt der Ausbildung in diesem Bereich eine besondere Bedeutung zu.

## Ausbildung

Die Ausbildung des Nachwuchses für die Beschleunigerforschung an deutschen Universitäten ist häufig mit einer praktischen Tätigkeit an einem Großgerät verbunden. Sie bietet gute Chancen für eine spätere Anstellung an einem Beschleunigerzentrum im In- und Ausland. Aber auch die Industrie schätzt die breite und praxisnahe Ausbildung in der Beschleunigerforschung.

</div>

<div class="spread--right spread-area--community-2 spread-area--small">

## Universitäre und außeruniversitäre Anbindung

Beschleunigerforschung wird sowohl an Universitäten als auch an außeruniversitären Forschungszentren betrieben. Die
akademische Beschleunigerforschung ist an 13 deutschen Universitäten mit insgesamt XY Professuren vertreten.^02^ Mehr
als ein Drittel der 18 Helmholtz-Zentren sind in der Beschleunigerforschung aktiv.^03^ Darüber hinaus bestehen enge
Verbindungen zu internationalen Forschungszentren wie CERN in Genf, ERSF in Grenoble und ESS in Lund, Schweden.^04^

</div>

<div class="spread--right spread-area--community-3 spread-area--small">

## Fachliche Anbindung

Die Beschleunigerforschung wird sowohl von Personen mit naturwissenschaftlichem als auch mit ingenieurwissenschaftlichem Hintergrund getragen. Drei der dreißig Professuren sind an einer ingenieurwissenschaftlichen Fakultät angesiedelt ( Rostock, Darmstadt).^01^ (N der 173 Dissertationen seit 20XX sind von Autoren mit ingenieurwissenschaftlichem
Hintergrund verfasst.^05^)

</div>

<div class="spread--right spread-area--university spread-area--small">

## Universitäten

<AffiliationList filter={({ type }) => type === "university"} />

</div>

<div class="spread--right spread-area--non-university spread-area--small">

## Außeruniversitäre Einrichtungen

<AffiliationList filter={({ type }) => type !== "university"} />

</div>

<div class="spread--right spread-area--nutzeranlagen spread-area--small">

## Forschungs&shy;infrastrukturen

<FacilityList
  filter={({ isBmbfFis, isInGermany }) => isBmbfFis && isInGermany}
/>

### außerhalb Deutschlands

<FacilityList
  filter={({ isBmbfFis, isInGermany }) => isBmbfFis && !isInGermany}
/>

</div>

<div class="spread--right spread-area--testanlagen spread-area--small">

## Testanlagen

<FacilityList filter={({ userGroup }) => userGroup === "accelerator-science"} />

</div>

<div class="spread--right spread-area--community-map spread-area--small">

<Image class="md" src={communityMap} alt="A rocketship in space." />

</div>

<div class="spread--right spread-area--community-5 spread-area--small">

## Beschäftigte

In der deutschen Beschleunigerforschung sind nnn Menschen im akademischen und nnn im technischen Bereich
beschäftigt.^01^

</div>

<div class="spread--right spread-area--community-6 spread-area--small">

## Kleine Gemeinschaft mit großem Hebel

Von Fortschritten in der Beschleunigerforschung profitieren alle Forschungsgebiete, die beschleunigerbasierte Methoden einsetzen -- die Erforschung der kleinsten Teilchen sowie die Materieforschung mit Photonen, Neutronen oder Ionen und Sonden.

Auf eine promovierte Person in der Beschleunigerforschung kommen etwa 30 Promovierte in Forschungsgebieten, die direkt von den Teilchenbeschleunigern und indirekt von den Fortschritten in der Beschleunigerforschung profitieren.^8^

</div>

<div class="spread--right spread-area--community-table">

<table>
  <thead>
    <tr>
      <th class="md" colspan="2"></th>
      <th class="md" colspan="4">
        <div>Erforschung kleinster Teilchen</div>
      </th>
      <th class="md" colspan="6">
        <div>Materialforschung</div>
      </th>
    </tr>
    <tr>
      <th class="md" colspan="2">
        <div>Beschleuniger-forschung</div>
      </th>
      <th class="md" colspan="2">
        <div>Teilchenphysik</div>
      </th>
      <th class="md" colspan="2">
        <div>Kernphysik</div>
      </th>
      <th class="md" colspan="2">
        <div>mit Photonen</div>
      </th>
      <th class="md" colspan="2">
        <div>mit Neutronen</div>
      </th>
      <th class="md" colspan="2">
        <div>mit nuklearen Sonden </div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="md" colspan="2">
        <div>200</div>
      </td>
      <td class="md" colspan="2">
        <div>1300</div>
      </td>
      <td class="md" colspan="2">
        <div>1500</div>
      </td>
      <td class="md" colspan="2">
        <div>2300</div>
      </td>
      <td class="md" colspan="2">
        <div>1000</div>
      </td>
      <td class="md" colspan="2">
        <div>100</div>
      </td>
    </tr>
  </tbody>
</table>

</div>

<div class="spread--left spread-area--references spread-area--small">

1. <bib-ref cite-key="kfb__2022__mitgliederbefragung" />
2. Eigene Erhebung
3. <bib-ref cite-key="dosch__2019__overview" ></bib-ref>
4. <bib-ref cite-key="komiteefurbeschleunigerphysik__2014__satzung" />
5. Eigene Erhebung auf Grundlage der <bib-ref cite-key="kfb__2022__dissertationsdatenbank" />
6. <bib-ref
     cite-key="statistischesbundesamt__2020__statistik"
     locator="Seite 36"
   />
7. <bib-ref
     cite-key="statistischesbundesamt__2020__personal"
     locator="Seite 288"
   />
8. <bib-ref cite-key="erdman__2019__challenges" />

</div>
