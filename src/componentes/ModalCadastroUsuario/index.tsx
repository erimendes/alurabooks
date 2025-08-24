// import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
// import { useState } from "react"
// import imagemPrincipal from './assets/login.png'
// import './ModalCadastroUsuario.css'
// import http from "../../http"

// import axios, { AxiosError } from "axios";

// interface PropsModalCadastroUsuario {
//     aberta: boolean
//     aoFechar: () => void
// }

// const ModalCadastroUsuario = ({ aberta, aoFechar } : PropsModalCadastroUsuario) => {

//     const [nome, setNome] = useState('')
//     const [email, setEmail] = useState('')
//     const [endereco, setEndereco] = useState('')
//     const [complemento, setComplemento] = useState('')
//     const [cep, setCep] = useState('')
//     const [senha, setSenha] = useState('')
//     const [senhaConfirmada, setSenhaConfirmada] = useState('')

//     const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
//         evento.preventDefault()
        
//       // 1. Validação de senhas
//         // if (senha !== senhaConfirmada) {
//         //     alert("As senhas não coincidem!");
//         //     return;
//         // }

//         // 2. Cria o objeto com os dados do usuário. O campo `username` é esperado pelo Django
//         const usuario = {
//             username: nome,
//             email,
//             password: senha, // O campo `password` é esperado pelo Django
//             endereco,
//             complemento,
//             cep,
//         };

//         http.post('api/usuarios', usuario)
//             .then(() => {
//                 alert('Usuário foi cadastrado com sucesso!')
//                 setNome('')
//                 setEmail('')
//                 setEndereco('')
//                 setComplemento('')
//                 setCep('')
//                 setSenha('')
//                 setSenhaConfirmada('')
//                 aoFechar()
//             })
//             .catch(() => {
//                 alert('OPS! Alguma coisa deu errado!')
//             })
//     }

//     return (<AbModal 
//         titulo="Cadastrar" 
//         aberta={aberta}
//         aoFechar={aoFechar}    
//     >
//         <section className="corpoModalCadastro">
//             <figure>
//                 <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
//             </figure>
//             <form onSubmit={aoSubmeterFormular}>
//                 <AbCampoTexto 
//                     label="Nome"
//                     value={nome}
//                     onChange={setNome}
//                 />
//                 <AbCampoTexto 
//                     label="E-mail"
//                     value={email}
//                     onChange={setEmail}
//                     type="email"
//                 />
//                 <AbCampoTexto 
//                     label="Endereço"
//                     value={endereco}
//                     onChange={setEndereco}
//                 />
//                 <AbCampoTexto 
//                     label="Complemento"
//                     value={complemento}
//                     onChange={setComplemento}
//                 />
//                 <AbCampoTexto 
//                     label="CEP"
//                     value={cep}
//                     onChange={setCep}
//                 />
//                 <AbCampoTexto 
//                     label="Senha"
//                     value={senha}
//                     onChange={setSenha}
//                     type="password"
//                 />
//                 <AbCampoTexto 
//                     label="Confirmação da senha"
//                     value={senhaConfirmada}
//                     onChange={setSenhaConfirmada}
//                     type="password"
//                 />
//                 <div className="acoes">
//                     <AbBotao texto="Cadastrar"/>
//                 </div>
//             </form>
//         </section>
//     </AbModal>)
// }

// export default ModalCadastroUsuario


// import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
// import { useState } from "react";
// import imagemPrincipal from "./assets/login.png";
// import "./ModalCadastroUsuario.css";
// import http from "../../http";
// import axios, { AxiosError } from "axios";

// interface PropsModalCadastroUsuario {
//     aberta: boolean;
//     aoFechar: () => void;
// }

// const ModalCadastroUsuario = ({ aberta, aoFechar }: PropsModalCadastroUsuario) => {
//     const [nome, setNome] = useState('');
//     const [email, setEmail] = useState('');
//     const [endereco, setEndereco] = useState('');
//     const [complemento, setComplemento] = useState('');
//     const [cep, setCep] = useState('');
//     const [senha, setSenha] = useState('');
//     const [senhaConfirmada, setSenhaConfirmada] = useState('');
//     const [carregando, setCarregando] = useState(false);

//     const aoSubmeterFormular = async (evento: React.FormEvent<HTMLFormElement>) => {
//         evento.preventDefault();

//         // 1. Validação de senhas
//         if (senha !== senhaConfirmada) {
//             alert("As senhas não coincidem!");
//             return;
//         }

//         // 2. Cria o objeto com os dados do usuário. O campo `username` é esperado pelo Django
//         const usuario = {
//             username: nome,
//             email,
//             password: senha, // O campo `password` é esperado pelo Django
//             endereco,
//             complemento,
//             cep,
//         };

//         setCarregando(true);

//         try {
//             // 3. Faz a requisição POST para a API
//             const resposta = await http.post('api/usuarios/', usuario);

//             // 4. Trata a resposta de sucesso
//             if (resposta.status === 201) {
//                 console.log("Usuário cadastrado com sucesso:", resposta.data);
//                 alert("Usuário foi cadastrado com sucesso!");
//                 // Limpa o formulário e fecha o modal
//                 setNome('');
//                 setEmail('');
//                 setEndereco('');
//                 setComplemento('');
//                 setCep('');
//                 setSenha('');
//                 setSenhaConfirmada('');
//                 aoFechar();
//             }
//         } catch (error) {
//             // 5. Trata a resposta de erro
//             if (axios.isAxiosError(error)) {
//                 const axiosError = error as AxiosError;
//                 console.error("Erro no cadastro:", axiosError.response?.data);
//                 if (axiosError.response?.data) {
//                     const dadosErro = axiosError.response.data;
//                     const mensagens = Object.values(dadosErro).flat().join(", ");
//                     alert(`Erro ao cadastrar usuário: ${mensagens}`);
//                 } else {
//                     alert('OPS! Alguma coisa deu errado no servidor!');
//                 }
//             } else {
//                 console.error("Erro desconhecido:", error);
//                 alert("Ocorreu um erro inesperado.");
//             }
//         } finally {
//             setCarregando(false);
//         }
//     };

