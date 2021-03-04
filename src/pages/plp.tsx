import { useRouter } from 'next/router';
import React from 'react';

const PLP: React.FC = () => {
    const router = useRouter()

    return (
        <>
            <div className="title-main">
              <h1>PLP</h1>
            </div>
            <div className="card-display">
                <div className="card card-style">
                    <img src="https://www.artimondo.it/media/cvp/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/h/phpSlOF8Z.jpg" className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className="button-display">
                            <a onClick={()=> router.push('/detail')} className="pointer btn btn-primary">See Details</a>
                            <a onClick={()=> router.push('/cart')} className=" pointer btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
                </div>
                <div className="card card-style">
                    <img src="https://www.artimondo.it/media/cvp/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/h/phpSlOF8Z.jpg" className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className="button-display">
                            <a onClick={()=> router.push('/detail')} className="pointer btn btn-primary">See Details</a>
                            <a onClick={()=> router.push('/cart')} className="pointer btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
                </div>
                <div className="card card-style">
                    <img src="https://www.artimondo.it/media/cvp/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/h/phpSlOF8Z.jpg" className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className="button-display">
                            <a onClick={()=> router.push('/detail')} className="pointer btn btn-primary">See Details</a>
                            <a onClick={()=> router.push('/cart')} className="pointer btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PLP;