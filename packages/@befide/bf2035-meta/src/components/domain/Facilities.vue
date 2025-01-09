<template>
  <div class="card">
    <Toolbar>
      <template #start> {{ facilities?.length }} Einträge </template>
    </Toolbar>

    <DataTable
      :value="facilities"
      sortField="data.degreee"
      tableStyle="min-width: 50rem"
    >
      <Column header="Name" field="data.label.fullName.en"> </Column>
      <Column header="Accelerator type" field="data.acceleratorType"> </Column>
      <Column header="Facility type" field="data.facilityType"> </Column>
      <Column header="Host" field="data.hasHost"> </Column>
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

<script setup>
import { ref, onMounted } from 'vue';

onMounted(async () => {
  facilities.value = await fetch('/api/facilities.json').then((response) =>
    response.json()
  );
});

const facilities = ref();
const layout = ref('grid');
const options = ref(['list', 'grid']);

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
