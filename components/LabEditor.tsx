import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BrainIcon, ClipboardIcon, CodeBracketIcon, ArrowDownTrayIcon, DocumentIcon, PhotoIcon } from './icons';

interface LabEditorProps {
    initialPrompt?: string;
}

interface GeneratedComponent {
    html: string;
    css: string;
    js?: string;
    prompt: string;
    timestamp: number;
}

const LabEditor: React.FC<LabEditorProps> = ({ initialPrompt }) => {
    const [prompt, setPrompt] = useState(initialPrompt || '');
    const [generatedComponents, setGeneratedComponents] = useState<GeneratedComponent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'prompt' | 'preview' | 'code'>('prompt');
    const [selectedComponent, setSelectedComponent] = useState<GeneratedComponent | null>(null);

    useEffect(() => {
        if(initialPrompt) {
            setPrompt(initialPrompt);
        }
    }, [initialPrompt]);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY || process.env.API_KEY });
            const fullPrompt = `You are an expert web development assistant. Based on the following prompt, generate a complete HTML, CSS, and JavaScript component. Return the code in a JSON object with "html", "css", and optionally "js" keys.

Requirements:
- Create a single, reusable component
- Use modern CSS (flexbox, grid, custom properties)
- Include hover effects and animations
- Make it responsive
- Add proper semantic HTML
- Include accessibility features

Prompt: "${prompt}"

Return format:
{
  "html": "<div class='component'>...</div>",
  "css": ".component { /* styles */ }",
  "js": "document.addEventListener('DOMContentLoaded', function() { /* optional JS */ });"
}`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: fullPrompt,
                config: { responseMimeType: 'application/json' }
            });

            const jsonResponse = JSON.parse(response.text);
            const { html, css, js } = jsonResponse;

            const newComponent: GeneratedComponent = {
                html,
                css,
                js,
                prompt,
                timestamp: Date.now()
            };

            setGeneratedComponents(prev => [newComponent, ...prev]);
            setSelectedComponent(newComponent);

        } catch (e) {
            console.error(e);
            setError('Failed to generate component. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyCode = (type: 'html' | 'css' | 'js' | 'combined') => {
        if (!selectedComponent) return;

        let codeToCopy = '';
        switch (type) {
            case 'html':
                codeToCopy = selectedComponent.html;
                break;
            case 'css':
                codeToCopy = selectedComponent.css;
                break;
            case 'js':
                codeToCopy = selectedComponent.js || '';
                break;
            case 'combined':
                codeToCopy = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Component</title>
    <style>
${selectedComponent.css}
    </style>
</head>
<body>
${selectedComponent.html}
${selectedComponent.js ? `<script>${selectedComponent.js}</script>` : ''}
</body>
</html>`;
                break;
        }

        navigator.clipboard.writeText(codeToCopy);
    };

    const handleDownload = (type: 'html' | 'css' | 'js' | 'zip') => {
        if (!selectedComponent) return;

        const timestamp = new Date(selectedComponent.timestamp).toISOString().slice(0, 19).replace(/[:.]/g, '-');

        switch (type) {
            case 'html':
                downloadFile(`${timestamp}-component.html`, generateFullHTML(), 'text/html');
                break;
            case 'css':
                downloadFile(`${timestamp}-styles.css`, selectedComponent.css, 'text/css');
                break;
            case 'js':
                if (selectedComponent.js) {
                    downloadFile(`${timestamp}-script.js`, selectedComponent.js, 'text/javascript');
                }
                break;
            case 'zip':
                downloadAsZip(timestamp);
                break;
        }
    };

    const generateFullHTML = () => {
        if (!selectedComponent) return '';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prompt} - Generated Component</title>
    <style>
${selectedComponent.css}
    </style>
</head>
<body>
${selectedComponent.html}
${selectedComponent.js ? `<script>${selectedComponent.js}</script>` : ''}
</body>
</html>`;
    };

    const downloadFile = (filename: string, content: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadAsZip = (timestamp: string) => {
        handleDownload('html');
        setTimeout(() => handleDownload('css'), 100);
        if (selectedComponent?.js) {
            setTimeout(() => handleDownload('js'), 200);
        }
    };

    const promptTemplates = [
        "A futuristic neon button with hover animations",
        "A glassmorphism card component",
        "An animated loading spinner",
        "A cyberpunk-style navigation menu",
        "A retro pixel art toggle switch",
        "A gradient background generator",
        "A minimalist notification toast",
        "A floating action button with ripple effect"
    ];

    return (
        <div className="space-y-6">
            {/* Prompt Templates */}
            <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-700/50">
                <h3 className="font-orbitron text-lg font-bold text-white mb-3">Quick Start Templates</h3>
                <div className="flex flex-wrap gap-2">
                    {promptTemplates.map((template, index) => (
                        <button
                            key={index}
                            onClick={() => setPrompt(template)}
                            className="px-3 py-1 text-sm bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-full text-purple-300 hover:text-purple-200 transition-all"
                        >
                            {template}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Prompt Input */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                        <h3 id="component-prompt-heading" className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                            <CodeBracketIcon className="h-5 w-5"/>
                            Component Prompt
                        </h3>
                        <label htmlFor="component-prompt" className="sr-only">Component prompt</label>
                        <textarea
                            id="component-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={6}
                            placeholder="Describe the component you want to generate... (e.g., 'A futuristic button with neon glow and hover animations')"
                            aria-labelledby="component-prompt-heading"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-md p-3 text-white focus:ring-purple-500 focus:border-purple-500 resize-none"
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                            className="mt-4 w-full flex items-center justify-center gap-2 py-3 font-orbitron font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>Generating... <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div></>
                            ) : (
                                <> <BrainIcon className="h-5 w-5"/> Generate Component </>
                            )}
                        </button>
                        {error && <p role="alert" className="text-red-400 mt-2 text-sm">{error}</p>}
                    </div>
                </div>

                {/* Component List & Preview */}
                <div className="lg:col-span-2">
                    {generatedComponents.length > 0 && (
                        <div className="space-y-4">
                            {/* Component Tabs */}
                            <div className="flex border-b border-gray-700">
                                {['prompt', 'preview', 'code'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px capitalize ${
                                            activeTab === tab
                                                ? 'text-purple-300 border-purple-400'
                                                : 'text-gray-400 border-transparent hover:text-white'
                                        }`}
                                    >
                                        {tab === 'prompt' && <CodeBracketIcon className="h-4 w-4 inline mr-1" />}
                                        {tab === 'preview' && <PhotoIcon className="h-4 w-4 inline mr-1" />}
                                        {tab === 'code' && <DocumentIcon className="h-4 w-4 inline mr-1" />}
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Component History */}
                            <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-700/50 max-h-32 overflow-y-auto">
                                <h4 className="text-sm font-semibold text-gray-300 mb-2">Recent Components</h4>
                                <div className="space-y-1">
                                    {generatedComponents.slice(0, 3).map((component) => (
                                        <button
                                            key={component.timestamp}
                                            onClick={() => setSelectedComponent(component)}
                                            className={`w-full text-left p-2 text-xs rounded transition-colors ${
                                                selectedComponent?.timestamp === component.timestamp
                                                    ? 'bg-purple-600/30 text-purple-200'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                            }`}
                                        >
                                            {component.prompt.length > 50
                                                ? `${component.prompt.substring(0, 50)}...`
                                                : component.prompt
                                            }
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            {selectedComponent && (
                                <>
                                    {activeTab === 'prompt' && (
                                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                            <h3 className="font-orbitron text-lg font-bold text-white mb-3">Original Prompt</h3>
                                            <p className="text-gray-300 bg-gray-800/50 p-3 rounded border">{selectedComponent.prompt}</p>
                                        </div>
                                    )}

                                    {activeTab === 'preview' && (
                                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                            <h3 className="font-orbitron text-lg font-bold text-white mb-3">Live Preview</h3>
                                            <div className="aspect-video bg-white rounded-md overflow-hidden border border-gray-700">
                                                <iframe
                                                    srcDoc={generateFullHTML()}
                                                    title="Component Preview"
                                                    className="w-full h-full"
                                                    sandbox="allow-scripts allow-same-origin"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'code' && (
                                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-orbitron text-lg font-bold text-white">Generated Code</h3>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleCopyCode('combined')}
                                                        className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors flex items-center gap-1"
                                                    >
                                                        <ClipboardIcon className="h-3 w-3"/> Copy All
                                                    </button>
                                                    <button
                                                        onClick={() => handleDownload('zip')}
                                                        className="px-3 py-1 text-xs bg-green-600 hover:bg-green-500 text-white rounded transition-colors flex items-center gap-1"
                                                    >
                                                        <ArrowDownTrayIcon className="h-3 w-3"/> Download
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {/* HTML */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 id="code-html-heading" className="text-sm font-semibold text-green-400">HTML</h4>
                                                    </div>
                                                    <label htmlFor="code-html" className="sr-only">Generated HTML</label>
                                                    <textarea
                                                        id="code-html"
                                                        readOnly
                                                        value={selectedComponent.html}
                                                        rows={6}
                                                        title="Generated HTML"
                                                        aria-describedby="code-html-heading"
                                                        className="w-full bg-gray-800/70 p-3 rounded-lg border border-gray-700 font-mono text-sm text-green-300"
                                                    />
                                                </div>

                                                {/* CSS */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 id="code-css-heading" className="text-sm font-semibold text-blue-400">CSS</h4>
                                                    </div>
                                                    <label htmlFor="code-css" className="sr-only">Generated CSS</label>
                                                    <textarea
                                                        id="code-css"
                                                        readOnly
                                                        value={selectedComponent.css}
                                                        rows={8}
                                                        title="Generated CSS"
                                                        aria-describedby="code-css-heading"
                                                        className="w-full bg-gray-800/70 p-3 rounded-lg border border-gray-700 font-mono text-sm text-blue-300"
                                                    />
                                                </div>

                                                {/* JavaScript */}
                                                {selectedComponent.js && (
                                                    <div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <h4 id="code-js-heading" className="text-sm font-semibold text-yellow-400">JavaScript</h4>
                                                        </div>
                                                        <label htmlFor="code-js" className="sr-only">Generated JavaScript</label>
                                                        <textarea
                                                            id="code-js"
                                                            readOnly
                                                            value={selectedComponent.js}
                                                            rows={6}
                                                            title="Generated JavaScript"
                                                            aria-describedby="code-js-heading"
                                                            className="w-full bg-gray-800/70 p-3 rounded-lg border border-gray-700 font-mono text-sm text-yellow-300"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {!selectedComponent && generatedComponents.length > 0 && (
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/50 text-center">
                                    <p className="text-gray-400">Select a component from the list above to view details</p>
                                </div>
                            )}
                        </div>
                    )}

                    {generatedComponents.length === 0 && !isLoading && (
                        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/50 text-center">
                            <BrainIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                            <h3 className="font-orbitron text-xl font-bold text-white mb-2">Ready to Create</h3>
                            <p className="text-gray-400">Enter a prompt and generate your first component!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LabEditor;
