import React from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

const H1 = (props) => {
    const text = props.blockProps.text;
    const text2 = text.substring(text.indexOf('#') + 2, text.length);
    return (<h1>{text2}</h1>)
}

const Red = (props) => {
    const text = props.blockProps.text;
    const text2 = text.substring(text.indexOf('**') + 3, text.length);
    return (<span style={{ color: "red" }}>{text2}</span>)
}

const Underline = (props) => {
    const text = props.blockProps.text;
    const text2 = text.substring(text.indexOf('***') + 4, text.length);
    return (<span style={{ textDecoration: "underline" }}>{text2}</span>)
}

const Bold = (props) => {
    const text = props.blockProps.text;
    const text2 = text.substring(text.indexOf('*') + 2, text.length);
    return (<b>{text2}</b>)
}

function MyBlockRenderer(block) {
    const text = block.getText();
    if (/^\s*#\ /.test(text)) {
        return {
            component: H1,
            editable: true,
            props: {
                text: text,
                key: block.getKey(),
            },
        };
    }
    else if (/^\s*\*\*\*\ /.test(text)) {
        return {
            component: Underline,
            editable: true,
            props: {
                text: text,
                key: block.getKey(),
            },
        };
    }
    else if (/^\s*\*\*\ /.test(text)) {
        return {
            component: Red,
            editable: true,
            props: {
                text: text,
                key: block.getKey(),
            },
        };
    }
    else if (/^\s*\*\ /.test(text)) {
        return {
            component: Bold,
            editable: true,
            props: {
                text: text,
                key: block.getKey(),
            },
        };
    }
}

function MyEditor() {
    const [editorState, setEditorState] = React.useState(() => {
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
            const contentState = convertFromRaw(JSON.parse(savedContent));
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    });

    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor()
    }, []);

    const saveToLocalStorage = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateJSON = JSON.stringify(convertToRaw(contentState));
        localStorage.setItem('editorContent', contentStateJSON);
    }

    return (
        <>
            <div className="header">
                <div className="center">
                    <h2>Demo editor by Prasanna Kumar</h2>
                </div>
                <div className="end">
                    <button onClick={saveToLocalStorage}>Save</button>
                </div>
            </div>
            <div className="solid">
                <div onClick={focusEditor} style={{ height: '80vh', width: '100vw' }}>
                    <Editor
                        ref={editor}
                        editorState={editorState}
                        blockRendererFn={MyBlockRenderer}
                        onChange={editorState => setEditorState(editorState)}
                    />
                </div>
            </div>
        </>
    );
}

export default MyEditor;