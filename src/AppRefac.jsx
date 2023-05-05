import { useState } from 'react'
import axios from 'axios'
import { CircularProgress, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Tooltip, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import CardPerrito from './CardPerrito';
import { useQuery } from '@tanstack/react-query'
import { LoremIpsum } from "lorem-ipsum";
const AppRefac = () => {
    const getPerrito = async () => {
        await axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res =>
            setPerritoRandom({
                id: `${Date.now()}`,
                name: nombreAleatorio(),
                img: res.data.message,
                description: lorem.generateSentences(1),
                aceptado: null,
                showDescription: false
            })
        )
    }
    const query = useQuery(
        ['randomPerrito'],
        getPerrito, {
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            keepPreviousData: false,
            enabled: true,
          }
    )
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 16,
          min: 4
        }
      });
    const [perritoRandom, setPerritoRandom] = useState({})
    const[listaPerritos, setListaPerritos] = useState([])

    const handleAddPerrito = (e) => {
        const { name } = e.currentTarget;
        setListaPerritos([
            {
                ...perritoRandom,
                aceptado: name === 'rechazar'? false : true
            },
            ...listaPerritos
        ])
        query.refetch()
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
    const handleShowDescription = (id) => {
        const newArr = listaPerritos.map(item => {
            if(item.id === id) {
                return {...item, showDescription: !item.showDescription}
            } else {
                return item
            }
        })
        setListaPerritos(newArr)
    }


    return (
    <>
        <Container maxWidth='xl' sx={{
            height:'100vh'
        }}>
            <Typography variant='h1' component='p'>Tinder Perritos</Typography>
            <Grid container spacing={2}>

                {/* perrito random */}
                <Grid item xs={12} lg={4}>
                    <Typography variant='h4' component='p'>perrito candidato</Typography>
                        <Card sx={{
                            mt:2
                            }}>
                            <CardMedia
                                component='img'
                                image={ perritoRandom.img }
                                height='200'
                                alt={ perritoRandom.img }
                            />
                                <CardContent>
                                    <Typography variant='h5'>{ query.isLoading? (<CircularProgress></CircularProgress>):(perritoRandom.name)}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        { !query.isLoading  && perritoRandom.description}
                                    </Typography>
                                        <CardActions>
                                            <Tooltip title='aceptar'>
                                                <span>
                                                <IconButton
                                                  name='aceptar'
                                                  onClick={(e)=>handleAddPerrito(e)}
                                                  disabled={query.isLoading}>
                                                    <FavoriteIcon color='primary'/>
                                                </IconButton>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title='rechazar'>
                                                <span>
                                                    <IconButton name='rechazar'
                                                    onClick={(e)=>handleAddPerrito(e)}
                                                    disabled={query.isLoading}>
                                                        <BlockIcon color='primary'/>
                                                    </IconButton>

                                                </span>
                                                </Tooltip>
                                        </CardActions>
                                        </CardContent>
                        </Card>
                </Grid>

                {/* perritos aceptados */}
                <Grid item xs={6} lg={4} sx={{
                    overflowY: "scroll",
                    height: '80vh'
                }}>
                    <Typography variant='h4' component='p'>perritos aceptados</Typography>
                        {
                            listaPerritos.map(item => (

                                item.aceptado && (
                                    <CardPerrito key={ item.id } perrito= { item } handleShowDescription= { handleShowDescription } handleMove= { handleMove }/>
                                )
                            )
                            )
                        }
                </Grid>

                {/* perritos rechazados */}
                <Grid item xs={6} lg={4} sx={{
                    overflowY: "scroll",
                    height: '80vh'
                }}>
                    <Typography variant='h4' component='p'>perritos rechazados</Typography>
                    {
                            listaPerritos.map(item => (

                                !item.aceptado && (
                                    <CardPerrito key={ item.id } perrito= { item } handleShowDescription= { handleShowDescription } handleMove= { handleMove }/>
                                )
                            )
                            )
                        }
                </Grid>
            </Grid>
        </Container>
    </>
    )
}

export default AppRefac