<template>
  <Toolbar>
    <template #end>
      <SelectButton v-model="aggregationMode" :options="aggregationModes" />
    </template>
  </Toolbar>
  <div class="card">
    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      size="small"
      dataKey="id"
      :loading="loading"
      removableSort
      sortField="data.partOf.id"
      :sortOrder="-1"
      v-model:expandedRowGroups="expandedRowGroups"
      expandableRowGroups
      groupRowsBy="data.partOf.id"
      rowGroupMode="subheader"
      sortMode="single"
    >
      <ColumnGroup type="header">
        <Row>
          <Column header="#" :rowspan="4" />
          <Column header="Name" :rowspan="4" />
          <Column header="#people" :colspan="54" />
        </Row>
        <Row>
          <Column header="professors" :colspan="6" />
          <Column header="senior researchers" :colspan="6" />
          <Column header="post docs" :colspan="6" />
          <Column header="phd students" :colspan="6" />
          <Column header="master students" :colspan="6" />
          <Column header="bachelor students" :colspan="6" />
        </Row>
        <Row>
          <Column header="physicsts" :colspan="3" />
          <Column header="engineers" :colspan="3" />
          <Column header="physicsts" :colspan="3" />
          <Column header="engineers" :colspan="3" />
          <Column header="physicsts" :colspan="3" />
          <Column header="engineers" :colspan="3" />
          <Column header="physicsts" :colspan="3" />
          <Column header="engineers" :colspan="3" />
          <Column header="physicsts" :colspan="3" />
          <Column header="engineers" :colspan="3" />
          <Column header="physicsts" :colspan="3" />
          <Column header="engineers" :colspan="3" />
        </Row>
        <Row>
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
          <Column header="f" :colspan="1" />
          <Column header="m" :colspan="1" />
          <Column header="o" :colspan="1" />
        </Row>
      </ColumnGroup>
      <template #groupheader="slotProps">
        <span class="align-middle ml-2 font-bold leading-normal">{{
          slotProps.data.data.partOf.id
        }}</span>
      </template>
      <Column header="#" headerStyle="width:10rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <template #empty> No working groups found. </template>
      <template #loading> Loading working groups data. Please wait. </template>

      <Column
        header="Name"
        sortable
        field="data.label.longForm.en"
        style="width: 25%; white-space: nowrap"
      >
        <template #body="data"
          ><span>{{ data.data.data.label.longForm.en }}</span>
        </template>
      </Column>

      <Column
        v-for="col of peopleCountColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      >
        <template #body="data">
          {{
            data.field.split('.').reduce((o, i) => o[i], data.data) === null
              ? '-'
              : data.field.split('.').reduce((o, i) => o[i], data.data)
          }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

import crossProduct from '@/utils/d3-array-cross';

import SelectButton from 'primevue/selectbutton';
// import Toolbar from 'primevue/Toolbar';
const aggregationModes = [
  'position/discipline/gender',
  'gender',
  'discipline/gender'
];
const aggregationMode = ref([]);

const data = ref([]);
const expandedRowGroups = ref([]);
const loading = ref(true);

const positions = [
  'uniqueProfessors',
  'uniqueSeniorResearchers',
  'uniquePostDocs',
  'uniquePhdStudents',
  'uniqueMasterStudents',
  'uniqueBachelorStudents'
];
const discliplines = ['physicist', 'engineer'];
const genders = ['female', 'male', 'other'];
const peopleCountColumns = computed(() => {
  return crossProduct(positions, discliplines, genders).map((d) => ({
    head: d.join('.'),
    field: 'data.peopleCount.' + d.join('.')
  }));
});

onMounted(async () => {
  data.value = await fetch('/api/working-groups.json').then((response) =>
    response.json()
  );
  const partOfIds = Array.from(
    new Set(data.value.map((d) => d.data.partOf.id))
  );

  expandedRowGroups.value = partOfIds;
  loading.value = false;
});
</script>
