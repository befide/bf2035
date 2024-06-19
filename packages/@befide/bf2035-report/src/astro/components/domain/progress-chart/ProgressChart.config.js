import { curveStepAfter } from 'd3-shape'
import { format, formatDefaultLocale } from 'd3-format'
import { rollups, group } from 'd3-array'


import acceleratorsInUse from './data/acceleratorsInUsePerYear.json' assert { type: 'json' }


import nuclideDiscoveriesPerYear from './data/nuclideDiscoveriesPerYear.json' assert { type: 'json' }

import particleDiscoveries from './data/particleDiscoveries.json' assert { type: 'json' }

import pdbEntries from './data/proteinStructures.json' assert { type: 'json' }

import _nobelPrizes from './data/nobelPrizes.json' assert { type: 'json' }

import conferences from './data/conferences.json' assert { type: 'json' }

import professorships from './data/professorships.json' assert { type: 'json' }

import publications from './data/publications.json' assert { type: 'json' }
import doctoralTheses from './data/doctoralTheses.json' assert { type: 'json' }
import masterTheses from './data/masterTheses.json' assert { type: 'json' }

import betaElectron from './data/betaElectron.json' assert { type: 'json' }

import betaProton from './data/betaProton.json' assert { type: 'json' }

import energyProton from './data/energyProton.json' assert { type: 'json' }

import energyElectron from './data/energyElectron.json' assert { type: 'json' }

import magneticFieldStrength from './data/magneticFieldStrength.json' assert { type: 'json' }

import srfGradient from './data/srfGradient.json' assert { type: 'json' }

import emittance from './data/emittance.json' assert { type: 'json' }

import currentProton from './data/currentProton.json' assert { type: 'json' }

import peakLuminosity from './data/peakLuminosity.json' assert { type: 'json' }

import peakBrilliance from './data/peakBrilliance.json' assert { type: 'json' }

import neutronFlux from './data/neutronFlux.json' assert { type: 'json' }

import projectFunding from './data/projektfoerderung_pt-desy.2-aggregated.accelerator_related_projects_per_year.json' assert { type: 'json' }
import excellenceRate from './data/excellence-rate.json' assert { type: 'json' }


const nobelPrizes = Array.from(group(_nobelPrizes, (({year}) => year))).map(([y,v]) => ({year: y, value: v.length}))


// .map((v, k) => {year: +k, value: v.length})


const projectFundingProjectsCount = projectFunding.data.map(entry => ({ year: entry.year, value: entry.projects__count }))
const projectFundingAmount = projectFunding.data.map(entry => ({ year: entry.year, value: entry.funding_amount__sum }))

console.log(projectFundingProjectsCount)
console.log(projectFundingAmount)

const germanExcellenceRate = excellenceRate.map(entry => ({ year: entry.yearEnd, value: entry['ten percent most cited with affiliation from Germany share'] }))

formatDefaultLocale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['', '\u00A0€'],
})

