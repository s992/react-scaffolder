var fs = require("fs");
var _ = require("lodash");
var parser = require("tif-parser");
var argv = require("yargs").argv;

if( !argv.in || !argv.out ) {
	console.error("Syntax: node index --in=<file> --out=<path>");
	process.exit(1);
}

var defaultTpl = argv.default || "pure";

var pureClassTpl = _.template( fs.readFileSync("./templates/pure-class.js", "utf8") );
var classTpl = _.template( fs.readFileSync("./templates/class.js", "utf8") );
var fnTpl = _.template( fs.readFileSync("./templates/function.js", "utf8") );

var templateMap = {
	pure: pureClassTpl,
	"class": classTpl,
	fn: fnTpl
};

var components = parser.parse( fs.readFileSync( argv.in, "utf8" ) );

writeComponents( components, argv.out );

function writeComponents( tree, path ) {
	for( var i = 0; i < tree.children.length; i++ ) {
		var child = tree.children[i];

		if( isDir( child.content ) ) {
			writeDir( child, path );
			continue;
		}

		if( isImport( child.comment ) ) {
			continue;
		}

		var tpl = templateMap[ child.comment ] || templateMap[ defaultTpl ];
		var children = child.children.map(c => {
			return {
				name: c.content,
				path: isImport( c.comment ) ? c.comment : "./"
			};
		});

		var component = tpl({ name: child.content, children: children });

		fs.writeFileSync(`${path}${child.content}.js`, component);

		if( child.children.length ) {
			writeComponents( child, path );
		}
	}
}

function writeDir( tree, path ) {
	var newPath = `${path}${tree.content}/`;

	try {
		fs.mkdirSync( newPath );
	} catch( err ) {
		// meh
	}

	writeComponents( tree, newPath );
}

function isDir( name ) {
	return name && name.match(/^[a-z]/);
}

function isImport( name ) {
	return name && name.match(/^\.\./);
}