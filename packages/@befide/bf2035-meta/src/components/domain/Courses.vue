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
        <span class="ml-2 font-bold">{{
          slotProps.data.university.data.label.fullName.en
        }}</span>
      </template>
      <Column
        header="#"
        headerStyle="text-align:right;"
        bodyStyle="text-align:right;"
      >
        <template #body="slotProps">
          <span style="align-self: end"> {{ slotProps.index + 1 }}</span>
        </template>
      </Column>
      <template #empty> No working groups found. </template>
      <template #loading> Loading working groups data. Please wait. </template>

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
