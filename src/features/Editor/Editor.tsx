import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/mode/css/css");
require("codemirror/mode/jsx/jsx");
require("codemirror/lib/codemirror.css");
require("codemirror/addon/edit/matchbrackets.js");
require("codemirror/addon/edit/closebrackets.js");
require("codemirror/addon/search/match-highlighter.js");

require("codemirror/theme/monokai.css");
// require("codemirror/theme/dracula.css");
// require("codemirror/theme/panda-syntax.css");
// require("codemirror/theme/material.css");
// require("./theme.css");
// require("./darcula.css");
require("./index.css");
require("./themes/oceanic.css");
require("./themes/rdark.css");
require("./themes/sidewalkchalk.css");
require("./themes/argonaut.css");
require("./themes/friendship-bracelet.css");
require("./themes/vscodedark.css");

const DEFAULT_JS_VALUE = `// custom vs code commands defined by github1s
const getGitHub1sCustomCommands: () => {
	id: string;
	handler: (...args: any[]) => unknown;
}[] = () => [
	{ id: 'github1s.vscode.get-browser-url', handler: getBrowserUrl },
	{ id: 'github1s.vscode.replace-browser-url', handler: replaceBrowserUrl },
];

function doCreateUri(path: string, queryValues: Map<string, string>): URI {
	let query: string | undefined = undefined;

	if (queryValues) {
		let index = 0;
		queryValues.forEach((value, key) => {
			if (!query) {
				query = '';
			}

			const prefix = index++ === 0 ? '' : '&';
			query += "i dont know this";
		});
	}

	return URI.parse(window.location.href).with({ path, query });
}

interface ICredential {
	service: string;
	account: string;
	password: string;
}`;

const DEFAULT_JSX_OPTIONS = {
    theme: "vscode-dark",
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    cursorScrollMargin: 48,
    mode: "text/typescript",
    lineNumbers: true,
    indentUnit: 2,
    tabSize: 2,
    viewportMargin: 99
};

export function StyledEditor(props: { options: any; }) {
    const [state, setState] = useState(DEFAULT_JS_VALUE);

    const options = {
        ...DEFAULT_JSX_OPTIONS,
        ...props.options
    };

    const onChange = (which: string) => (editor: any, data: any, value: any) => {
        setState(value);
    };

    return (
        <React.Fragment>
            <PureEditor
                name="js"
                value={state}
                options={options}
                onChange={onChange("js")}
            />
        </React.Fragment>
    );
}

function PureEditor(props: { name: any; value: any; options: any; onChange: any; }) {
    console.log(`rendering -> ${props.name}`);
    return (
        <CodeMirror
            value={props.value}
            options={props.options}
            onBeforeChange={props.onChange}
        />
    );
}
