<template>
  <div class="card">
    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      dataKey="id"
      sortMode="multiple"
      :sortOrder="sortOrder"
      :sortField="id"
    >
      <Column header="Short" sortable>
        <template #body="slotProps">
          {{ slotProps.data.data['label.long-form.de'] }}
        </template>
      </Column>

      <Column header="Type">
        <template #body="slotProps">
          {{ slotProps.data.data['meta.befideOrganizationCategories'] }}
        </template>
      </Column>

      <Column header="profs">
        <template #body="slotProps">
          {{ slotProps.data.data['peopleCount.uniqueProfessors'] }}
        </template>
      </Column>
      <Column header="senior scientists">
        <template #body="slotProps">
          {{ slotProps.data.data['peopleCount.uniqueSeniorResearchers'] }}
        </template>
      </Column>
      <Column header="post docs">
        <template #body="slotProps">
          {{ slotProps.data.data['peopleCount.uniquePostDocs'] }}
        </template>
      </Column>
      <Column header="phd students">
        <template #body="slotProps">
          {{ slotProps.data.data['peopleCount.uniquePostDocs'] }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';

const data = ref();

onMounted(async () => {
  data.value = await fetch('/api/organization-tree.json').then((response) =>
    response.json()
  );
});
</script>
x
