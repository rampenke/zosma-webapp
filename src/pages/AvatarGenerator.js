import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Card, CardContent,  Typography
} from "@material-ui/core";

import GeneratedImageList from "../components/GeneratedImageList";
import TextPromptInput from "../components/TextPromptInput";
//import {callDalleService} from "../api/api_dalle";
import {callSDService} from "../api/api_sd";
import LoadingSpinner from "../components/LoadingSpinner";
import {SignToken} from "../api/awt";

const backendUrl = process.env.REACT_APP_SD_API;

const useStyles = () => ({
    root: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        margin: '60px 0px 60px 0px',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
    },
    playgroundSection: {
        display: 'flex',
        flex: 1,
        width: '100%',
		flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
    },
    settingsSection: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1em',
        maxWidth: '300px',
    },
    searchQueryCard: {
        marginBottom: '20px'
    },
    imagesPerQueryControl: {
        marginTop: '20px',
    },
    formControl: {
        margin: "20px",
        minWidth: 120,
    },
    gallery: {
        display: 'flex',
        flex: '1',
        maxWidth: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '1rem',
    },
});

const AvatarGenerator = ({classes}) => {
    const [generatedImages, setGeneratedImages] = useState([]);	
    const [generatedImagesFormat, setGeneratedImagesFormat] = useState('png');	
    const [apiError, setApiError] = useState('');
    const [queryTime, setQueryTime] = useState(0);
    const [isFetchingImgs, setIsFetchingImgs] = useState(false);


	let {key, chain, contract, token } = useParams();
	console.log("params: ", chain, contract, token);

	let authMsg = "";
	if (key != null && chain != null && contract != null && token != null) {  
		authMsg = SignToken(key, chain, contract, token, "2145945600");
	}

	function enterPressedCallback(promptText) {
		console.log('API call to DALL-E web service with the following prompt [' + promptText + ']');
		setApiError('')
		setIsFetchingImgs(true)
		callSDService(backendUrl, promptText, 4, authMsg).then((response) => {
			setQueryTime(response['executionTime'])
			setGeneratedImages(response['serverResponse']['images'])
			//setGeneratedImagesFormat(response['serverResponse']['generatedImgsFormat'])
			setIsFetchingImgs(false)
		}).catch((error) => {
			console.log('Error querying DALL-E service.', error)
			if (error.message === 'Timeout') {
				setApiError('Timeout querying DALL-E service (>1min). Consider reducing the images per query or use a stronger backend.')
			} else {
				setApiError('Error querying DALL-E service. Check your backend server logs.')
			}
			setIsFetchingImgs(false)
		})
	}

	function getGalleryContent() {
		const processingSteps = ['Generating images 👨🏽‍🎨', 'Fancy calculations ✨'];
		if (apiError) {
			return <Typography variant="h5" color="error">{apiError}</Typography>
		}

		if (isFetchingImgs) {
			return <LoadingSpinner isLoading={isFetchingImgs} processingSteps={processingSteps} 
			placeholder="e.g. an apple on a table" 
			prompt="Text for image generation" numLines="1" />
		}

		return <GeneratedImageList generatedImages={generatedImages} generatedImagesFormat={generatedImagesFormat} />
	}


	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography variant="h5">
					Image Generator <span role="img" aria-label="sparks-emoji">✨</span>
				</Typography>
			</div>


			<div className={classes.playgroundSection}>
				<div className={classes.settingsSection}>
					<Card className={classes.searchQueryCard}>
						<CardContent>
							<TextPromptInput enterPressedCallback={enterPressedCallback} 
							placeholder="e.g. An apple on the table" 
								prompt="Text to Image"
								numLines = "2" />
						</CardContent>
					</Card>
					{queryTime !== 0 && <Typography variant="body2" color="textSecondary">
						Query execution time: {queryTime} sec
					</Typography>}
				</div>
				{(generatedImages.length > 0 || apiError || isFetchingImgs) &&
				<div className={classes.gallery}>
					{getGalleryContent()}
				</div>
				}
			</div>
		</div>
	);
};

//export default AvatarGenerator;
export default withStyles(useStyles)(AvatarGenerator)
