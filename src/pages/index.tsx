import Head from 'next/head'
import Image from 'next/image'
import styles from '/src/styles/index.module.css'
import { AppBar, Box, Toolbar, Grid } from '@mui/material';
import { Typography, Container } from '@mui/material'
import Comic from '../components/ComicShow';
import {getListMarvel} from '../api/MarvelAPI'
import { useState, useEffect } from 'react';


export default function MainScreen() {

	const [comicList, setComicList] = useState([]);


	async function getListComics() {
		const res = await  getListMarvel()
		  .then( res => res.data.data)
		  .catch(err => console.log(`\n\nErro ao conectar à API Marvel: ${err}`))
	  
		  const comics = await res.results
		  console.log({msg: 'testando', data:comics});
		  setComicList(comics);
	  }


	useEffect(() => getListComics() ,[]);


	

  return (
    <div>
      <Head>
        <title>Marvel Comics</title>
        <meta name="descrição" content="Site de quadrinhos da marvel para desafio brisanet" />
        <link rel="icon" href="/marvel.ico" />
      </Head>

			<Box sx={{ flexGrow: 1 }}>
				<AppBar sx={{ position: 'relative', backgroundColor: '#202020' }}>
					<Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Image
							src="/marvel-logo.png"
							alt="Marvel Comics"
							width={130}
							height={50}
						/>
					</Toolbar>
				</AppBar>
			</Box>

			<main className={styles.main}>
			<Container  maxWidth="lg">
				<Grid item xs={12}>
					<Typography
						variant="h4"
						noWrap
						align='center'
						component="div"
						sx={{mb: 2, fontSize: { xs: '1.7rem', md: '2rem' }}}
					>
						QUADRINHOS EM DESTAQUE
						<hr  className={styles.line} />
					</Typography>
					<Grid container justifyContent="center" spacing={4}>
						{comicList.map((value) => (

							<Grid className={styles.gridComic} key={value.id} item md={3}>
								<Comic
									title={value.title}
									creators={value.creators.items}
									description={value.description}
									img={`${value.thumbnail.path}.${value.thumbnail.extension}`}
									id={value.id}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>

			
			</Container>
			</main>

			<footer className={styles.footer}>
			<h3>Criado usando Nextjs por 
				<a
					href="https://github.com/doubty"
					target="_blank"
					rel="noopener noreferrer"
				>Antônio Galvão (Doubty)
				</a></h3>
			</footer>
		</div>
  )
}
