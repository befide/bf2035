<template>
  <Toolbar>
    <template #start> {{ data?.length }} Einträge</template>
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
      v-model:expandedRowGroups="expandedRowGroups"
      expandableRowGroups
      groupRowsBy="data.partOf.id"
      rowGroupMode="subheader"
      sortMode="single"
    >
      <ColumnGroup type="header">
        <Row>
          <Column header="#" :rowspan="4" />
          <Column
            header="Group name"
            :rowspan="4"
            :sortable="true"
            fieldName="label.fullName.en"
          />
          <Column header="affiliation" :rowspan="4" />
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
          slotProps.data.partOf.data.label.fullName.en
        }}</span>
      </template>
      <Column header="#" bodyStyle="text-align:right;">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <template #empty> No working groups found. </template>
      <template #loading> Loading working groups data. Please wait. </template>

      <Column
        header="Group name"
        field="data.label.fullName.en"
        style="width: 25%; white-space: nowrap"
      >
        <template #body="data"
          ><span>{{ data.data.data.label.fullName.en }}</span>
        </template>
      </Column>

      <Column
        header="affiliation"
        field="partOf.data.label.abbreviatedName.en"
        style="width: 25%; white-space: nowrap"
      >
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
      <Column header="Review Status" field="data.meta.reviewStatus">
        <template #body="{ data }">
          <Tag
            :value="data.data.meta.reviewStatus"
            :severity="getSeverity(data.data.meta.reviewStatus)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const props = defineProps(['lang']);
const lang = props.lang;

const getLocalizedFieldName = (fieldName) => [fieldName, lang].join('.');

import crossProduct from '@/utils/d3-array-cross';
import SelectButton from 'primevue/selectbutton';

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

const preSort = [
  { field: 'data.university.id', direction: 'asc' },
  { field: 'data.labelFullName.en', direction: 'asc' }
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

const getSeverity = (reviewStatus) => {
  switch (reviewStatus) {
    case '01: in preparation':
      return 'success';

    case '02: in prereview':
      return 'warn';

    default:
      return null;
  }
};
</script>
