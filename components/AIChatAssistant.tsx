import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { getAIResponse } from '../lib/ai';

interface Message {
    role: 'user' | 'model';
    parts: { text: string }[];
}

const AIChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', parts: [{ text: input }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const responseText = await getAIResponse(input, messages);

        const botMessage: Message = { role: 'model', parts: [{ text: responseText }] };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[60] flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="pointer-events-auto w-[calc(100vw-32px)] max-w-[320px] sm:w-[380px] h-[450px] sm:h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-clay-100 mb-3 sm:mb-4 animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-clay-900 text-white p-3 sm:p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="bg-white/10 p-1.5 sm:p-2 rounded-full">
                                <Bot size={18} className="sm:w-5 sm:h-5 text-clay-100" />
                            </div>
                            <div>
                                <h3 className="font-serif text-base sm:text-lg leading-tight">Lippan AI</h3>
                                <p className="text-[9px] sm:text-[10px] text-clay-300 uppercase tracking-widest">Studios Assistant</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/10 p-1.5 sm:p-2 rounded-full transition-colors"
                        >
                            <X size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-clay-50/50">
                        {messages.length === 0 && (
                            <div className="text-center py-6 sm:py-8 space-y-2">
                                <p className="text-clay-600 font-medium">Namaste! 🙏</p>
                                <p className="text-clay-500 text-sm">Ask me anything about our tradition, prices, or custom orders.</p>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-clay-800 text-white rounded-tr-none'
                                        : 'bg-white text-clay-800 border border-clay-100 rounded-tl-none shadow-sm'
                                        }`}
                                >
                                    {msg.parts[0].text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-clay-100 rounded-tl-none shadow-sm">
                                    <Loader2 className="animate-spin text-clay-400" size={16} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 sm:p-4 bg-white border-t border-clay-100">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Message Lippan AI..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-clay-50 border border-clay-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-clay-500 focus:border-transparent transition-all placeholder:text-clay-400 text-clay-800 text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 p-1.5 text-clay-600 hover:text-clay-900 disabled:text-clay-300 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto bg-clay-900 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative border-2 border-white/20"
            >
                {isOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : (
                    <>
                        <MessageSquare size={22} className="sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                        {!isOpen && messages.length === 0 && (
                            <span className="absolute -top-2 -right-2 bg-clay-400 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] animate-bounce border-2 border-white">
                                1
                            </span>
                        )}
                    </>
                )}
            </button>
        </div>
    );
};

export default AIChatAssistant;
