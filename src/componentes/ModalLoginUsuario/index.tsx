// alurabooks/src/componentes/ModalLoginUsuario/index.tsx
import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import { useState } from "react";
import http from "../../http";
import axios, { AxiosError } from "axios";

import imagemPrincipal from './assets/login.png';

import './ModalLoginUsuario.css';

interface PropsModalLoginUsuario {
    aberta: boolean;
    aoFechar: () => void;
    aoEfetuarLogin: () => void;
}

const ModalLoginUsuario = ({ aberta, aoFechar, aoEfetuarLogin } : PropsModalLoginUsuario) => {

    const [username, setUsername] = useState(''); // MUDANÇA: 'email' para 'username'
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const aoSubmeterFormular = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        setMensagemErro('');
        setCarregando(true);

        const usuario = {
            username: username, // MUDANÇA: o campo agora é `username`
            password: senha,
        };

        try {
            const resposta = await http.post('api-token-auth/', usuario);
            
            sessionStorage.setItem('token', resposta.data.token || resposta.data.key);

            setUsername('');
            setSenha('');
            aoEfetuarLogin();
            aoFechar();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error("Erro no login:", axiosError.response?.data);
                if (axiosError.response?.data) {
                    const dadosErro = axiosError.response.data;
                    const mensagens = Object.values(dadosErro).flat().join(", ");
                    setMensagemErro(mensagens);
                } else {
                    setMensagemErro(`Erro no servidor: ${axiosError.message}`);
                }
            } else {
                console.error("Erro desconhecido:", error);
                setMensagemErro("Ocorreu um erro inesperado.");
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <AbModal 
            titulo="Login" 
            aberta={aberta}
            aoFechar={aoFechar}    
        >
            <section className="corpoModalCadastro">
                <figure>
                    <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
                </figure>
                <form onSubmit={aoSubmeterFormular}>
                    <AbCampoTexto 
                        label="Username" // MUDANÇA: 'E-mail' para 'Username'
                        value={username}
                        onChange={setUsername}
                        type="text" // MUDANÇA: 'email' para 'text'
                    />
                    <AbCampoTexto 
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                        type="password"
                    />
                    <div className="acoes">
                        <AbBotao texto="Fazer login"/>
                    </div>
                    {/* Exibe a mensagem de erro */}
                    {mensagemErro && <div style={{ color: 'red', marginTop: '10px' }}>{mensagemErro}</div>}
                </form>
            </section>
        </AbModal>
    );
};

export default ModalLoginUsuario;




// import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
// import { useState } from "react";
// import http from "../../http";
// import axios, { AxiosError } from "axios";

// import imagemPrincipal from './assets/login.png';

// import './ModalLoginUsuario.css';

// interface PropsModalLoginUsuario {
//     aberta: boolean;
//     aoFechar: () => void;
//     aoEfetuarLogin: () => void;
// }

// const ModalLoginUsuario = ({ aberta, aoFechar, aoEfetuarLogin } : PropsModalLoginUsuario) => {

//     const [email, setEmail] = useState('');
//     const [senha, setSenha] = useState('');
//     const [mensagemErro, setMensagemErro] = useState('');
//     const [carregando, setCarregando] = useState(false);

//     const aoSubmeterFormular = async (evento: React.FormEvent<HTMLFormElement>) => {
//         evento.preventDefault();
//         setMensagemErro(''); // Limpa a mensagem de erro anterior
//         setCarregando(true);

//         // A view de login do Django (obtain_auth_token) espera 'username' e 'password'.
//         // Estamos usando 'email' como 'username' para o login.
//         const usuario = {
//             username: email,
//             password: senha,
//         };

//         try {
//             // O endpoint de login que configuramos no backend é 'api-token-auth/'.
//             const resposta = await http.post('api-token-auth/', usuario);
            
//             // A resposta do Django retorna o token no campo 'token' ou 'key'.
//             sessionStorage.setItem('token', resposta.data.token || resposta.data.key);

