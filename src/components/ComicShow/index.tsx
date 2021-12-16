import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography  } from '@mui/material';
import styles from './style.module.css';
import Modal from '../ModalComic';

const Cardstyle = {
	boxShadow: 'none',
	background: 'transparent',
	height: { xs: '248px', md: '364px' },
	width: { xs: '138px', md: '200px' },
};

const ReadmeStyle = {
	fontSize: { xs: '12px', md: '14px' },
	mt: 1,
	color: '#3f3f3f'
}
export default function Comic(props) {
	const [count, setCount] = useState(1);

  return (
		<>
			<Card
				sx={Cardstyle}
				className={styles.CardComic}
				onClick={() => setCount(count + 1)}
			>
				<CardMedia
					component="img"
					image={props.img}
					alt="green iguana"
					className={styles.midia}
				/>
				<CardContent sx={{ marginLeft: -2 }}>
						<Typography
							variant="h6"
							component="div"
							noWrap
							sx={{fontSize: { xs: '15px', md: '20px' }}}
							className={styles.titlecomic}
						>
							{props.title}
						</Typography>
						<Typography
							variant="body2"
							noWrap
							color="text.secondary"
							sx={{ fontSize: '13px', fontWeight: '600' }}
						>
						{props.creators.map( res => `${res.name}, `)}
						</Typography>
					</CardContent>
			</Card>
			<Modal
				open={count}
				ComicID={props.id}
				img={props.img}
				title={props.title}
				description={props.description}
				creators={props.creators}
			/>
		</>
  );
}
