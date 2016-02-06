import React from "react";
import PureComponent from "react-pure-render/component";
<% _.forEach( children, function( child ) { %>import <%= child.name %> from "<%= child.path %><%= child.name %>";
<% }) %>
export default class <%= name %> extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			
		);
	}
}
