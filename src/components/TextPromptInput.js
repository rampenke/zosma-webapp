import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import { Autorenew } from "@material-ui/icons";


const useStyles = () => ({
    inputPrompt: {
        marginTop: '20px',
    },
})

const TextPromptInput = ({classes, enterPressedCallback, disabled, prompt, placeholder, numLines}) => {
    const [promptText, setPromptText] = useState('');

    function handleTextPromptKeyPressed(event) {
        if (event.key === 'Enter') {
            enterPressedCallback(promptText)
        }
    }
    function handleTextPromptButtonPressed(event) {
        if (promptText.length > 0) {
            enterPressedCallback(promptText)
        }
    }
    function onTextChanged(event) {
        setPromptText(event.target.value)
    }

    return (
        <TextField className={classes.inputPrompt} id="prompt-input" label={prompt}
                   placeholder={placeholder} 
                   value={promptText}
                   onChange={onTextChanged} 
                   onKeyDown={handleTextPromptKeyPressed}
                   fullWidth
                   InputProps={{
                       endAdornment: <IconButton edge="end" color="primary"> 
                            <Send onClick={handleTextPromptButtonPressed}/>
                       </IconButton>
                   }}
                  disabled={disabled} 
        />
    )
}

export default withStyles(useStyles)(TextPromptInput);