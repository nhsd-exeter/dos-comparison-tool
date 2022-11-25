import React from "react";

const Body = (props: React.HTMLProps<HTMLDivElement>) => {
	return (
		<main
			{...props}
			className="nhsuk-main-wrapper"
			id="maincontent"
			role="main"
		/>
	);
};

export default Body;
