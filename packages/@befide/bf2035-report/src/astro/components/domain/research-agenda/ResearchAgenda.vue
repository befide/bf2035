<script setup lang="ts">
import research_agenda_json from '@befide/bf2035-data-legacy/src/data/0_input/research-agenda.json';
import { computed, ref } from '@vue/reactivity';
import { ribbon } from 'd3-chord';
import { hsl, rgb } from 'd3-color';
import { cluster, stratify } from 'd3-hierarchy';
import { scaleOrdinal } from 'd3-scale';
import type { Selection } from 'd3-selection';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { onMounted, watch } from 'vue';
import { useRouteQuery } from '@vueuse/router';
import { createDropShadowFilter, createGlowFilter } from '../lib/d3-filters';

export interface ResearchAgendaNodeDatum {
  parent?: object;
  id: string;
  path: string;
  name: string;
  group?: string | null;
  label: string;
  description?: string | null;
  'links:agenda-topics'?: (string | null)[] | null;
  'links:agenda-facilities'?: (string | null)[] | null;
  usedInResearchAgenda: boolean;
  links?: (string | null)[] | null;
  'links:agenda-objectives'?: (string | null)[] | null;
  collection?: string | null;
  nameIsAcronymFor?: string | null;
  userGroup?: string | null;
  facilityName?: string | null;
  lifeCycleStage?: string | null;
  isInGermany?: boolean | null;
  additionalUserGroups?: string[] | null;
  facilityVersion?: string | null;
  isBmbfFis?: boolean | null;
}

const research_agenda = research_agenda_json as ResearchAgendaNodeDatum[];

function nameFixer(label = '') {
  return label
    .replace('Strahlmodellierung', 'Modellierung')
    .replace('3. Ultrakompakte Anlagen', '3. Ultrakompakt')
    .replace('particle-physics', 'Teilchenphysik')
    .replace('hadron-physics', 'Kernphysik')
    .replace('accelerator-science', 'Beschleunigerforschung')
    .replace('photon-science', 'Photonen')
    .replace('neutron-science', 'Neutronen')
    .replace('Teilchen-Plasma-Beschleuniger', 'Teilchen-Plasma')
    .replace('Laser-Plasma-Beschleuniger', 'Laser-Plasma');
}

const filter = useRouteQuery('filter', 'agenda'); // ref
const filterChanged = ref(false);

const baselineHeight = ref(14);
const radius = computed(() => 8 * baselineHeight.value);
const height = computed(() => (12 * 4 - 1) * baselineHeight.value);
const width = computed(() => (12 * 4 - 1) * baselineHeight.value);

const red = hsl(rgb('#c53228'));
const blue = hsl(rgb('#2174a8'));
const green = hsl(rgb('#009900'));

function color(d) {
  return scaleOrdinal(
    ['topics', 'facilities', 'objectives'],
    [red.toString(), blue.toString(), green.toString()],
  )(d.data.ancestors[2]);
}

const renderingCompleted = ref(false);
const svgRef = ref(null);

const nodeById = research_agenda.reduce(
  (acc, item) => ({
    ...acc,
    [item.id]: item,
  }),
  {},
);

function bilink(root: any) {
  const map = new Map<string, any>(root.leaves().map((d) => [d.id, d]));

  for (const d of root.leaves()) {
    d.outgoing = d.data.links
      .filter((i) => map.get(i))
      .map((i) => ({
        id: d.data.id + map.get(i).data.id,
        source: d,
        target: map.get(i),
      }));
  }
  return root;
}

// add missing parent nodes
for (let i = 0; i < research_agenda.length; i++) {
  const d = research_agenda[i];
  d.parent = d.path.split('.').slice(0, -1).join('.');
  if (d.parent && !research_agenda.find((e) => e.path === d.parent))
    research_agenda.push({ path: d.parent, links: [] });
}

interface ResearchAgendaNode {
  name: string;
  parent: string;
  groupName: string;
  ancestors: string[];
  links: string[];
}

const nodes = research_agenda.map((d) => ({
  id: d.id,
  path: d.path,
  parent: d.parent,
  label: d.label,
  name: nameFixer(d.name),
  groupName: nameFixer(d.group),
  ancestors: d.path.split('.').reverse(),
  links: d.links.map((targetId) => nodeById[targetId]?.path),
}));

const root = computed(() =>
  cluster()
    .size([2 * Math.PI, radius.value])
    .separation((a, b) => {
      if (a.data.ancestors[2] !== b.data.ancestors[2]) return 3;
      if (a.data.ancestors[1] !== b.data.ancestors[1]) return 2;
      return 1;
    })(
    bilink(
      stratify()
        .id(({ path }) => path)
        .parentId(({ parent }) => parent)(nodes),
    ),
  ),
);

