import {Container, Card, Button} from 'react-bootstrap'
import Link from 'next/link'


const GameCard = ({name, description, image_url, slug, is_playable, is_played}) => {

    return (
        <Container>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={image_url} style={{height: '10rem'}}/>
                <Card.Body>
                    {is_played ? <Card.Header>PLAYED</Card.Header>: ''}
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    {is_playable === true ? <Link href={"/games/" + slug}><Button variant="info">PLAY</Button></Link>
                        :
                        <Button style={{backgroundColor: 'slategrey', border: 'none'}}>Coming Soon</Button>}
                </Card.Body>
            </Card>
        </Container>
    );
}


export default GameCard;