import type { APIRoute } from 'astro';
import { getCollection, getEntries, getEntry } from 'astro:content';

const courses = await getCollection('courses');

courses.forEach(async (d) => {
	d.offeredByUniversity = await getEntry(d.data.offeredByUniversity);
	d.isInstanceOfTeachingEvent = await getEntry(d.data.isInstanceOfTeachingEvent);
	// d.addressesProgrammeOfStudyLevels = await getEntries(
	//   d.data.addressesProgrammeOfStudyLevels
	// );
});

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(courses, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
