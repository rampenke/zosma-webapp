import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import TextPromptInput from "../components/TextPromptInput";
import {callLlama2Service} from "../api/api_llama2";

import {SignToken} from "../api/awt";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";

import {
    Card, CardContent,  Typography
} from "@material-ui/core";

const backendUrl = process.env.REACT_APP_LLAMA_API;

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
        maxWidth: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '1rem',
    },
});


const botContexts = {
	python: {
		"display" : "Python Programmer",
		"context": "You are a python progammer."
	},	
	cpp: {
		"display" : "C++ Programmer",
		"context": "You are a C++ progammer."
	},	
	general: {
		"display" : "General",
		"context": "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct."
	},	
}

const TextGenerator = ({classes}) => {
    const [generatedStory, setGeneratedStory] = useState("");	
    const [apiError, setApiError] = useState('');
    const [queryTime, setQueryTime] = useState(0);
    const [isFetchingStory, setIsFetchingStory] = useState(false);
	const [botMode, setBotMode] = useState("general");

	const processingSteps = ['Working on it👨🏽‍🎨', 'Almost there ✨'];

	let {key, chain, contract, token } = useParams();
	console.log("params: ", chain, contract, token);

	let authMsg = "";
	if (key != null && chain != null && contract != null && token != null) {  
		authMsg = SignToken(key, chain, contract, token, "2145945600");
	}

	const handleChangeBotMode = (event) => {
		console.log(event.target.value)
		setBotMode(event.target.value);
	};

	function getGalleryContent() {
		if (apiError) {
			return <Typography variant="h5" color="error">{apiError}</Typography>
		}

		if (isFetchingStory) {
			return <LoadingSpinner isLoading={isFetchingStory} processingSteps={processingSteps} prompt="Prompt Text"/>
		}

		//return <GeneratedImageList generatedImages={generatedImages}/>
		let response = JSON.parse(generatedStory);
		return <div style={{ textAlign: "justify", whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{ __html: response[0].replace(/\n/g, "<br />") }}></div>
	}


	function enterPressedCallback(promptText) {
		console.log('API call to  web service with the following prompt [' + promptText + ']');
		setApiError('')
		setIsFetchingStory(true)
		let botContext = botContexts[botMode].context
		callLlama2Service(backendUrl, botContext, promptText, 4, authMsg).then((response) => {
			setQueryTime(response['executionTime'])
			setGeneratedStory(response['generatedStory'])
			setIsFetchingStory(false)
		}).catch((error) => {
			console.log('Error querying service.', error)
			if (error.message === 'Timeout') {
				setApiError('Timeout querying service (>1min).')
			} else {
				setApiError('Error connecting to  server. Check your backend server logs.')
			}
			setIsFetchingStory(false)
		})
	}

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography variant="h5">
					Assistant Mode <span role="img" aria-label="sparks-emoji">✨</span>
				</Typography>
			</div>
			<Select labelId="botMode" id="botMode" value={botMode} onChange={handleChangeBotMode}>
          		{Object.entries(botContexts).map(([key, obj], index) => (
					<MenuItem key={index} value={key}>
						{obj.display}
					</MenuItem>
          		))}
        	</Select>

			<div className={classes.playgroundSection}>
				<div className={classes.settingsSection}>
					<Card className={classes.searchQueryCard}>
						<CardContent>
							<TextPromptInput enterPressedCallback={enterPressedCallback} 
							placeholder="e.g. Once upon a time there is a king" 
							prompt="Enter Prompt" numLines="2" />
						</CardContent>
					</Card>
					{queryTime !== 0 && <Typography variant="body2" color="textSecondary">
						Query execution time: {queryTime} sec
					</Typography>}
				</div>
				{(generatedStory.length > 0 || apiError || isFetchingStory) &&
				<div className={classes.gallery}>
					{getGalleryContent()}
				</div>
				}
			</div>
		</div>
	);
};

export default withStyles(useStyles)(TextGenerator);
