import React, { useRef, useEffect } from "react"
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
// import List from '@editorjs/list';


interface EditorProps {
    onDataUpdate: (data: OutputData) => void;
}

const DEFAULT_INITIAL_DATA =  {
    "time": new Date().getTime(),
    "blocks": [
        {
        "type": "header",
            "data": {
                "text": "Write your text here",
                "level": 1
            }
        },
    ]
}

export default function TextEditor() {
    const editorRef = useRef<EditorJS | null>(null);
    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                    editorRef.current = editor;
            },
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            onChange: async () => {
                    let content = await editor.saver.save();
    
                    console.log(content);
                },
            tools: { 
                    header: Header, 
                },
            });
        };

    useEffect(() => {
        if (editorRef.current === null) {
            initEditor();
        }
    
        return () => {
            editorRef?.current?.destroy();
            editorRef.current = null;
        };
      }, []);

    return <div id="editorjs"  />;
}
