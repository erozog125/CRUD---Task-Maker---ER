import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// Importar una tabla de Firebase
import { 
  getFirestore,
  collection,
  addDoc,
  deleteDoc,  
  onSnapshot,
  getDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyCW7OdaIxzDjVj8WadOJ-8I0y9jRCZwgqg",
 authDomain: "fir-js-crud-8d4ff.firebaseapp.com",
 projectId: "fir-js-crud-8d4ff",
 storageBucket: "fir-js-crud-8d4ff.appspot.com",
 messagingSenderId: "42485767184",
 appId: "1:42485767184:web:e86da08ee6b36fe6de7e95",
};

const app = initializeApp(firebaseConfig);

// 1. Obtener conexión a la base de datos.
const db = getFirestore();

// 2.  Crear función que guarde el título y la descripción de una tarea en Firebase.
export const saveTask = (title, description) => {
  // 3. voy a decirle que añada un documento a la colección tasks. un objeto con las llaves title y description.
  addDoc(collection(db,'tasks'),{title,description});
}

// 3. Función que estará escuchando la DB todo el tiempo para ejecutarse cada vez que se agregue una tarea.
export const onGetTask = (callback) => onSnapshot(collection(db,'tasks'),callback);

// 4. Eliminar una Tarea.
//Primer parámetro la colección y el Id que deseo borrar.
export const deleteTask = id => deleteDoc(doc(db,'tasks',id));

// 5. Obtener una tarea en específico.
export const getTask = id => getDoc(doc(db,'tasks',id));

// 6. Actualizar una tarea específica.
export const updateTask = (id, newFields) => updateDoc(doc(db,'tasks',id),newFields);


