// Core
import React, {useState} from 'react';
import { Modal, Box, TextField, Button, InputAdornment } from '@mui/material'
import {
    TwitterIcon,
    TwitterShareButton, 
    FacebookIcon, 
    FacebookShareButton, 
    TelegramIcon, 
    TelegramShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TumblrIcon,
    TumblrShareButton,
    EmailIcon,
    EmailShareButton,
    ViberIcon,
    ViberShareButton } from 'react-share';

// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Types
import { Props } from 'react-share/lib/ShareButton';
type ComponentType = React.ForwardRefExoticComponent<Omit<Props<{
    title?: string | undefined;
    via?: string | undefined;
    hashtags?: string[] | undefined;
    related?: string[] | undefined;
}>, "forwardedRef" | "networkName" | "networkLink" | "opts"> & {
    title?: string | undefined;
    via?: string | undefined;
    hashtags?: string[] | undefined;
    related?: string[] | undefined;
} & React.RefAttributes<HTMLButtonElement>>;
type IconType = React.FC<Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> & {
    bgStyle?: import("react").CSSProperties | undefined;
    borderRadius?: number | undefined;
    iconFillColor?: string | undefined;
    round?: boolean | undefined;
    size?: string | number | undefined;
}>;

const ShareButton: React.FC<{ Component: ComponentType, Icon: IconType, url: string}> = ({Component, Icon, url}) => {
    return (
        <Component url={url}>
            <Icon size={50} round />
        </Component>
    )
}

export const ShareModal: React.FC<{ shareModalIsOpen: boolean, toggleShareModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>, url: string }> = ({ shareModalIsOpen, toggleShareModalIsOpen, url }) => {
    const [isWasCopied, toggleisWasCopied] = useState<boolean>(false);
    return (
        <Modal open={shareModalIsOpen} onClose={() => toggleShareModalIsOpen(false)}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                bgcolor: 'white',
                border: '1px solid #1976d2',
                borderRadius: '10px',
                boxShadow: 24,
                p: 2,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    "svg": {xs: {width: '25px', height: '25px'}, sm: {width: '50px', height: '50px'}}
                }}>
                    <ShareButton Component={TwitterShareButton} Icon={TwitterIcon} url={url}/>
                    <ShareButton Component={FacebookShareButton} Icon={FacebookIcon} url={url}/>
                    <ShareButton Component={TelegramShareButton} Icon={TelegramIcon} url={url}/>
                    <ShareButton Component={LinkedinShareButton} Icon={LinkedinIcon} url={url}/>
                    <ShareButton Component={RedditShareButton} Icon={RedditIcon} url={url}/>
                    <ShareButton Component={TumblrShareButton} Icon={TumblrIcon} url={url}/>
                    <ShareButton Component={EmailShareButton} Icon={EmailIcon} url={url}/>
                    <ShareButton Component={ViberShareButton} Icon={ViberIcon} url={url}/>
                </Box>
                <TextField
                    defaultValue={url}
                    InputProps={{
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position='start'>
                                <ContentCopyIcon color={isWasCopied ? 'success' : 'primary'} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <Button 
                                onClick={() => {
                                    navigator.clipboard.writeText(url).then(() => {
                                        toggleisWasCopied(true);
                                        setTimeout(() => {
                                            toggleisWasCopied(false);
                                        }, 1000)
                                    })
                                }} 
                                variant='contained' 
                                color={isWasCopied ? 'success' : 'primary'}
                                sx={{ borderRadius: '50px', ml: '10px', mr: {sm: '5px', xs: '0px'}}}
                            >
                                Copy
                            </Button>
                        )
                    }}
                    sx={{
                        ".MuiInputBase-root": { 
                            p: '3px', 
                            ":hover": { 
                                "fieldset": { 
                                    borderColor: isWasCopied ? '#2e7d32' :'#1976d2', 
                                    borderWidth: '2px'
                                }
                            }
                        }, 
                        width: '95%', 
                        mt: '10px', 
                        alignSelf: 'center', 
                        "fieldset": { 
                            borderColor: isWasCopied ? '#2e7d32' : '#1976d2', 
                            borderWidth: '2px' 
                        },
                        "fieldset:hover": {borderColor: 'white'}
                    }}
                    size='small'
                />
            </Box>
        </Modal>
    )
}
