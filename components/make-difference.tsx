"use client"

import React from 'react';  

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface CareerCardProps {
    image: string
    title: string
    alt: string
  }
  
const careerCards: CareerCardProps[] = [
    {
        image: "/images/network-operator.jpg",
        title: "Network Operations",
        alt: "Person with hard hat in rainy city street",
    },
    {
        image: "/images/customer-service.jpg",
        title: "Customer Service",
        alt: "Person at computer desk",
    },
    {
        image: "/images/mechanical-engineer.jpg",
        title: "Engineering",
        alt: "Person working on technical equipment",
    },
    {
      image: "/images/software-developer.jpg",
      title: "Software Development",
      alt: "Person working on computer",
    },
    {
        image: "/images/sales.jpg",
        title: "Sales",
        alt: "Person in sales meeting",
    },
    {
      image: "/images/construction-engineer.jpg",
      title: "Construction",
      alt: "Construction worker in hard hat",
  },
]

export default function WhatDrivesUs() {
  
    return (
      <section className="py-14 px-4 bg-white">
        <div className="max-w-full mx-auto">
          <h2 className="font-bold text-5xl mt-10 mb-32 md:text-6xl lg:text-7xl container sm:w-[550px] lg:w-[700px] mx-auto p-5">Ways you can 
            <span className="block text-center w-full text-amber-400">make a difference</span> 
            <span className="block w-full text-right pr-32">at Qcell</span></h2>
          
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            
          >
            {/*onSelect={(index) => setActiveIndex(index)}*/}
            <CarouselContent>
              {careerCards.map((card, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/2 lg:basis-1/2 pl-4">
                  <div
                    className={` transition-all duration-300`}
                  >
                    <div className="relative h-[200px] w-full rounded-2xl sm:w-[300px] sm:h-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] lg:rounded-[30px] overflow-hidden">
                      <img src={card.image} alt={card.alt} className="w-full h-full object-cover"/>
                      <div className="absolute flex justify-center items-center h-14 w-full bottom-0 bg-black opacity-50 backdrop-blur-sm z-10 md:h-14 xl:h-20 ">

                      </div>
                      <div className="absolute flex justify-start items-center px-4 sm:px-10 gap-5 h-14 w-full bottom-0 z-20 text-base md:h-14 md:text-xl xl:h-20 xl:text-3xl">
                        <h4 className="text-white ">{card.title}</h4> <span className="text-white text-xl">&gt;</span>
                      </div>
                      
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static ml-2" />
            </div>
          </Carousel>
  
          {/*<div className="flex justify-center mt-8 md:hidden">
            <div className="flex space-x-2">
              {careerCards.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-gray-800 w-4" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>*/}
        </div>
      </section>
    )
  }