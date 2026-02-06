
import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

// Implement required encode/decode functions
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const VoiceDemo: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Default configurations for the optimized restaurant experience
  const MAIN_VOICE = 'Kore';
  const SYSTEM_INSTRUCTION = `You are a professional restaurant reservation and ordering assistant for "The Obsidian Grill," a high-end steakhouse. 
  You help guests book tables, check availability, and take food orders for pickup. 
  You are elegant, helpful, and sophisticated. Keep your responses concise and natural. 
  If someone asks to order food, suggest the signature Wagyu steak or truffle fries. Your goal is to answer questions about the menu or handle a booking efficiently.`;

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  const stopDemo = useCallback(() => {
    if (sessionPromiseRef.current) {
      sessionPromiseRef.current.then(session => {
        try { session.close(); } catch (e) {}
      });
      sessionPromiseRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }

    for (const source of sourcesRef.current) {
      try { source.stop(); } catch (e) {}
    }
    sourcesRef.current.clear();
    
    setIsActive(false);
    setIsConnecting(false);
  }, []);

  const startDemo = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const inputAudioContext = audioContextRef.current;
      const outputAudioContext = outputAudioContextRef.current;
      const outputNode = outputAudioContext.createGain();
      outputNode.connect(outputAudioContext.destination);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);

            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };

              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                outputAudioContext,
                24000,
                1
              );
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                try { source.stop(); } catch (e) {}
                sourcesRef.current.delete(source);
              }
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            setError("Connectivity error. Please try again.");
            stopDemo();
          },
          onclose: () => {
            stopDemo();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: MAIN_VOICE } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      sessionPromiseRef.current = sessionPromise;
    } catch (err) {
      setError("Microphone access denied or connection failed.");
      setIsConnecting(false);
    }
  };

  return (
    <section id="demo" className="py-24 px-6 bg-[#0A0A0A] border-y border-[#282828] overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black tracking-[0.2em] text-primary mb-6 uppercase">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${!isActive && 'hidden'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 bg-primary ${!isActive && 'opacity-40'}`}></span>
            </span>
            Live Assistant Instance
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
            INTERACT WITH THE <span className="text-primary italic">FRONT-OF-HOUSE</span> AGENT.
          </h2>
          <p className="text-xl text-[#99A1AF] font-medium max-w-2xl mx-auto">
            Test a live steakhouse assistant. Try asking for a table for four tonight or inquiring about our signature Wagyu steak.
          </p>
        </div>

        {/* The Core Demo Button */}
        <div className="text-center relative">
          <div className="relative inline-block p-1 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5">
            <div className="bg-black rounded-full p-8 md:p-12 relative">
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-30"></div>
                  <div className="absolute inset-0 border-2 border-primary rounded-full animate-pulse opacity-50"></div>
                </>
              )}

              <button 
                onClick={isActive ? stopDemo : startDemo}
                disabled={isConnecting}
                className={`relative z-10 w-44 h-44 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center transition-all ${
                  isActive ? 'bg-red-500 text-white shadow-xl' : 'bg-primary text-black shadow-primary'
                } hover:scale-105 active:scale-95 disabled:opacity-50`}
              >
                {isConnecting ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-black text-xs uppercase tracking-widest">Waking Agent...</span>
                  </div>
                ) : isActive ? (
                  <>
                    <div className="flex gap-2 mb-4">
                      <div className="w-2 h-8 bg-white animate-[bounce_1s_infinite_100ms] rounded-full"></div>
                      <div className="w-2 h-14 bg-white animate-[bounce_1s_infinite_300ms] rounded-full"></div>
                      <div className="w-2 h-8 bg-white animate-[bounce_1s_infinite_500ms] rounded-full"></div>
                    </div>
                    <span className="font-black text-sm uppercase tracking-[0.2em]">End Session</span>
                  </>
                ) : (
                  <>
                    <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                    <span className="font-black text-sm uppercase tracking-[0.2em]">Start Voice Demo</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 w-max">
              <p className="text-red-400 font-black text-xs uppercase tracking-widest animate-shake px-4 py-2 bg-red-400/10 border border-red-400/20 rounded-full">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="mt-24 max-w-xl text-center">
          <p className="text-[#555] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Hospitality Logic 04-B</p>
          <p className="text-[#99A1AF] text-sm font-medium leading-relaxed italic">
            "By prioritizing guest intent over standard IVR flows, we capture revenue that would otherwise be lost. Our engine handles complex inquiries with human-level warmth and professional precision."
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}} />
    </section>
  );
};

export default VoiceDemo;
