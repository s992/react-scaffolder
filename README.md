# react-scaffolder

react-scaffolder turns a tab indented tree into empty React components.

## Usage

Start with a tab indented tree saved somewhere (e.g. components.txt):

```
Chat
	ChatHeader
		UserCount
	ChatMessages
		ChatMessage
			UserAvatar
			UserName
	ChatFooter
		ChatInput
```

Run `node index.js --in=/path/to/components.txt --out=/path/to/output/`

This will fill `/path/to/output` with each component from the tree, with parents automatically importing their children.

## Directories

It also supports breaking up components by directory. It will look for nodes that have a lowercase first letter and create directories for those nodes. All components nested under those nodes will be created within that directory. You can import from other directories by adding a comment to a node.

```
chat
	Chat
		ChatHeader
			UserCount
		ChatMessages
			ChatMessage
				UserAvatar # ../user/
				UserName # ../user/
		ChatFooter
			ChatInput
user
	UserAvatar
	UserName
```

## Component Types

There are three component types supported:

1. Pure Component (pure)
2. Component (class)
3. Stateless Function Component (fn)

The default is to use pure components, but that can be changed by calling the program with the `--default` flag, e.g. `--default=fn`.

Types can also be specified next to each node with comments:

```
chat
	Chat
		ChatHeader
			UserCount # fn
		ChatMessages
			ChatMessage # fn
				UserAvatar # ../user/
				UserName # ../user/
		ChatFooter
			ChatInput # class
user
	UserAvatar
	UserName
```