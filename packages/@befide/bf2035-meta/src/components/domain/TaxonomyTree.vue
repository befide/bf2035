<template>
  <div class="card">
    <TreeTable
      :value="nodes"
      dataKey="id"
      v-model:expandedKeys="expandedKeys"
      size="large"
      sortField="data.labelShortFormDe"
      :sortOrder="1"
    >
      <template #header>
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
          />
        </div>
      </template>

      <Column
        field="data.labelShortFormDe"
        sortable
        expander
        header="Label"
        class="font-bold"
        style="width: 40%"
      >
        ></Column
      >

      <Column
        field="descendantsCount"
        sortable
        header="#Einträge"
        style="width: 10%"
      ></Column>

      <Column
        field="data.descriptionDe"
        header="Beschreibung"
        style="width: 50%"
      >
      </Column>
    </TreeTable>
  </div>
</template>

<script setup lang="ts">
import TreeTable from 'primevue/treetable';
import Button from 'primevue/button';
import Column from 'primevue/column';

import { getLangFromUrl, useTranslations } from 'src/i18n/utils';

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
</script>