const links = computed(() =>
  root.value.leaves().flatMap((leaf) => leaf.outgoing),
);

function gradientId({ id }: { id: string }) {
  return `gradient-${id}`;
}

const activeElements = computed(() => {
  const activeElements = new Set<string>();
  if (filter.value === '') return activeElements;

  root.value.leaves().forEach((d) => {
    if (d.data.path.includes(filter.value)) activeElements.add(d.data.id);
  });

  links.value.forEach((link) => {
    if (link.source.data.path.includes(filter.value)) {
      activeElements.add(link.id);
      activeElements.add(link.target.data.id);
    }
  });

  return activeElements;
});

let nodeElements, linkElements;

function updateFilter() {
  nodeElements
    .attr('fill-opacity', (d) =>
      filter.value === '' || activeElements.value.has(d.data.id) ? 1 : 1,
    )
    .attr('fill', (d) =>
      filter.value === '' || activeElements.value.has(d.data.id)
        ? color(d)
        : '#f0f0f0',
    );

  nodeElements
    .selectAll('tspan')
    .attr('filter', (d) =>
      filter.value !== '' && d.data.path.includes(filter.value)
        ? 'url(#glow)'
        : '',
    );

  linkElements
    .attr('stroke-width', ({ id = '' }) =>
      filter.value === '' || activeElements.value.has(id) ? 3 : 3,
    )
    .attr('stroke-opacity', ({ id = '' }) =>
      filter.value === '' || activeElements.value.has(id) ? 0.3 : 0.0,
    )
    .style('stroke', ({ id = '' }) =>
      filter.value === '' || activeElements.value.has(id)
        ? `url(#${gradientId({ id })})`
        : '#999999',
    );
}

watch(filter, async () => {
  updateFilter();
  filterChanged.value = true;
});

function create(svg: Selection<null, unknown, null, undefined>) {
  nodeElements = svg
    .select('g.nodes')
    .selectAll('g')
    .data(root.value.leaves())
    .join('g')
    .classed('node', true)
    .attr('class', (d) => 'node')
    .attr(
      'transform',
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`,
    )
    .append('text')
    .attr('x', (d) =>
      d.x < Math.PI ? baselineHeight.value / 2 : -baselineHeight.value / 2,
    )
    .attr('text-anchor', ({ x }) => (x < Math.PI ? 'start' : 'end'))
    .attr('transform', ({ x }) => (x >= Math.PI ? 'rotate(180)' : null))
    .attr('fill', color);

  nodeElements
    .append('tspan')
    .text((d) => (d.x <= Math.PI ? d.data.groupName : d.data.label))
    .classed('group', ({ x }) => x <= Math.PI)
    .on('mouseover', (_, d) => {
      filter.value =
        d.x <= Math.PI
          ? d.data.ancestors.slice(1).reverse().join('.')
          : d.data.ancestors.slice(0).reverse().join('.');
    });
  nodeElements
    .append('tspan')
    .text((d) => (d.x >= Math.PI ? d.data.groupName : d.data.label))
    // .classed('bold', ({ x }) => x > Math.PI)
    .attr('dx', 7)
    .on('mouseover', (_, d) => {
      filter.value =
        d.x > Math.PI
          ? d.data.ancestors.slice(1).reverse().join('.')
          : d.data.ancestors.slice(0).reverse().join('.');
    });

  const dTheta = 0.0;

  linkElements = svg
    .select('g.links')
    .selectAll('path.link')
    .data(links.value)
    .join('path')
    .style('stroke', (d) => {
      return `url(#${gradientId(d)})`;
    })
    .classed('link', true)

    .attr('d', ({ source, target }) => {
      return ribbon()({
        source: {
          startAngle: source.x - dTheta,
          endAngle: source.x + dTheta,
          radius: source.y,
        },
        target: {
          startAngle: target.x - dTheta,
          endAngle: target.x + dTheta,
          radius: source.y,
        },
      });
    });

  const objectiveNodes = root.value
    .leaves()
    .filter((d) => d.id?.startsWith('agenda.objectives'));

  const facilityNodes = root.value
    .leaves()
    .filter((d) => d.id?.startsWith('agenda.facilities'));

  const topicsNodes = root.value
    .leaves()
    .filter((d) => d.id?.startsWith('agenda.topics'));

  const legendData = [
    {
      level: 0,
      height: 1,
      name: 'Ziele',
      color: green,
      startAngle: Math.min(...objectiveNodes.map(({ x }) => x)),
      endAngle: Math.max(...objectiveNodes.map(({ x }) => x)),
    },
    {
      level: 0,
      height: 1,
      name: 'Anlagen',
      color: blue,
      label: 'Anlagen',
      startAngle: Math.min(...facilityNodes.map(({ x }) => x)),
      endAngle: Math.max(...facilityNodes.map(({ x }) => x)),
    },
    {
      level: 0,
      height: 1,
      name: 'Themen',
      color: red,
      startAngle: Math.min(...topicsNodes.map(({ x }) => x)),
      endAngle: Math.max(...topicsNodes.map(({ x }) => x)),
      innerRadius: radius.value - baselineHeight.value,
      outerRadius: radius.value + baselineHeight.value,
    },
  ];

  svg
    .select('g.legend g.chords')
    .selectAll('path.legend')
    .data(legendData)
    .join('path')
    .classed('legend', true)
    .attr('filter', 'url(#shadow)')
    .attr('id', ({ name }) => name)
    .attr('fill', ({ color }) => `${color}`)
    .attr('fill-opacity', 0.95)
    .datum(({ startAngle, endAngle, level, height }) => ({
      startAngle: startAngle - 0.05,
      endAngle: endAngle + 0.05,
      innerRadius: radius.value + (level - 1) * baselineHeight.value,
      outerRadius: radius.value + (level - 1 + height) * baselineHeight.value,
    }))
    .attr('stroke', 'white')
    .attr('d', arc());

  svg
    .select('g.legend g.labels')
    .selectAll('text')
    .data(legendData)
    .join('text')
    .attr('dx', 10)
    .attr('dy', 8)
    .append('textPath')
    .attr('fill', 'white')
    .attr('href', ({ name }) => `#${name}`)
    .text(({ name }) => name);

  renderingCompleted.value = true;
}

