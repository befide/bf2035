<template>
  <div class="card">
    <Toolbar>
      <template #start> {{ keys?.length }} Einträge </template>
      <template #end>
        <div class="flex flex-wrap flex-row gap-2">
          <Button
            icon="pi pi-plus"
            label="Expand All"
            @click="expandAll"
          /><br />
          <Button
            icon="pi pi-minus"
            label="Collapse All"
            @click="collapseAll"
          /></div
      ></template>
    </Toolbar>

    <TreeTable
      :value="nodes"
      dataKey="id"
      v-model:expandedKeys="expandedKeys"
      size="small"
      sortField="data.term.full.en"
      :sortOrder="1"
      :indentation="2"
    >
      <template #header> </template>
      <Column
        field="data.term.full.en"
        :sortable="true"
        :expander="true"
        header="Term"
        style="width: 40%"
      >
        <template #body="data">
          <div>
            <span class="font-bold">
              {{ data.node.data.data.term.full.en }} </span
            ><br />
            <span>{{ data.node.data.data.definition.en }} </span>
          </div>
        </template>
      </Column>

      <Column
        field="descendantsCount"
        :sortable="true"
        header="#Einträge"
        style="width: 10%"
      ></Column>
    </TreeTable>
  </div>
</template>

<script setup lang="ts">
import TreeTable from 'primevue/treetable';
import Button from 'primevue/button';
import Column from 'primevue/column';

import { useTranslations } from 'src/i18n/utils';
const t = useTranslations('de');

const props = defineProps(['acceleratorResearchSpecific']);

import { ref, onMounted } from 'vue';
const nodes = ref();
const expandedKeys = ref({});
const keys = ref([]);

onMounted(async () => {
  const apiURL =
    props.acceleratorResearchSpecific === undefined
      ? '/api/taxonomy-tree.json'
      : props.acceleratorResearchSpecific
        ? '/api/taxonomy-tree__accelerator_research_specific.json'
        : '/api/taxonomy-tree__not-accelerator_research_specific.json';
  const result = await fetch(apiURL).then((response) => response.json());

  nodes.value = result.tree.children;
  keys.value = result.keys;
});

const expandAll = () => {
  expandedKeys.value = keys.value.reduce(
    (acc, p) => (acc[p] = true) && acc,
    {}
  );
};
const collapseAll = () => {
  expandedKeys.value = null;
};
const handleRowClickEvent = (event) => {
  console.log(event);
};
</script>
