SELECT rr."name" AS "ReferralRoleName", username AS "RoleUserName" FROM pathwaysdos.users u
LEFT JOIN pathwaysdos.userreferralroles urr ON u.id = urr.userid
LEFT JOIN pathwaysdos.referralroles rr ON rr.id = urr.referralroleid
WHERE username LIKE 'TTOOL%'
