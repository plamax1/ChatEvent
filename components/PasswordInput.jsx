'use client';
import {useState} from 'react';
export default function PasswordInput(props){const[show,setShow]=useState(false);return(<div className='flex items-center gap-3 rounded-2xl bg-[color:var(--card)] border border-white/10 px-4'><input className='w-full bg-transparent py-3 placeholder-white/40' type={show?'text':'password'} {...props}/><button type='button' onClick={()=>setShow(s=>!s)} className='text-white/70 text-sm'>{show?'Nascondi':'Mostra'}</button></div>)}
