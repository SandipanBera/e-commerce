import React from "react";
import { Carousel } from "flowbite-react";
import Container from "../container/container";
import { Link } from "react-router-dom";

function FlowCarousel() {
  const carouselItems = [{
    slug: '/categories/654c623edf01bd0c4f3fc0c4',
    image:'https://images.unsplash.com/photo-1602810319428-019690571b5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    slug: '/categories/654c623edf01bd0c4f3fc0bb',
    image:'https://images.unsplash.com/photo-1619768470847-f7db55f5d72e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    slug: '/categories/654c623edf01bd0c4f3fc0b1',
    image:'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      slug: '/categories/654c623edf01bd0c4f3fc0b0',
      image:'https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      slug: '/categories/654c623edf01bd0c4f3fc0bc',
      image:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ]

  return (
    <div className=" w-full mt-3 px-4">
     
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 shadow-lg ">
          <Carousel pauseOnHover>
            {carouselItems.map((item=>(<Link to={item.slug} key={item.slug}><img className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                src={item.image}
                alt="..."
              />
            </Link>)))}
            {/* <Link to={'/categories/654c623edf01bd0c4f3fc0c4'}>
              <img className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                src="https://images.unsplash.com/photo-1602810319428-019690571b5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
              />
            </Link>
        
            <Link>
              <img className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                src="https://images.unsplash.com/photo-1619768470847-f7db55f5d72e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
              />
            </Link>
            <Link>
              <img
                className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
              />
            </Link> 
             <Link> 
              <img
                className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                src="https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
              />
            </Link>
            <Link>
              <img
                className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
              />
            </Link> */}
          </Carousel>
        </div>
     
    </div>
  );
}

export default FlowCarousel;
