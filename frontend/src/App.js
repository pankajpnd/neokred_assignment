import React, { useState } from 'react';

function App() {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    const handleChange = async (e) => {
        const text = e.target.value;
        setMarkdown(text);
        try {
            const response = await fetch('http://localhost:3001/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ markdown: text })
            });
            const data = await response.json();
            setHtml(data.html);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            <textarea
                style={{ width: '50%', height: '400px' }}
                value={markdown}
                onChange={handleChange}
                placeholder="Type Markdown here..."
            />
            <div
                style={{ width: '50%', height: '400px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}

export default App;
