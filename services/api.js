// Placeholder API — sostituisci con fetch/axios verso il tuo backend
export async function registerUser(data){ return { success: true }; }
export async function loginUser(data){ return { token: "fake" }; }
export async function forgotPasswordEmail(data){ return { success: true }; }
export async function resetPasswordEmail(data){ return { success: true }; }
export async function getEvents(){ return [{id:'1',title:'Dance night',image:'/assets/dance_event.png',time:'21h'},{id:'2',title:'Raggaeton',image:'/assets/reggaeton_event.png',time:'3h'}]; }
export async function getEvent(id){ return { id, title: id==='1'?'Dance night':'Raggaeton', image:'/assets/reggaeton_event.png' }; }
export async function getEventUsers(id){ return [{id:'u1',name:'Marco Rossi',avatar:'/assets/u1.jpg'},{id:'u2',name:'Luca Carli',avatar:'/assets/u2.jpg'},{id:'u3',name:'Martina di Stefano',avatar:'/assets/u3.jpg'}]; }
export async function getUser(id){ return { id, name: id==='me'?'Marco Rossi':'Marta Migliore', bio:'Bio utente', phone:'+393888888888', avatar:'/assets/u3.jpg' }; }
export async function updateMe(data){ return { success:true, ...data }; }
