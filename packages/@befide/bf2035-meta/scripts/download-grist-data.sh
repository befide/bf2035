#!/bin/sh
curl -X 'GET' \
  'https://befide.getgrist.com/api/docs/vGtqDxisUdjkKYGmpzAkDj/download/csv?tableId=Taxonomy' \
  -H 'accept: text/csv' \
  -H 'Authorization: Bearer 839145cf5a7092364d1df58b0908952403ad9657' \
  > /Users/dirk/Projekte/kunde-KfB/@befide/bf2035/packages/@befide/bf2035-meta/src/data/grist/taxonomy.csv


curl -X 'GET' \
  'https://befide.getgrist.com/api/docs/vGtqDxisUdjkKYGmpzAkDj/download/csv?tableId=Facilities' \
  -H 'accept: text/csv' \
  -H 'Authorization: Bearer 839145cf5a7092364d1df58b0908952403ad9657' \
  > /Users/dirk/Projekte/kunde-KfB/@befide/bf2035/packages/@befide/bf2035-meta/src/data/grist/facilities.csv

curl -X 'GET' \
  'https://befide.getgrist.com/api/docs/vGtqDxisUdjkKYGmpzAkDj/download/csv?tableId=Organizations' \
  -H 'accept: text/csv' \
  -H 'Authorization: Bearer 839145cf5a7092364d1df58b0908952403ad9657' \
  > /Users/dirk/Projekte/kunde-KfB/@befide/bf2035/packages/@befide/bf2035-meta/src/data/grist/organizations.csv


curl -X 'GET' \
  'https://befide.getgrist.com/api/docs/vGtqDxisUdjkKYGmpzAkDj/download/csv?tableId=Courses' \
  -H 'accept: text/csv' \
  -H 'Authorization: Bearer 839145cf5a7092364d1df58b0908952403ad9657' \
  > /Users/dirk/Projekte/kunde-KfB/@befide/bf2035/packages/@befide/bf2035-meta/src/data/grist/courses.csv
  