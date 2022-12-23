// Core
import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Chip, Typography, Box, Paper, Button } from '@mui/material';

// Components
import { ShareModal } from '../';

// Types
import { HeadlineType } from '../../../init/types/defaultTypes';

// Icons
import ReplyIcon from '@mui/icons-material/Reply';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const NewsCard: React.FC<{cardData: HeadlineType, index: number}> = ({cardData, index}) => {
    const [shareModalIsOpen, toggleShareModalIsOpen] = useState<boolean>(false);
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
            id={index === 0 ? 'cardAnchor' : undefined}
        >
            <Card>
                <CardMedia
                    component='img'
                    height='200'
                    image={cardData.urlToImage}
                    alt={cardData.title}
                />
                <CardContent>
                    <Box>
                        {cardData.source.name ? 
                            <Chip 
                                label={cardData.source.name} 
                                color='primary' 
                                variant='outlined' 
                                sx={{ mr: '10px' }} 
                            /> 
                            : 
                            null
                        }
                        {cardData.author && !cardData.author.includes('https://') ? 
                            <Chip 
                                label={cardData.author} 
                                color='primary' 
                                sx={{m: '5px 0'}}
                            /> 
                            : 
                            null
                        }
                    </Box>
                    {cardData.title ?
                        <Typography variant='h6' sx={{pt: '10px'}}>
                            {cardData.title}
                        </Typography>
                        :
                        null
                    }
                    {cardData.description ?
                        <Typography 
                            variant='caption' 
                            sx={{ display: 'block', pt: '10px' }}
                        >
                            {cardData.description}
                        </Typography>
                        :
                        null    
                    }
                    <Box sx={{
                        pt: '10px', 
                        position: 'relative', 
                        right: '8px', 
                        "a:link, a:visited": {textDecoration: 'none'}}}
                    >
                        <a 
                            href={cardData.url ? cardData.url : '#'} 
                            target='_blank' 
                            rel="noreferrer"
                        >
                            <Button 
                                startIcon={<OpenInNewIcon />} 
                                variant='outlined'
                                sx={{m: '5px 5px 0 5px'}}
                            >
                                Learn more
                            </Button>
                        </a>
                        <Button 
                            disabled={!cardData.url} 
                            onClick={() => toggleShareModalIsOpen(true)}
                            startIcon={<ReplyIcon />}
                            variant='outlined'
                            sx={{m: '5px 5px 0 5px'}}
                        >
                            Share
                        </Button>
                        {cardData.publishedAt ? 
                            <Box sx={{
                                position: {xs: 'static', bsm: 'absolute'}, 
                                top: '18px', 
                                right: '5px', 
                                pl: '6px', 
                                mt: {xs: '5px', sm: '5px', bsm: '0'}}}
                            >
                                <Chip 
                                    variant='outlined' 
                                    color='primary' 
                                    label={
                                        <Typography variant='caption'>
                                            {new Date(cardData.publishedAt).toLocaleString()}
                                        </Typography>
                                    }
                                />
                            </Box> 
                            :
                            null
                        }
                    </Box>
                    <ShareModal 
                        shareModalIsOpen={shareModalIsOpen} 
                        toggleShareModalIsOpen={toggleShareModalIsOpen} 
                        url={cardData.url}
                    />
                </CardContent>
            </Card>
        </Paper>
    )
}
