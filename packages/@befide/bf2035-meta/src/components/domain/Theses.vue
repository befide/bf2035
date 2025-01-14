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
      size="small"
      :loading="loading"
      v-model:filters="filters"
      filterDisplay="row"
      @row-click="handleRowClickEvent"
    >
      <template #empty> No organizations found. </template>
      <template #loading> Loading organization data. Please wait. </template>

      <Column header="Author" :sortable="true" field="data.author.familyName">
        <template #body="{ data }">
          <span class="font-bold"> {{ data.data.author.familyName }} </span>,
          <span> {{ data.data.author.givenName }} </span>
        </template>
      </Column>
      <Column header="Gender" :sortable="true" field="data.author.gender">
        <template #body="{ data }">
          <span> {{ data.data.author.gender }} </span>
        </template>
      </Column>
      <Column header="Title" :sortable="true" field="data.title"> </Column>
      <Column header="Typ" :sortable="true" field="type.data.label.fullName.en">
      </Column>
      <Column header="Jahr" :sortable="true" field="data.year"> </Column>
      <Column
        header="Universität"
        :sortable="true"
        field="university.data.label.abbreviatedName.en"
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
  'university.data.label.abbreviatedName.en': {
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
    new Set(data.value.map((d) => d.university.data.label.abbreviatedName.en))
  );

  loading.value = false;
});

const handleRowClickEvent = (event) => {
  console.log(event);
};
</script>
