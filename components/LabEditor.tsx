import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BrainIcon, ClipboardIcon, CodeBracketIcon } from './icons';

interface LabEditorProps {
    initialPrompt?: string;
}

const LabEditor: React.FC<LabEditorProps> = ({ initialPrompt }) => {
    const [prompt, setPrompt] = useState(initialPrompt || '');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if(initialPrompt) {
            setPrompt(initialPrompt);
        }
    }, [initialPrompt]);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setError('');
        setGeneratedCode('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const fullPrompt = `You are an expert web development assistant. Based on the following prompt, generate a block of HTML and CSS for a single component. Return the code in a JSON object with "html" and "css" keys.
            
Prompt: "${prompt}"`;
            
            const response = await ai.models.generateContent({ 
                model: 'gemini-2.5-flash', 
                contents: fullPrompt, 
                config: { responseMimeType: 'application/json' }
            });

            // The response.text should be a JSON string.
            const jsonResponse = JSON.parse(response.text);
            const { html, css } = jsonResponse;

            const finalHtml = `
<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>
<body>
${html}
</body>
</html>
            `;
            setGeneratedCode(finalHtml);

        } catch (e) {
            console.error(e);
            setError('Failed to generate component. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><CodeBracketIcon className="h-5 w-5"/> Component Prompt</h3>
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={5}
                    placeholder="e.g., A futuristic button with a neon glow effect"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-md p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                />
                <button 
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2 font-orbitron font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all disabled:bg-gray-600"
                >
                    {isLoading ? 'Generating...' : <> <BrainIcon className="h-5 w-5"/> Generate Component </>}
                </button>
                {error && <p className="text-red-400 mt-2">{error}</p>}
                
                {generatedCode && (
                     <div className="mt-4">
                         <h3 className="text-lg font-semibold mb-2">Generated Code</h3>
                         <div className="relative">
                            <textarea
                                readOnly
                                value={generatedCode}
                                rows={10}
                                className="w-full bg-gray-900/70 p-3 rounded-lg border border-gray-700 font-mono text-sm"
                            />
                            <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md hover:bg-gray-600">
                                <ClipboardIcon className="h-4 w-4"/>
                            </button>
                         </div>
                     </div>
                )}
            </div>
            <div>
                 <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                 <div className="aspect-video bg-white rounded-md overflow-hidden border border-gray-700">
                    <iframe 
                        srcDoc={generatedCode}
                        title="Component Preview"
                        className="w-full h-full"
                        sandbox="allow-scripts"
                    />
                 </div>
            </div>
        </div>
    );
};

export default LabEditor;