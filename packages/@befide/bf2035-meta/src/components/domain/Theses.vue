<template>
  <div class="card">
    <Toolbar>
      <template #start> {{ data?.length }} Einträge </template>
    </Toolbar>

    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      sortMode="single"
      removableSort
      sortField="data.author"
      :sortOrder="1"
      dataKey="id"
      :loading="loading"
      v-model:filters="filters"
      filterDisplay="row"
    >
      <template #empty> No organizations found. </template>
      <template #loading> Loading organization data. Please wait. </template>

      <Column header="Author" sortable field="data.author"> </Column>
      <Column header="Title" sortable field="data.title"> </Column>
      <Column header="Jahr" sortable field="data.year"> </Column>
      <Column
        header="Universität"
        sortable
        field="data.university.id"
        :showFilterMenu="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="universities"
            placeholder="Select One"
            style="min-width: 12rem"
            :showClear="true"
          >
            <template #option="{ option }">{{ option }} </template>
          </Select>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

const data = ref();
const universities = ref();
const loading = ref(true);

const filters = ref({
  'data.university.id': {
    value: null,
    matchMode: FilterMatchMode.EQUALS
  },
  'data.year': {
    value: null,
    matchMode: FilterMatchMode.EQUALS
  }
});

onMounted(async () => {
  data.value = await fetch('/api/theses.json').then((response) =>
    response.json()
  );

  universities.value = Array.from(
    new Set(data.value.map((d) => d.data.university.id))
  );
  loading.value = false;
});
</script>
