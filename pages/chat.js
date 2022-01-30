import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/componentes/ButtonSendSticker';
import { ButtonSendMessage } from '../src/componentes/ButtonSendMessage';

// install yarn add @supabase/supabase-js
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMDU0NywiZXhwIjoxOTU4ODk2NTQ3fQ.vVaD0TIpkcmWd5k7gYd7WHttHpbb5yfBg6-Op2-yYmc';
const SUPABASE_URL = 'https://glimgmjnzvlwbjdcpojw.supabase.co';
const supaBaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

/*fetch('https://api.github.com/users/engRenanTorres')
.then(async (repostaDoServidor)=>{const dadosRenan = await repostaDoServidor.json()})*/

function atualizaMensagensNaHora (adicionaMensagem) {
    //precisa ativar o banco de dados do supabase para liberar o acesso em tempo real
    //no site supabase: 
    //clica no projeto -> ícone de database na lista da esquerda -> clica em 'replication' na nova lista que aparece
    // ->clica no último item da linha "table 0" -> marcar o checkbox.
    return supaBaseClient
                .from('menssagens')
                .on('INSERT', (respostaImediata)=>{
                    adicionaMensagem(respostaImediata.new);
                })
                .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter()
    const username = roteamento.query.username;
    const [message,setMesage] = useState();
    const [messageList,setMesageList] = useState ([]);
    

    useEffect(()=>{
        supaBaseClient
            .from('menssagens')
            .select('*')
            .order('id',{ascending: false})
            .then(({data})=>setMesageList(data));

        const subscription = atualizaMensagensNaHora((novaMensagem)=>{
        setMesageList((valorAtualDaLista)=>{
            return [
                novaMensagem,
                ...valorAtualDaLista,
            ]}
        )
        });
        return ()=>{
            subscription.unsubscribe();
        }
    },[]);

    function handleNovasMenssagens(novoTexto) {
        const newMessage ={
            //id: messageList.length+1,
            de: username,
            texto: novoTexto,
        }

        supaBaseClient
            .from('menssagens')
            .insert([newMessage])
            .then(({data})=>{
            })
        setMesage('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                //backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/this-is-fine.jpeg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '40px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '70%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    

                    
                    <MessageList mensagens={messageList}/>
            

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <ButtonSendSticker 
                            onStickerClick={(sticker)=>
                                {
                                    handleNovasMenssagens(`:sticker:${sticker}`);
                                }
                            } 
                        />
                        <TextField
                            value={message}
                            onChange={(event)=> 
                                {
                                let variavel= event.target.value
                                setMesage(variavel)
                            }}
                            onKeyPress={(event)=>{
                                if(event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovasMenssagens(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendMessage message={message} handleNovasMenssagens={handleNovasMenssagens}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList({mensagens}) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {mensagens.map((mensagem)=>{
            return(
            <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.de}.png`}
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                { mensagem.texto != null&&  //adicionado para tirar o erro do null
                    (mensagem.texto.startsWith(':sticker:')? 
                    <Image styleSheet={{maxHeight:'100px', maxWidth:'100px'}} src={mensagem.texto.replace(':sticker:','')}/> : 
                    mensagem.texto)

                } 
            </Text>
            )})}
        </Box>
            
    )
}