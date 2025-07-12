import { createResearchAgenda } from '@components/domain/research-agenda/research-agenda';
import type { APIRoute } from 'astro';

const filters = [
  'agenda.facilities.accelerator-science.ares',
  'agenda.facilities.accelerator-science.awake',
  'agenda.facilities.accelerator-science.axsis',
  'agenda.facilities.accelerator-science.berlinpro',
  'agenda.facilities.accelerator-science.cstart',
  'agenda.facilities.accelerator-science.draco',
  'agenda.facilities.accelerator-science.eupraxia',
  'agenda.facilities.accelerator-science.flashforward',
  'agenda.facilities.accelerator-science.flute',
  'agenda.facilities.accelerator-science.jeti',
  'agenda.facilities.accelerator-science.kaldera',
  'agenda.facilities.accelerator-science.kara',
  'agenda.facilities.accelerator-science.lux',
  'agenda.facilities.accelerator-science.mcf',
  'agenda.facilities.accelerator-science.phelix',
  'agenda.facilities.accelerator-science.pitz',
  'agenda.facilities.accelerator-science.plasmedx',
  'agenda.facilities.accelerator-science.s-dalinac',
  'agenda.facilities.accelerator-science.supralab',
  'agenda.facilities.accelerator-science',
  'agenda.facilities.hadron-physics',
  'agenda.facilities.neutron-science',
  'agenda.facilities.particle-physics',
  'agenda.facilities.photon-science',
  'agenda.objectives.beam.emittance',
  'agenda.objectives.beam.intensity-maximum',
  'agenda.objectives.beam.intensity-minimum',
  'agenda.objectives.beam.particle-energy-spread',
  'agenda.objectives.beam.particle-energy',
  'agenda.objectives.facility.construction-cost',
  'agenda.objectives.facility.energy-efficiency',
  'agenda.objectives.facility.operability',
  'agenda.objectives.facility.operation-cost',
  'agenda.objectives.facility.size',
  'agenda.objectives.user.availability',
  'agenda.objectives.user.data-rate',
  'agenda.objectives.user.variable-pulse-structure',
  'agenda',
  'agenda.topics.beam-modeling',
  'agenda.topics.cavity-technology',
  'agenda.topics.energy-supply',
  'agenda.topics.magnet-technology',
  'agenda.topics.materials',
  'agenda.topics.measurement-and-control',
  'agenda.topics',
  'agenda.topics.ultracompact',
];
export const GET: APIRoute = ({ params, request }) => {
  const filter = params.filter;
  return new Response(createResearchAgenda(filter), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
};

export function getStaticPaths() {
  return filters.map((filter) => ({
    params: { filter },
  }));
}
