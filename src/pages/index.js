import React from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";

const demoSubscription = "0xafa085fa71089232ae2c117d1b3d0e999c397031b9c8b9ed5161a9a61592ae8c/137/0x00000005Ff125830A53F5e6F53A37854C250f315/1"


const Home = () => {
	let width = window.screen.availWidth;
	let cardWith;
	if (width < 720) {
		cardWith='50%';
	} else {
		cardWith='50%';
	}
	return (
		<div>
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
		<div style={{fontSize: '1em', padding: '1em'}}>Sample Services Running on Arcturus</div>

		<Card style={{width:cardWith, padding: '1em'}}>
			<Link to={`/avatar/${demoSubscription}`}>
			<CardMedia
				component="img"
				image="/avatar-sample.svg"
				alt="Text To Image"
			/>
			</ Link>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
				Stable Diffusion
				</Typography>
				<Typography variant="body2" color="text.secondary">
				Stable Diffusion V2.1, GenAI system that can create realistic images and art from a description in natural language.
				</Typography>
			</CardContent>
			{/*
			<CardActions>
				<Link to={`/avatar/${demoSubscription}`}><Button size="small">Try Demo</Button></Link>
				<a  href="https://zosma-ai.myshopify.com"> <Button size="small">Subscribe</Button></a>
				<a  href="https://stablediffusionweb.com/"> <Button size="small">Learn More</Button></a>				
			</CardActions>
			*/}
		</Card>
		<Card style={{width:cardWith, padding: '1em', margin: '1em'}}>
			<Link to={`/story/${demoSubscription}`}>
			<CardMedia
				component="img"
				image="/story-sample.svg"
				alt="Text To Image"
			/>
			</Link>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
				LLaMA-2
				</Typography>
				<Typography variant="body2" color="text.secondary">
				LLaMA-2 is a transformers model pretrained on a very large corpus of English data in a self-supervised fashion.
				</Typography>
			</CardContent>
			{/*
			<CardActions>
				<Link to={`/story/${demoSubscription}`}><Button size="small">Try Demo</Button></Link>
				<a  href="https://zosma-ai.myshopify.com"> <Button size="small">Subscribe</Button></a>
				<a  href="https://ai.meta.com/llama/"> <Button size="small">Learn More</Button></a>				
			</CardActions>
			*/}
		</Card>

		</div>	
		</div>
	);
};
export default Home;
