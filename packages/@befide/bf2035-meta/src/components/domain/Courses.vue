<template>
  <div class="card">
    <DataTable :value="data" tableStyle="min-width: 50rem">
      <Column header="Short" field="data.id"> </Column>
      <Column header="Short">
        <template #body="slotProps">
          {{ slotProps.id }}
        </template>
      </Column>
      <Column header="Short">
        <template #body="slotProps">
          {{ slotProps.data.data['label.long-form.de'] }}
        </template>
      </Column>
      <Column field="data.data.meta.befideOrganizationCategories" header="Type">
        <template #body="slotProps">
          {{ slotProps.data.data['meta.befideOrganizationCategories'] }}
        </template>
      </Column>

      <Column header="people">
        <template #body="slotProps">
          {{ slotProps.data.data['peopleCount.uniqueProfessors'] }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const data = ref();

onMounted(async () => {
  data.value = await fetch('/api/courses.json').then((response) =>
    response.json()
  );
});
</script>
x
