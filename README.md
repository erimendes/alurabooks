import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import { useState } from "react"

import imagemPrincipal from './assets/login.png'

import './ModalLoginUsuario.css'

interface PropsModalLoginUsuario {
    aberta: boolean
    aoFechar: () => void
    aoEfetuarLogin: () => void
}

const ModalLoginUsuario = ({ aberta, aoFechar, aoEfetuarLogin } : PropsModalLoginUsuario) => {

    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('')

    const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const usuario = {
            username,
            password: senha
        }

        fetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha no login. Verifique suas credenciais.')
            }
            return response.json()
        })
        .then(data => {
            const token = data.token
            localStorage.setItem('authToken', token)
            setUsername('')
            setSenha('')
            aoEfetuarLogin()
        })
        .catch(error => {
            alert(error.message || 'Erro inesperado ao efetuar login. Tente novamente.')
        })
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
                <form onSubmit={aoSubmeterFormulario}>
                    <AbCampoTexto 
                        label="Usuário"
                        value={username}
                        onChange={setUsername}
                        type="text"
                    />
                    <AbCampoTexto 
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                        type="password"
                    />
                    <div className="acoes">
                        <AbBotao texto="Fazer login" />
                    </div>
                </form>
            </section>
        </AbModal>
    )
}

export default ModalLoginUsuario



![Integrando seu projeto React com APIs](thumbnail.png)

https://github.com/erimendes/alurabooks.git

# Fork para Francisco
# AluraBooks

O AluraBooks é uma loja virtual que vende livros da Casa do Código. 
É um MVP que tá só começando e ainda tem muitas funcionalidades novas para serem desenvolvidas.

<img src="screencapture.png" alt="Imagem do AluraBooks" width="50%">


## 🔨 Funcionalidades do projeto

O AluraBooks começa com a página inicial já pronta, que você pode baixar e utilizar ou então... criar a sua versão baseada <a href="https://www.figma.com/file/POpX503Kobu83iGdiaICvk/React%3A-Alura-Books?node-id=119%3A3145" target="_blank">no figma</a>.
No decorrer da formação nós vamos implementar toda a camada de comunicação com a API, inclusive a autenticação.

## ✔️ Técnicas e tecnologias utilizadas

Se liga nessa lista de tudo que usaremos nessa formação:

- `React`
- `React Hooks`
- `TypeScript`
- `axios`
- `Session Storage`
- `TSDX`
- `NPM` (no primeiro curso nós criamos uma biblioteca e a publicamos no NPM)
- `Github Actions`

E muito mais!

## 🛠️ Abrir e rodar o projeto

Para abrir e rodar o projeto, execute `npm i` para instalar as dependências e `npm start` para inicar o projeto.

Depois, acesse <a href="http://localhost:3000/">http://localhost:3000/</a> no seu navegador.

## 📚 Mais informações do curso

O AluraBooks é o projeto utilizado durante toda a formação, e você pode navegar entre as branchs para encontrar o momento específico que está buscando.
