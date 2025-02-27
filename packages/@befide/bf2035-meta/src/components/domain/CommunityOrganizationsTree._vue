<template>
  <div class="card">
    <TreeTable
      :value="nodes"
      dataKey="id"
      v-model:expandedKeys="expandedKeys"
      size="small"
    >
      <Column
        field="data.label.fullName.en"
        :sortable="true"
        :expander="true"
        header="Label"
        style="width: 40%"
      >
        <template #body="data">
          <div>
            <span class="font-bold">
              {{ data.node.data.data.label.fullName.en }} </span
            ><br />
            <span> </span>
          </div>
        </template>
      </Column>
    </TreeTable>
  </div>
</template>

<script setup>
import TreeTable from 'primevue/treetable';

import Column from 'primevue/column';

const props = defineProps({
  dataJSON: String
});

const dataJSON = props.dataJSON || '';

import { ref, onMounted } from 'vue';
const nodes = ref();
const expandedKeys = ref({});
const keys = ref([]);

onMounted(async () => {
  const data = JSON.parse(dataJSON);
  nodes.value = [data.tree];
  keys.value = data.keys;
  expandAll();
});

const expandAll = () => {
  expandedKeys.value = keys.value.reduce(
    (acc, p) => (acc[p] = true) && acc,
    {}
  );
};
// const collapseAll = () => {
//   expandedKeys.value = null;
// };
// const handleRowClickEvent = (event) => {
//   console.log(event);
// };
</script>
