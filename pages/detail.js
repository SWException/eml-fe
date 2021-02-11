import Layout from '../components/Layout';
import { useRouter } from 'next/router'

const Detail = () => {
    const router = useRouter();

    return (
        <Layout>
            <div className="title-main">
                <h1>Shoes</h1>
            </div>
            <div className="row-flex">
                <img className="image-desc" src="https://www.artimondo.it/media/cvp/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/h/phpSlOF8Z.jpg"></img>
                <div className="description">
                    <p>Lorem Ipsum è un testo segnaposto utilizzato nel
                    settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal 
                    sedicesimo secolo, quando un anonimo tipografo prese
                    una cassetta di caratteri e li assemblò per preparare 
                    un testo campione. È sopravvissuto non solo a più di cinque
                    secoli, ma anche al passaggio alla videoimpaginazione, 
                    pervenendoci sostanzialmente inalterato. Fu reso popolare, 
                    negli anni ’60, con la diffusione dei fogli di caratteri 
                    trasferibili “Letraset”, che contenevano passaggi del 
                    Lorem Ipsum, e più recentemente da software di 
                    impaginazione come </p>
                    <a onClick={()=> router.push('/cart')} className="pointer btn btn-primary">Add to Cart</a>
                </div>
            </div>
        </Layout>
    )
}

export default Detail;