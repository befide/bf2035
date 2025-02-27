<template>
	<div class="card">
		<Toolbar class="mb-6">
			<template #start>
				<div>Number of entries: {{ data?.length }}</div>
				<div>Number of filterd entries: {{ filteredEntryCount }}</div>
			</template>
		</Toolbar>
		<DataTable
			:value="data"
			tableStyle="min-width: 50rem"
			size="small"
			dataKey="id"
			:loading="loading"
			v-model:filters="filters"
			filterDisplay="row"
			removableSort
			sortField="data.label.longForm.en"
			:sortOrder="1"
			@filter="handleFilterEvent"
		>
			<template #empty> No organizations found. </template>
			<template #loading> Loading organization data. Please wait. </template>

			<Column header="Name" sortable field="data.label.fullName.en"> </Column>
			<Column header="Short name" sortable field="data.label.abbreviatedName.en"> </Column>

			<Column header="Type" field="data.meta.befideOrganizationCategories" :showFilterMenu="false">
				<template #body="{ data }">
					<Tag
						v-for="(item, key) in Object.values(data.data.meta.befideOrganizationCategories || [])"
						:value="item"
						:severity="getSeverity(item)"
					/>&nbsp;
				</template>
				<template #filter="{ filterModel, filterCallback }">
					<Select
						v-model="filterModel.value"
						@change="filterCallback()"
						:options="befideOrganizationCategories"
						placeholder="Select One"
						style="min-width: 12rem"
						:showClear="true"
					>
						<template #option="{ option }">{{ option }} </template>
					</Select>
				</template>
			</Column>

			<Column
				header="Country"
				sortable
				field="data.location.country.name.en"
				:showFilterMenu="false"
			>
				<template #body="{ data }">
					<div class="flex items-center gap-2">
						<span
							alt="flag"
							:class="`flag flag-${data.data.location.country.code}`"
							style="width: 1rem; height: 1rem"
						/>
						<span>{{ data.data.location.country.name.en }}</span>
					</div>
				</template>
				<template #filter="{ filterModel, filterCallback }">
					<Select
						v-model="filterModel.value"
						@change="filterCallback()"
						:options="countryNames"
						placeholder="Select One"
						style="min-width: 12rem"
						:showClear="true"
					>
						<template #option="{ option }">{{ option }} </template>
					</Select>
				</template>
			</Column>
			<Column header="City" sortable field="data.location.city"> </Column>
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
import Tag from 'primevue/tag';
const data = ref();
const filteredEntryCount = ref(0);
const befideOrganizationCategories = ref();
const loading = ref(true);

import { FilterMatchMode } from '@primevue/core/api';

const filters = ref({
	'data.location.country.name.en': {
		value: null,
		matchMode: FilterMatchMode.EQUALS,
	},
	'data.meta.befideOrganizationCategories': {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
});

const countryNames = ref();

onMounted(async () => {
	data.value = await fetch('/api/formal-organizations.json').then((response) => response.json());
	befideOrganizationCategories.value = Array.from(
		new Set(data.value.flatMap((d) => d.data.meta.befideOrganizationCategories))
	);
	countryNames.value = Array.from(
		new Set(data.value.flatMap((d) => d.data.location.country.name.en))
	);
	loading.value = false;
});

const getSeverity = (type) => {
	switch (type) {
		case 'international':
			return 'danger';

		case 'hgf':
			return 'success';

		case 'university':
			return 'info';

		case 'mpg':
			return 'warn';

		case 'fraunhofer':
			return 'info';
	}
};
const handleFilterEvent = (event) => {
	filteredEntryCount.value = event.filteredValue.length;
};
</script>
