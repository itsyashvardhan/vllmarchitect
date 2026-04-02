import React from 'react';
import { Maximize, Minimize, Check, XCircle } from 'lucide-react';

export default function DeepDive() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Compound Scaling</h2>
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          EfficientNet revolutionized edge AI by introducing Compound Scaling: uniformly scaling depth (layers), width (channels), and resolution. 
          For Edge VLLMs, <span className="font-bold text-indigo-600">EfficientNet-B0 to B3</span> are the specific sweet spots that align with NPU cache sizes.
        </p>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
               <Check className="text-green-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Pros</h4>
              <p className="text-slate-600 text-sm mt-1">
                Proven on almost all hardware (TPU/GPU/CPU). Excellent accuracy-per-parameter ratio.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
               <XCircle className="text-red-600" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Cons</h4>
              <p className="text-slate-600 text-sm mt-1">
                Swish activation functions can be slower on older NPUs compared to ReLU.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex flex-col items-center justify-center relative">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8 text-center">Compound Scaling Visualization</h3>
        
        {/* Abstract Visualization of Scaling */}
        <div className="relative w-48 h-48">
          {/* Base */}
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-500 rounded-lg opacity-80 z-30 flex items-center justify-center text-white font-bold text-xs shadow-lg transform transition-transform hover:scale-105">
            B0
          </div>
          {/* Width */}
          <div className="absolute bottom-0 left-0 w-32 h-24 bg-slate-400 rounded-lg opacity-60 z-20 flex items-start justify-end p-2 text-white font-bold text-xs">
            Width
          </div>
          {/* Depth */}
          <div className="absolute bottom-0 left-0 w-24 h-32 bg-slate-600 rounded-lg opacity-60 z-20 flex items-end justify-start p-2 text-white font-bold text-xs">
            Depth
          </div>
          {/* Resolution */}
           <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-300 rounded-lg opacity-30 z-10 border-2 border-indigo-400 border-dashed">
          </div>
           <div className="absolute -top-4 -right-4 text-indigo-400 text-xs font-semibold">Resolution</div>
        </div>

        <div className="flex justify-center gap-8 mt-12 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Minimize size={16} /> Depth
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={16} /> Width
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={16} /> Resolution
          </div>
        </div>
      </div>
    </div>
  );
}