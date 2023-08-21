import React from 'react';
import {Grid} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = () => ({
    generatedImg: {
        borderRadius: '8px',
    },
});

const GeneratedImageList = ({classes, generatedImages, generatedImagesFormat}) => {
    const ImageObject = ({imgData, alt}) => <img src={`data:image/${generatedImagesFormat};base64,${imgData}`}
                                                 className={classes.generatedImg} alt={alt}/>
    return (
        <Grid container alignItems="center" spacing={1} alignItems="center" justifyContent="center">
            {generatedImages.map((generatedImg, index) => {
                return (
                    <Grid item key={index}>
                        <ImageObject imgData={generatedImg} alt={index}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default withStyles(useStyles)(GeneratedImageList)