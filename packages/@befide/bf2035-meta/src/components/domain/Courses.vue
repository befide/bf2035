<template>
  <div class="card">
    <Toolbar>
      <template #start> {{ data?.length }} Einträge </template>
    </Toolbar>

    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      v-model:expandedRowGroups="expandedRowGroups"
      expandableRowGroups
      groupRowsBy="data.university.id"
      rowGroupMode="subheader"
      sortMode="single"
    >
      <template #groupheader="slotProps">
        <span class="align-middle ml-2 font-bold leading-normal">{{
          slotProps.data.data.university.id
        }}</span>
      </template>

      <Column header="Title" field="data.label.fullName.de"> </Column>
      <Column header="semester" field="data.semester"> </Column>
      <Column header="SWS" field="data.sws"> </Column>
      <Column header="Typ" field="data.type"> </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const data = ref();
const expandedRowGroups = ref([]);
const loading = ref(true);

onMounted(async () => {
  data.value = await fetch('/api/courses.json').then((response) =>
    response.json()
  );

  const universities = Array.from(
    new Set(data.value.map((d) => d.data.university.id))
  );

  expandedRowGroups.value = universities;
  loading.value = false;
});
</script>