function resetFilter() {
  return (filter.value = 'agenda');
}

onMounted(() => {
  const svg = select(svgRef.value);

  createDropShadowFilter(svg as unknown as HTMLOrSVGElement, 'shadow');
  createGlowFilter(svg as unknown as HTMLOrSVGElement, 'glow');
  svg
    .select('defs')
    .append('style')
    .attr('type', 'text/css')

    .text(
      '@font-face{font-family:\'barlowbold\';src:url(data:application/font-woff2;charset=utf-8;base64,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) format("woff2"),url(data:application/font-woff;charset=utf-8;base64,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) format("woff");font-weight:400;font-style:normal}' +
        '.link{mix-blend-mode: lighten;}text{font-family:"Barlow Condensed";font-weight:500;font-size:10px;dominant-baseline:middle}.bold{font-weight:600;}',
    );

  const gradientElements = svg
    .select('defs')
    .selectAll('linearGradient')
    .data(links.value)
    .join('linearGradient')
    .attr('id', gradientId)
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', ({ source }) => radius.value * Math.cos(source.x - Math.PI / 2))
    .attr('y1', ({ source }) => radius.value * Math.sin(source.x - Math.PI / 2))
    .attr('x2', ({ target }) => radius.value * Math.cos(target.x - Math.PI / 2))
    .attr(
      'y2',
      ({ target }) => radius.value * Math.sin(target.x - Math.PI / 2),
    );

  gradientElements
    .append('stop')
    .attr('offset', '0%')
    .attr('stop-color', ({ source }) => color(source));
  gradientElements
    .append('stop')
    .attr('offset', '100%')
    .attr('stop-color', ({ target }) => color(target));

  create(svg);
  updateFilter();
});
</script>

<template>
  <div
    class="chart-container research-agenda"
    :data-filter="filter"
    :data-rendering-completed="renderingCompleted"
  >
    <button
      v-if="filterChanged"
      :style="{ display: 'hidden' }"
      @click="resetFilter"
    >
      reset
    </button>
    <svg
      ref="svgRef"
      :width="width"
      :height="height"
      :viewBox="[-width / 2, -height / 2, width, height].join(' ')"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs />
      <g class="wrapper">
        <g class="ticks" />
        <g class="data">
          <g class="links" />
          <g class="nodes" />
        </g>
        <g class="legend">
          <g class="ring" />
          <g class="chords" />
          <g class="labels" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="stylus">
tspan
  cursor pointer

button
  position absolute

.chart-container.research-agenda
  text
    font-family "Barlow Condensed"
    font-weight 500
    font-size 10px
dominant-baseline middle

   font-weight: 700;

  .group
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing .2px
</style>
