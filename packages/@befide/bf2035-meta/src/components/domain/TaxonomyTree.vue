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
      sortField="data.fullName.en"
      :sortOrder="1"
    >
      <template #header> </template>
      <Column
        field="data.fullName.en"
        :sortable="true"
        :expander="true"
        header="Label"
        style="width: 40%"
      >
        <template #body="data">
          <div>
            <span class="font-bold">
              {{ data.node.data.data.label.fullName.en }} </span
            ><br />
            <span>
              {{ data.node.data.data.id }}
            </span>
          </div>
        </template>
      </Column>

      <Column
        field="descendantsCount"
        :sortable="true"
        header="#Einträge"
        style="width: 10%"
      ></Column>

      <Column
        field="data.definition.en"
        header="Beschreibung"
        style="width: 30%"
      >
      </Column>
    </TreeTable>
  </div>
</template>

<script setup lang="ts">
import TreeTable from 'primevue/treetable';
import Button from 'primevue/button';
import Column from 'primevue/column';

import { useTranslations } from 'src/i18n/utils';

const t = useTranslations('de');
import { ref, onMounted } from 'vue';
const nodes = ref();
const expandedKeys = ref({});
const keys = ref([]);

onMounted(async () => {
  const result = await fetch('/api/taxonomy-tree.json').then((response) =>
    response.json()
  );
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
