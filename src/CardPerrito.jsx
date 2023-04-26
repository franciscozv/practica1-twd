import VisibilityIcon from '@mui/icons-material/Visibility';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
const CardPerrito = ({ perrito, handleShowDescription, handleMove }) => {
    let {id, name, img, description, showDescription} = perrito;
    return (
    <>
        <Card
            key={
            id
            }
            sx={{
            mt:2
            }}>
            <CardMedia
                component='img'
                image={
                    img
                }
                height='200'
                alt={
                    img
                } />
                <CardContent>
                    <Typography variant='h5'>{ name }</Typography>
                        {
                            showDescription && (
                            <Typography
                            variant="body2"
                            color="text.secondary">
                            {
                            description
                            }
                            </Typography>
                            )
                        }
                    <CardActions>
                        <Tooltip title='arrepentirse'>
                            <IconButton onClick={()=>handleMove(id)}>
                                <RotateLeftIcon color='primary'/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='ver descripcion'>
                            <IconButton onClick={()=>handleShowDescription(id)}>
                                <VisibilityIcon color='primary'/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </CardContent>
        </Card>
    </>
    )
}

export default CardPerrito