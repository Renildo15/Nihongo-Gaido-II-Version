import React, { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react";

interface ITextEditorProps {
    content: string;
    onContentChanged: (content: string) => void;

}

export default function TextEditor(props: ITextEditorProps) {
    return (
        <Editor
            apiKey='pbv0jdkkhcvo06i60c4xggyb7yalxvduruojunaj1dbxtuze'

            value={props.content}
            onEditorChange={(content) => props.onContentChanged(content)}
            init={{
                height: 340,
                menubar: false,
                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                ],
                toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
        />
    )
}