//     return (
//         <AbModal 
//             titulo="Cadastrar" 
//             aberta={aberta}
//             aoFechar={aoFechar}    
//         >
//             <section className="corpoModalCadastro">
//                 <figure>
//                     <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
//                 </figure>
//                 <form onSubmit={aoSubmeterFormular}>
//                     <AbCampoTexto 
//                         label="Nome de Usuário"
//                         value={nome}
//                         onChange={setNome}
//                     />
//                     <AbCampoTexto 
//                         label="E-mail"
//                         value={email}
//                         onChange={setEmail}
//                         type="email"
//                     />
//                     <AbCampoTexto 
//                         label="Endereço"
//                         value={endereco}
//                         onChange={setEndereco}
//                     />
//                     <AbCampoTexto 
//                         label="Complemento"
//                         value={complemento}
//                         onChange={setComplemento}
//                     />
//                     <AbCampoTexto 
//                         label="CEP"
//                         value={cep}
//                         onChange={setCep}
//                     />
//                     <AbCampoTexto 
//                         label="Senha"
//                         value={senha}
//                         onChange={setSenha}
//                         type="password"
//                     />
//                     <AbCampoTexto 
//                         label="Confirmação da senha"
//                         value={senhaConfirmada}
//                         onChange={setSenhaConfirmada}
//                         type="password"
//                     />
//                     <div className="acoes">
//                         <AbBotao texto="Cadastrar" />
//                         {/* <AbBotao texto="Cadastrar" desabilitado={carregando}/> */}
//                     </div>
//                 </form>
//             </section>
//         </AbModal>
//     );
// };

// export default ModalCadastroUsuario;

import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import { useState } from "react";
import imagemPrincipal from "./assets/login.png";
import "./ModalCadastroUsuario.css";
import http from "../../http";
import axios, { AxiosError } from "axios";

interface PropsModalCadastroUsuario {
    aberta: boolean;
    aoFechar: () => void;
}

const ModalCadastroUsuario = ({ aberta, aoFechar }: PropsModalCadastroUsuario) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cep, setCep] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    const aoSubmeterFormular = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        setMensagemErro(''); // Limpa a mensagem de erro anterior

        // 1. Validação de senhas
        if (senha !== senhaConfirmada) {
            setMensagemErro("As senhas não coincidem!");
            return;
        }

        // 2. Cria o objeto com os dados do usuário. O campo `username` é esperado pelo Django
        const usuario = {
            username: nome,
            email,
            password: senha, // O campo `password` é esperado pelo Django
            endereco,
            complemento,
            cep,
        };

        setCarregando(true);

        try {
            // 3. Faz a requisição POST para a API
            console.log("chegou aqui")
            console.log(usuario)
            const resposta = await http.post('api/usuarios/', usuario);

            // 4. Trata a resposta de sucesso
            if (resposta.status === 201) {
                console.log("Usuário cadastrado com sucesso:", resposta.data);
                alert("Usuário foi cadastrado com sucesso!");
                // Limpa o formulário e fecha o modal
                setNome('');
                setEmail('');
                setEndereco('');
                setComplemento('');
                setCep('');
                setSenha('');
                setSenhaConfirmada('');
                aoFechar();
            }
        } catch (error) {
            // 5. Trata a resposta de erro
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error("Erro no cadastro:", axiosError.response?.data);
                if (axiosError.response?.data) {
                    const dadosErro = axiosError.response.data;
                    const mensagens = Object.values(dadosErro).flat().join(", ");
                    setMensagemErro(mensagens);
                } else {
                    setMensagemErro('OPS! Alguma coisa deu errado no servidor!');
                }
            } else {
                console.error("Erro desconhecido:", error);
                setMensagemErro("Ocorreu um erro inesperado.");
            }
        } finally {
            setCarregando(false);
        }
    };

    return (
        <AbModal 
            titulo="Cadastrar" 
            aberta={aberta}
            aoFechar={aoFechar}    
        >
            <section className="corpoModalCadastro">
                <figure>
                    <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
                </figure>
                <form onSubmit={aoSubmeterFormular}>
                    <AbCampoTexto 
                        label="Nome de Usuário"
                        value={nome}
                        onChange={setNome}
                    />
                    <AbCampoTexto 
                        label="E-mail"
                        value={email}
                        onChange={setEmail}
                        type="email"
                    />
                    <AbCampoTexto 
                        label="Endereço"
                        value={endereco}
                        onChange={setEndereco}
                    />
                    <AbCampoTexto 
                        label="Complemento"
                        value={complemento}
                        onChange={setComplemento}
                    />
                    <AbCampoTexto 
                        label="CEP"
                        value={cep}
                        onChange={setCep}
                    />
                    <AbCampoTexto 
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                        type="password"
                    />
                    <AbCampoTexto 
                        label="Confirmação da senha"
                        value={senhaConfirmada}
                        onChange={setSenhaConfirmada}
                        type="password"
                    />
                    <div className="acoes">
                        <AbBotao texto="Cadastrar"/>
                    </div>
                </form>
                {/* Exibe a mensagem de erro */}
                {mensagemErro && <div style={{ color: 'red', marginTop: '10px' }}>{mensagemErro}</div>}
            </section>
        </AbModal>
    );
};

export default ModalCadastroUsuario;
