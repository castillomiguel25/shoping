import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from '../styles/login.module.css';
function UncontrolledExample() {
    
  return (
    <Carousel>
      <Carousel.Item>
        <img
          
          height="400px"
          className="d-block w-100"
          src="https://img.bestdealplus.com/ae04/kf/H1b20ebf3e6aa42eca1bcce85af92a52fy.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img height="400px"
          className="d-block w-100"
          src="https://ae01.alicdn.com/kf/H34e678942a7b4be69fc9bae8ffc53afeB/Conjunto-de-sudadera-con-capucha-y-pantalones-deportivos-para-hombre-ropa-deportiva-masculina-de-poli-ster.jpg_Q90.jpg_.webp"
          alt="Second slide"
        />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img height="400px"
          className="d-block w-100"
          src="https://ae01.alicdn.com/kf/He7510f631e94466f9736c8dd8430dd64i/Sudadera-con-capucha-para-hombres-con-capucha-para-estudiantes-de-oto-o-un-conjunto-de-ropa.jpg_Q90.jpg_.webp"
          alt="Third slide"
        />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;