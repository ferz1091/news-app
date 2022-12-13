// Core
import React from 'react';
import { Card, CardMedia, CardContent, Chip, Typography, Box, Paper, Button, ButtonGroup } from '@mui/material';

// Types
import { HeadlineType } from '../../../init/types/defaultTypes';

export const NewsCard: React.FC<HeadlineType> = (cardData) => {
    return (
        <Paper 
            variant='outlined' 
            sx={{
                m: '10px auto',
                p: '5px',
                maxWidth: {
                    xl: '60%',
                    lg: '70%',
                    md: '80%',
                    sm: '90%'
                }
            }}
        >
            <Card>
                <CardMedia
                    component='img'
                    height='200'
                    image={cardData.urlToImage}
                    alt={cardData.title}
                />
                <CardContent >
                    <Box>
                        {cardData.source.name ? <Chip label={cardData.source.name} color='primary' variant='outlined' sx={{ mr: '10px' }} /> : null}
                        {cardData.author ? <Chip label={cardData.author} color='primary' sx={{m: '5px 0'}} /> : null}
                    </Box>
                    {cardData.title ?
                        <Typography variant='h6' sx={{pt: '10px'}}>
                            {cardData.title}
                        </Typography>
                        :
                        null
                    }
                    {cardData.description ?
                        <Typography variant='caption' sx={{ display: 'block', pt: '10px' }}>
                            {cardData.description}
                        </Typography>
                        :
                        null    
                    }
                    <Box sx={{pt: '10px', position: 'relative', right: '8px'}}>
                        <Button>Learn more</Button>
                        <Button>Share</Button>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    )
}
