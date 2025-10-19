'use client';
import {createContext,useContext,useState,useCallback} from 'react';
const C=createContext({show:()=>{}});
export function ToastProvider({children}){const[toasts,setToasts]=useState([]);const show=useCallback((m,t='info')=>{const id=Date.now();setToasts(s=>[...s,{id,message:m,type:t}]);setTimeout(()=>setToasts(s=>s.filter(x=>x.id!==id)),2500);},[]);return(<C.Provider value={{show}}>{children}<div className='fixed bottom-20 inset-x-0 flex flex-col items-center gap-2 z-50'>{toasts.map(t=>(<div key={t.id} className={`px-4 py-2 rounded-xl card ${t.type==='error'?'border-red-400 text-red-300':'border-white/20 text-white'}`}>{t.message}</div>))}</div></C.Provider>);} 
export function useToast(){return useContext(C)}
