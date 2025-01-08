<template>
  <div class="card">
    <DataTable
      :value="facilities"
      sortField="data.degreee"
      tableStyle="min-width: 50rem"
    >
      <Column header="Name" field="data.label.fullName.en"> </Column>
      <Column header="Name" field="data.acceleratorType"> </Column>
      <Column header="Name" field="data.facilityType"> </Column>
      <Column header="Name" field="data.hasHost"> </Column>
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

const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success';

    case 'LOWSTOCK':
      return 'warn';

    case 'OUTOFSTOCK':
      return 'danger';

    default:
      return null;
  }
};
</script>