//             // Limpa o formulário e fecha o modal
//             setEmail('');
//             setSenha('');
//             aoEfetuarLogin();
//             aoFechar();
//         } catch (error) {
//             // Trata erros de requisição
//             if (axios.isAxiosError(error)) {
//                 const axiosError = error as AxiosError;
//                 console.error("Erro no login:", axiosError.response?.data);
//                 if (axiosError.response?.data) {
//                     const dadosErro = axiosError.response.data;
//                     const mensagens = Object.values(dadosErro).flat().join(", ");
//                     setMensagemErro(mensagens);
//                 } else {
//                     setMensagemErro(`Erro no servidor: ${axiosError.message}`);
//                 }
//             } else {
//                 console.error("Erro desconhecido:", error);
//                 setMensagemErro("Ocorreu um erro inesperado.");
//             }
//         } finally {
//             setCarregando(false);
//         }
//     }

//     return (
//         <AbModal 
//             titulo="Login" 
//             aberta={aberta}
//             aoFechar={aoFechar}    
//         >
//             <section className="corpoModalCadastro">
//                 <figure>
//                     <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
//                 </figure>
//                 <form onSubmit={aoSubmeterFormular}>
//                     <AbCampoTexto 
//                         label="E-mail"
//                         value={email}
//                         onChange={setEmail}
//                         type="email"
//                     />
//                     <AbCampoTexto 
//                         label="Senha"
//                         value={senha}
//                         onChange={setSenha}
//                         type="password"
//                     />
//                     <div className="acoes">
//                         <AbBotao texto="Fazer login" />
//                         {/* <AbBotao texto="Fazer login" desabilitado={carregando}/> */}
//                     </div>
//                     {/* Exibe a mensagem de erro */}
//                     {mensagemErro && <div style={{ color: 'red', marginTop: '10px' }}>{mensagemErro}</div>}
//                 </form>
//             </section>
//         </AbModal>
//     );
// };

// export default ModalLoginUsuario;








// import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
// import { useState } from "react"
// import http from "../../http"

// import imagemPrincipal from './assets/login.png'

// import './ModalLoginUsuario.css'

// interface PropsModalLoginUsuario {
//     aberta: boolean
//     aoFechar: () => void
//     aoEfetuarLogin: () => void
// }

// const ModalLoginUsuario = ({ aberta, aoFechar, aoEfetuarLogin } : PropsModalLoginUsuario) => {

//     const [email, setEmail] = useState('')
//     const [senha, setSenha] = useState('')

//     const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
//         evento.preventDefault()
//         const usuario = {
//             email,
//             senha,
//         }
//         http.post('public/login', usuario)
//             .then(reposta => {
//                 sessionStorage.setItem('token', reposta.data.access_token)
//                 setEmail('')
//                 setSenha('')
//                 aoEfetuarLogin()
//             })
//             .catch(erro => {
//                 if (erro?.response?.data?.message) {
//                     alert(erro.response.data.message)
//                 } else {
//                     alert('Aconteceu um erro inesperado ao afetuar o seu login! Entre em contato com o suporte!')
//                 }
                
//             })
//     }

//     return (<AbModal 
//         titulo="Login" 
//         aberta={aberta}
//         aoFechar={aoFechar}    
//     >
//         <section className="corpoModalCadastro">
//             <figure>
//                 <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
//             </figure>
//             <form onSubmit={aoSubmeterFormular}>
//                 <AbCampoTexto 
//                     label="E-mail"
//                     value={email}
//                     onChange={setEmail}
//                     type="email"
//                 />
//                 <AbCampoTexto 
//                     label="Senha"
//                     value={senha}
//                     onChange={setSenha}
//                     type="password"
//                 />
//                 <div className="acoes">
//                     <AbBotao texto="Fazer login"/>
//                 </div>
//             </form>
//         </section>
//     </AbModal>)
// }

// export default ModalLoginUsuario