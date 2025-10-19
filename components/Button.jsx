'use client';
export default function Button({children,className='',loading=false,...props}){return(<button {...props} disabled={loading||props.disabled} className={`px-4 py-3 rounded-2xl font-medium transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}>{loading?'Attendere...':children}</button>)}