export default {
  nuclideDiscoveriesPerYear: {
    yDomain: [0, 5000],
    scale: 'linear',
    cumulate: false,
    data: nuclideDiscoveriesPerYear.map(({ year, sum }) => ({
      year,
      value: sum,
    })),
    quantityName: 'Nuklidentdeckungen',
    quantityNameQualifier: '',
    unit: 'kumulierte Zahl der an Beschleunigern entdeckten Nuklide',
  },
  particleDiscoveries: {
    yDomain: [0, 25],
    scale: 'linear',
    cumulate: true,
    data: particleDiscoveries
      .filter(d => d.isAcceleratorBased)
      .map(({ year, label__de }) => ({
        year,
        label: label__de,
      })),
    quantityName: 'Elementarteilchen',
    quantityNameQualifier: '',
    unit: 'an Beschleunigern entdeckt (kumuliert)',
  },
  pdbEntries: {
    yDomain: [0, 100000],
    scale: 'linear',
    cumulate: false,
    data: pdbEntries.map(({ year, count__acceleratorBasedXcd }) => ({
      year,
      value: count__acceleratorBasedXcd,
    })),
    quantityName: 'Bio-Moleküle',
    quantityNameQualifier: '',
    unit: 'an Beschleuniger-Lichtquellen entschlüsselt',
    curveGenerator: curveStepAfter
  },
  accelerator_related__nobel_prizes: {
    yDomain: [0, 50],
    scale: 'linear',
    cumulate: true,
    data: nobelPrizes,
    quantityName: 'Nobelpreise',
    quantityNameQualifier: '',
    unit: 'kumulierte Zahl der Nobelpreise mit Beschleunigerbezug',
    curveGenerator: curveStepAfter
  },

  accelerators_in_use__medicine: {
    yDomain: [0, 25000],
    scale: 'linear',
    cumulate: false,
    data: acceleratorsInUse.map(({ year, medicine__count }) => ({
      year,
      value: medicine__count,
    })),
    quantityName: 'Beschleuniger',
    quantityNameQualifier: 'Medizische ',
    unit: 'kumulierte Anzahl',
  },
  accelerators_in_use__industry: {
    yDomain: [0, 25000],
    scale: 'linear',
    cumulate: false,
    data: acceleratorsInUse.map(({ year, industry__count }) => ({
      year,
      value: industry__count,
    })),
    quantityName: 'Beschleuniger',
    quantityNameQualifier: 'Industrie-',
    unit: 'kumulierte Anzahl',
  },
  accelerators_in_use__science: {
    yDomain: [0, 25000],
    scale: 'linear',
    cumulate: false,
    data: acceleratorsInUse.map(({ year, science__count }) => ({
      year,
      value: science__count,
    })),
    quantityName: 'Beschleuniger',
    quantityNameQualifier: 'Wissenschafts',
    unit: 'kumulierte Anzahl',
  },
  progress__conferences: {
    yDomain: [0,250],
    scale: 'linear',
    cumulate: true,
    data: rollups(
      conferences,
      d => d.length,
      d => d.year,
    ).map(d => ({ year: d[0], value: d[1] })),
    quantityName: 'Konferenzen',
    quantityNameQualifier: 'Internationale ',
    unit: 'pro Jahr',
    curveGenerator: curveStepAfter,
  },
  progress__doctoral_theses: {
    yDomain: [0,250],
    scale: 'linear',
    cumulate: true,
    data: doctoralTheses,
    quantityName: 'Dissertationen',
    quantityNameQualifier: ' ',
    unit: 'pro Jahr',
    curveGenerator: curveStepAfter,
  },
  progress__master_theses: {
    yDomain: [0,250],
    scale: 'linear',
    cumulate: true,
    data: masterTheses,
    quantityName: 'Masterarbeiten',
    quantityNameQualifier: ' ',
    unit: 'pro Jahr',
    curveGenerator: curveStepAfter,
  },
  progress__professorships: {
    scale: 'linear',
    yDomain: [0, 50],
    cumulate: true,
    data: professorships,
    quantityName: 'Professuren',
    quantityNameQualifier: 'Einschlägige ',
    unit: 'an deutschen Universitäten (kumuliert)',
    curveGenerator: curveStepAfter,
  },
  progress__publications: {
    scale: 'linear',
    yDomain: [0, 5000],
    cumulate: true,
    data: publications,
    quantityName: 'Veröffentlichungen',
    quantityNameQualifier: 'Akadmenische ',
    unit: 'in Physics Review Accelerators and Beams pro Jahr',
    curveGenerator: curveStepAfter,
  },
  progress__projectFundingCount: {
    scale: 'linear',
    yDomain: [0, 500],
    cumulate: true,
    data: projectFundingProjectsCount,
    quantityName: 'Projektförderung',
    quantityNameQualifier: 'Verbundforschung ',
    unit: 'Projekte',
    curveGenerator: curveStepAfter,
  },
  progress__projectFundingAmount: {
    scale: 'linear',
    yDomain: [0, 300000000],
    cumulate: true,
    data: projectFundingAmount,
    quantityName: 'Projektförderung',
    quantityNameQualifier: 'Verbundforschung ',
    unit: 'Euro',
    curveGenerator: curveStepAfter,
  },
  progress__excellenceRate: {
    scale: 'linear',
    yDomain: [0, 0.5],
    cumulate: false,
    data: germanExcellenceRate,
    quantityName: 'Exzellenzrate',
    quantityNameQualifier: 'Deutsche ',
    unit: 'ten percent most cited share',
    curveGenerator: curveStepAfter,
    numberFormat: format('.0'),
  },
  progress__beta_electron: {
    scale: 'log',
    y0: -2,
    yFactor: 3,
    data: betaElectron,
    quantityName: 'Geschwindigkeit',
    quantityNameQualifier: 'Elektronen-',
    unit: 'Lichtgeschwindigkeit',
    numberFormat: format('.0%'),
  },
  progress__beta_proton: {
    scale: 'log',
    y0: -2,
    yFactor: 3,
    data: betaProton,
    quantityName: 'Geschwindigkeit',
    quantityNameQualifier: 'Protonen-',
    unit: 'Lichtgeschwindigkeit',
    // numberFormat: format('.0%'),
  },
  progress__energy_proton: {
    scale: 'log',
    y0: 0,
    yFactor: 20,
    data: energyProton,
    quantityName: 'Energie',
    quantityNameQualifier: 'Protonen-',
    unit: 'Eletronenvolt',
    regression: true,
  },
  progress__energy_electron: {
    scale: 'log',
    y0: 0,
    yFactor: 20,
    data: energyElectron,
    quantityName: 'Energie',
    quantityNameQualifier: 'Elektronen-',
    unit: 'Eletronenvolt',
    regression: true,
  },

  progress__magnetic_field_strength: {
    scale: 'linear',
    yDomain: [0, 20],
    data: magneticFieldStrength,
    quantityName: 'Magnetfeldstärke',
    quantityNameQualifier: 'Maximale ',
    unit: 'Tesla (T)',
    regression: false,
  },
  progress__srf_gradient: {
    scale: 'linear',
    yDomain: [0, 100],
    data: srfGradient,
    quantityName: 'elektrischer Gradient',
    quantityNameQualifier: 'Maximaler ',
    unit: 'Millionen Volt pro Meter (MV/m)',
    regression: false,
  },
  progress__emittance: {
    scale: 'log',
    y0: 0,
    yFactor: 10,
    data: emittance,
    quantityName: 'Emittanz',
    quantityNameQualifier: 'horizontale ',
    unit: 'Billionstel Meterradian (pmrad)',
    regression: true,
  },
  progress__current_proton: {
    scale: 'log',
    y0: 5,
    yFactor: 10,
    data: currentProton,
    quantityName: 'Strom',
    quantityNameQualifier: 'maximaler ',
    unit: 'Ampere',
    regression: true,
  },
  progress__peak_luminosity: {
    scale: 'log',
    y0: 0,
    yFactor: 10,
    data: peakLuminosity.map(d => ({
      ...d,
      value: d.value / 1e30,
    })),
    quantityName: 'Luminosität',
    quantityNameQualifier: 'Spitzen',
    unit: 'Quintillion Ereignisse / cm&sup2; / s',
    regression: true,
  },
  progress__neutron_flux: {
    scale: 'log',
    y0: 0,
    yFactor: 20,
    data: neutronFlux,
    quantityName: 'Fluss thermischer Neutronen',
    quantityNameQualifier: '',
    unit: 'Neutronen / cm&sup2; / s',
    regression: false,
  },
  progress__peak_brilliance: {
    scale: 'log',
    y0: 0,
    yFactor: 50,
    data: peakBrilliance
      // .slice(1, -1)
      .map(d => ({ ...d, value: d.value / 1 })),
    quantityName: 'Brillianz',
    quantityNameQualifier: 'Spitzen',
    unit: 'Photonen / cm² / s',
  },
}
