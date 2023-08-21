import React from 'react';
import styled from 'styled-components';


const Feature = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  padding: 4px;
  text-align: justify;
`;

const Header = styled.div`
  display: inline-block;
  font-size: 1.0rem;
  padding: 10px;
  text-align: center;
`;

const Copyright = styled.div`
  display: inline-block;
  font-size: 0.6rem;
  padding: 10px;
  text-align: justify;
`;

const Footer = styled.div`
  display: inline-block;
  font-size: 1.0rem;
  padding: 10px;
  text-align: center;
`;

const About = () => {

	return (
		<div
		style={{
			flexDirection: "column",
			display: 'flex',
			justifyContent: 'Left',
			alignItems: 'Left',
			height: '100vh'
		}}	
		>

		<Header>Zosma, GenAI Assistant</Header>
		<Feature>The application provides set of Generative AI services running on the GPU clusters hosted on a Distributed Network.</Feature>
		<Feature>The current version of the applicaiton provides UI for two of these services:</Feature>
		<ul>
		<li><Feature>LLaMA-2 Prompt completion service. This service can be used for applications such as general chat, coding.</Feature></li>
		<li><Feature>Stable Diffusion V2.1 Text to Image Generation. A creative user can use this service for generative artwork.</Feature></li>
		</ul>

		<Copyright>THIS SOFTWARE IS PROVIDED BY MCN TECHNOLOGIES INC. “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
			IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
			LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
			EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</Copyright>

		<Footer>MCN Tecgnologies Inc.</Footer>

		</div>
	);
};


export default About;
