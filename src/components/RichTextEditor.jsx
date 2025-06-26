import React, { useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);

    // Sync editor content only when external `value` changes
    useEffect(() => {
        const editor = editorRef.current;
        if (editor && editor.innerHTML !== value) {
            editor.innerHTML = value || '';
        }
    }, [value]);

    // Handle user typing or edits
    const handleInput = (e) => {
        const cleanedHtml = e.currentTarget.innerHTML.replace(/font-family:[^;"]+;?/gi, '');
        onChange(cleanedHtml);
    };


    // Delete image on click with confirmation
    const handleClick = (e) => {
        if (e.target.tagName === 'IMG') {
            if (window.confirm('Delete this image?')) {
                e.target.remove();
                onChange(editorRef.current.innerHTML);
            }
        }
    };

    // Insert uploaded image at the caret position
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgHTML = `<img src="${reader.result}" alt="Uploaded Image" style="max-width:120px; height:120px;" />`;
                insertHTMLAtCursor(imgHTML);
                // Optionally, store the image file in the form state
                setValue("contentImages", [...watch("contentImages"), file]);
            };
            reader.readAsDataURL(file);
            e.target.value = null; // Reset input so the same file can be uploaded again if needed
        }
    };


    // Helper: Insert HTML at caret position
    const insertHTMLAtCursor = (html) => {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) {
            // Append at the end if no selection
            editorRef.current.innerHTML += html;
            onChange(editorRef.current.innerHTML);
            return;
        }
        const range = sel.getRangeAt(0);
        range.deleteContents();

        // Create a fragment from the HTML string
        const el = document.createElement('div');
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        let lastNode;
        while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        // Move the cursor to the end of inserted content
        if (lastNode) {
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // Trigger change with updated HTML
        onChange(editorRef.current.innerHTML);
    };

    return (
        <div>
            <div
                ref={editorRef}
                contentEditable
                spellCheck={false}
                onInput={handleInput}
                onClick={handleClick}
                style={{
                    border: '1px solid #ccc',
                    minHeight: '150px',
                    padding: '10px',
                    overflowY: 'auto',
                    fontFamily: "'Montserrat', sans-serif",
                }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginTop: '10px' }}
            />
        </div>

    );
};

export default RichTextEditor;
