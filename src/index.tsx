import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Encontrar o elemento HTML com o ID 'root'
const container = document.getElementById('root');

// 2. Verificar se o elemento existe. Se não existir, lançar um erro.
if (!container) {
  throw new Error('O elemento com o ID "root" não foi encontrado no DOM.');
}

// 3. Criar a raiz do React com o elemento encontrado
const root = ReactDOM.createRoot(container);

// 4. Renderizar a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
