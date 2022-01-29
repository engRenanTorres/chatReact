import {Box, Button, Text, TextField, Image} from '@skynexui/components';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import {useState} from 'react';






function Title ({children,tag}) {
    const Tag = tag || 'h1';
    return (
        <>
            <Tag>{children}</Tag>
            <style jsx>{
                `
                ${Tag}{
                    color: ${appConfig.theme.colors.neutrals[100]};
                }
                `
            }
            </style>
        </>
    )
}

/* function HomePage() {
    return (
    <div>
        <GlobalStyle/>
        <Title tag="h1">Bemvindo ao Chat!</Title>
        <h2>Projeto desenvolvido na imersão alura</h2>
    </div>
    )
  }
    export default HomePage */
  export default function PaginaInicial() {
    const [username,setUserName] = useState('engRenanTorres');
    const roteamento = useRouter();
  
    return (
      <>
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          //   backgroundColor: appConfig.theme.colors.primary[500], 
             backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/this-is-fine.jpeg)',
          //  backgroundImage: 'url(/images/backgroundImage.jpeg)',            
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
              borderRadius: '40px',
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={(event)=>{
                event.preventDefault();
                roteamento.push(`/chat?username=${username}`);
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', 
              }}
            >
              <Title tag="h2">Chat Tudo Traquilo!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name} Tudo Favorável!
              </Text>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                *A imagem só funciona se colocar um login do GitHub para buscar a foto!
              </Text>
  
              <TextField
                fullWidth
                value={username}
                onChange={(event)=>{
                    setUserName(event.target.value)
                }
                }
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '40px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              {username.length>2 && <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />}
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
  
