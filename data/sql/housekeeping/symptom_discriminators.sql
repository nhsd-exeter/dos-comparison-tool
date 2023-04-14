SELECT
  sg.id "SymptomGroupId",
  sd.id "SymptomDiscriminatorId",
  sd.description "SymptomDiscriminatorName"
FROM symptomgroupsymptomdiscriminators sgsd
JOIN symptomdiscriminators sd ON sd.id = sgsd.symptomdiscriminatorid
JOIN symptomgroups sg ON sg.id = sgsd.symptomgroupid
WHERE sg.id >= 400
AND sd.description NOT LIKE 'z2.0%'
ORDER BY sg.id, sd.id;
