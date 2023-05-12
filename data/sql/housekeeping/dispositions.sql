SELECT
  d.id "DispositionId",
  d.dxcode "DispositionCode",
  d."name" "DispositionName"
FROM dispositions d
JOIN dispositiongroupdispositions dgd ON d.id = dgd.dispositionid
JOIN dispositiongroups dg ON dg.id = dgd.dispositiongroupid
WHERE dg.uid >= 1000 AND dg.uid < 9000
ORDER BY d.dxcode;
