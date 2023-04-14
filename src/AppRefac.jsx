import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
const AppRefac = () => {

    const [llamarGetData, setLlamarGetData] = useState(0);
    const [perritoRandom, setPerritoRandom] = useState({})
    const[listaPerritos, setListaPerritos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getData = async() => {
            setIsLoading(true)
            await axios.get('https://dog.ceo/api/breeds/image/random')
            .then(res => setPerritoRandom({
                id: `${Date.now()}`,
                name: nombreAleatorio(),
                img: res.data.message,
                aceptado: null
            }))
        setIsLoading(false)
    }

    useEffect(() => {
        getData();
    }, [llamarGetData])

    const handleAddPerrito = (e) => {
        console.log(e.target.name)
        const { name } = e.target;
        setListaPerritos([
            ...listaPerritos,
            {
                ...perritoRandom,
                aceptado: name === 'rechazar'? false : true
            }
        ])
        setLlamarGetData(llamarGetData + 1)
    }
    const handleMove = (id) => {
        const newArr = listaPerritos.map(item => {
            if(item.id === id) {
                return(
                    {...item, aceptado: !item.aceptado}
                )
            } else {
                return item
            }
        })
        setListaPerritos(newArr)
    }
    const nombreAleatorio = () => {
        let nombre = ''
          for(let i = 0; i < 6; i++) {
            let codigoCaracter = Math.floor(Math.random() * 26) + 97;
            nombre += String.fromCharCode(codigoCaracter)
          }
          return nombre
      }
    console.log(listaPerritos)
  return (
    <>
        <Container maxWidth='xl'>
            <Typography variant='h1' component='p'>Tinder Perritos</Typography>
            <Grid container spacing={2}>

            {/* perritos rechazados */}
                <Grid item xs={12} md={4}>

                <Typography variant='h4' component='p'>perritos rechazados</Typography>
            {
              listaPerritos.map(item =>
                {
                     if(item.aceptado === false)
                     return(
                         <Card
                         key={ item.id }
                         sx={{
                        transition:"0.2s",
                        "&:hover": {
                            transform: "scale(1.05)"
                        },
                        mt:2
                        }}>
                                    <CardMedia
                                        component='img'
                                        image={item.img}
                                        sx={{height:200}}
                                        alt={item.img}
                                    />
                        <CardContent>
                            <Typography variant='h5'>{ item.name }</Typography>
                            <CardActions>
                                <Button variant='outlined' color='success' onClick={()=>handleMove(item.id)} size='small'>mover</Button>
                            </CardActions>
                        </CardContent>
                        </Card>

                        )
                }

              )
            }
                </Grid>

            {/* perrito random */}
                <Grid item xs={12} md={4}>
                    <Typography variant='h4' component='p'>perrito candidato</Typography>
                    
                        <Card sx={{
                        transition:"0.2s",
                        "&:hover": {
                            transform: "scale(1.05)"
                        },
                        mt:2
                        }}>
                            
                                    <CardMedia
                                        component='img'
                                        image={perritoRandom.img}
                                        height='200'
                                        alt={perritoRandom.img}
                                    />
                                
                            
                        <CardContent>
                            <Typography variant='h5'>{ isLoading?('Cargando perrito'):(perritoRandom.name)}</Typography>
                            <CardActions>
                                <Button variant='outlined'color='error' name='rechazar' onClick={handleAddPerrito} disabled={isLoading} size='small'>rechazar</Button>
                                <Button variant='outlined' onClick={handleAddPerrito} disabled={isLoading} size='small'>aceptar</Button>
                            </CardActions>
                        </CardContent>
                        </Card>

                        
                    
                </Grid>

            {/* perritos aceptados */}
                <Grid item xs={12} md={4}>

        <Typography variant='h4' component='p'>perritos aceptados</Typography>
        {
              listaPerritos.map(item =>
                {
                     if(item.aceptado === true)
                     return(
                         <Card
                         key={ item.id }
                         sx={{
                        transition:"0.2s",
                        "&:hover": {
                            transform: "scale(1.05)"
                        },
                        mt:2
                        }}>
                        <CardMedia
                            component='img'
                            image={item.img}
                            height='200'
                            alt={item.img}
                        />
                        <CardContent>
                            <Typography variant='h5'>{ item.name }</Typography>
                            <CardActions>
                                <Button variant='outlined' color='success' onClick={()=>handleMove(item.id)} size='small'>mover</Button>
                            </CardActions>
                        </CardContent>
                        </Card>

                        )
                }

              )
            }
                </Grid>

            </Grid>
        </Container>
    </>

  )
}

export default AppRefac