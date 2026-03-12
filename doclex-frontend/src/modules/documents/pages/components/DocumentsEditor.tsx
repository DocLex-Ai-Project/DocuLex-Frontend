import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

// Define the expected props for TypeScript
interface DocumentEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ content, setContent }) => {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start drafting your document here...',
    height: 800,
    toolbarButtonSize: 'middle' as const, 
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'font', 'fontsize', 'brush', '|',
      'align', 'outdent', 'indent', '|',
      'ul', 'ol', '|',
      'table', 'link', 'image', 'hr', '|',
      'undo', 'redo', 'print', 'fullsize'
    ],
    uploader: {
      insertImageAsBase64URI: true, 
    },
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
    }
  }), []);

  return (
    <div className="bg-slate-100 p-8 rounded-md border border-gray-200 overflow-y-auto">
      <div className="max-w-[816px] mx-auto shadow-lg bg-white">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} 
          onBlur={newContent => setContent(newContent)} 
          onChange={newContent => {}} 
        />
      </div>
    </div>
  );
};

export default DocumentEditor;