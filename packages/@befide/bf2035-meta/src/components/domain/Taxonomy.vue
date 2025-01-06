<template>
  <div class="card">
    {{ taxonomy?.length }} entries
    <DataView :value="taxonomy" :layout="layout" size="large">
      <template #header>
        <div class="flex justify-end">
          <SelectButton v-model="layout" :options="options" :allowEmpty="false">
            <template #option="{ option }">
              <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
            </template>
          </SelectButton>
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            {{ index }}
          </div>
        </div></template
      >
      <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2"
          >
            <div
              class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
            >
              <div class="bg-surface-50 flex justify-center rounded p-4">
                <div class="relative mx-auto"></div>
              </div>
              <div class="pt-6">
                <div class="flex flex-row justify-between items-start gap-2">
                  <div>
                    <span
                      class="font-medium text-surface-500 dark:text-surface-400 text-xl"
                      >{{ item.data.labelShortFormDe }}</span
                    >
                    <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import DataView from 'primevue/dataview';
import SelectButton from 'primevue/selectbutton';
import { getLangFromUrl, useTranslations } from 'src/i18n/utils';

const t = useTranslations('de');
import { ref, onMounted } from 'vue';
const taxonomy = ref();

const layout = ref('grid');
const options = ref(['list', 'grid']);

const expandedRowGroups = ref();

onMounted(async () => {
  taxonomy.value = await fetch('/api/taxonomy.json').then((response) =>
    response.json()
  );
});
// const columns = ref([
//   { field: 'type', header: 'Type' },
//   { field: "data['label.long-form.en']", header: 'label' },
//   { field: "data['label.long-form.de']", header: 'label' },
//   { field: 'label.short-form', header: 'Kurz' }
// ]);
// const selectedColumns = ref(columns.value);

// const onToggle = (val) => {
//   selectedColumns.value = columns.value.filter((col) => val.includes(col));
// };
</script>
