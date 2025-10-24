import api from "@/services/axios";




// Placeholder API — sostituisci con fetch/axios verso il tuo backend
export async function registerUser(data){ 
  try {
    // Mappa il campo del form "name" al payload "displayName" richiesto dal backend
    const payload = {
      email: data?.email,
      password: data?.password,
      displayName: (data?.name ?? data?.displayName ?? '').trim(),
    };

    const res = await api.post("/auth/register", payload, {
      headers: { skipAuth: true },
    });

    // Se il backend ritorna subito un token, autentica l'utente come nel login
    const token = res?.data?.access_token;
    if (token) {
      try { localStorage.setItem("token", token); } catch (_) {}
      try {
        const maxAgeSeconds = 60 * 60 * 24 * 7;
        document.cookie = `token=${token}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
      } catch (_) {}
    }

    return res?.data ?? { success: true };
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data?.message || "Registrazione non riuscita");
    } else if (err.request) {
      throw new Error("Impossibile connettersi al server");
    } else {
      throw new Error(err.message || "Errore sconosciuto");
    }
  }
}
/*export async function loginUser(data){ return { token: "fake" }; }*/
export async function forgotPasswordEmail(data){ return { success: true }; }
export async function resetPasswordEmail(data){ return { success: true }; }
export async function getEventMock(id){ return { id, title: id==='1'?'Dance night':'Raggaeton', image:'/assets/reggaeton_event.png' }; }
export async function getEventUsers(id){ return [{id:'u1',name:'Marco Rossi',avatar:'/assets/u1.jpg'},{id:'u2',name:'Luca Carli',avatar:'/assets/u2.jpg'},{id:'u3',name:'Martina di Stefano',avatar:'/assets/u3.jpg'}]; }
export async function getUser(id){ return { id, name: id==='me'?'Marco Rossi':'Marta Migliore', bio:'Bio utente', phone:'+393888888888', avatar:'/assets/u2.jpg' }; }
export async function updateMe(data){ return { success:true, ...data }; }
export async function getEvent(id){ return { id, title: id==='1'?'Dance night':'Raggaeton', image:'/assets/reggaeton_event.png' }; }
export async function getUserMock(id){ return { id, name: id==='me'?'Marco Rossi':'Marta Migliore', bio:'Bio utente', phone:'+393888888888', avatar:'/assets/u2.jpg' }; }

export async function getEventsMock(){ return [{id:'1',title:'Dance night',image:'/assets/dance_event.png',time:'21h'},{id:'2',title:'Raggaeton',image:'/assets/reggaeton_event.png',time:'3h'}]; }

export async function getEvents(){
     return [{id:'1',title:'Dance night',image:'/assets/dance_event.png',time:'21h'},{id:'2',title:'Raggaeton',image:'/assets/reggaeton_event.png',time:'3h'}]; }
/*

export async function getEvents() {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("http://localhost:3000/events/mine", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
*/

export async function loginUser(credentials) {
  try {
    const res = await api.post("/auth/login", credentials, {
      headers: { skipAuth: true },
    });

    // Se non esiste res.data o il token, lancia errore
    if (!res?.data?.access_token) {
      throw new Error("Token non ricevuto dal server");
    }

    const token = res.data.access_token;
    localStorage.setItem("token", token);
    console.log(token);

    // Imposta anche un cookie leggibile dal middleware (non HttpOnly)
    // Così le rotte protette vedono il token lato server
    try {
      const maxAgeSeconds = 60 * 60 * 24 * 7; // 7 giorni
      document.cookie = `token=${token}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
    } catch (_) {
      // In ambienti non browser ignora
    }

    return res.data;
  } catch (err) {
    // Se errore di rete
    if (err.response) {
      // Il server ha risposto ma con status != 2xx
      throw new Error(err.response.data?.message || "Credenziali non valide");
    } else if (err.request) {
      // Nessuna risposta dal server
      throw new Error("Impossibile connettersi al server");
    } else {
      // Altro errore (es. bug nel codice)
      throw new Error(err.message || "Errore sconosciuto");
    }
  }
}

// Effettua il logout dell'utente rimuovendo token da storage e cookie.
// Prova anche a informare il backend (se l'endpoint esiste), ma pulisce sempre lato client.
export async function logoutUser() {
  try {
    // Se il backend espone un logout, chiamalo (non obbligatorio per pulire il client)
    await api.post("/auth/logout");
  } catch (_) {
    // Ignora eventuali errori del backend per garantire il logout client-side
  }

  try {
    localStorage.removeItem("token");
  } catch (_) {}

  try {
    document.cookie = "token=; path=/; max-age=0; samesite=lax";
  } catch (_) {}

  return { success: true };
}
