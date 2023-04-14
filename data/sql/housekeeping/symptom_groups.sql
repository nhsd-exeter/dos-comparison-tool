SELECT
  sg.id "SymptomGroupId",
  sg."name" "SymptomGroupName"
FROM symptomgroupsymptomdiscriminators sgsd
JOIN symptomdiscriminators sd ON sd.id = sgsd.symptomdiscriminatorid
JOIN symptomgroups sg ON sg.id = sgsd.symptomgroupid
WHERE sg.id >= 400
AND sd.description NOT LIKE 'z2.0%'
GROUP BY sg.id, sg."name"
ORDER BY sg.id;
