import React from "react";
<% _.forEach( children, function( child ) { %>import <%= child.name %> from "<%= child.path %><%= child.name %>";
<% }) %>
export default class ${name} extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			
		);
	}
}
