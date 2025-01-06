<template>
  <div class="card">
    <DataTable
      :value="data"
      sortField="data.degreee"
      tableStyle="min-width: 50rem"
    >
      <Column header="title" field="data.title"> </Column>
      <Column header="Academic degree" field="data.degree"> </Column>
      <Column header="Universities">
        <template #body="slotProps">
          <Tag
            v-for="(item, index) in slotProps.data.data.universities"
            :value="item"
            :key="index"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Tag from 'primevue/tag';
const data = ref();

onMounted(async () => {
  data.value = await fetch('/api/programOfStudies.json').then((response) =>
    response.json()
  );
});
</script>
