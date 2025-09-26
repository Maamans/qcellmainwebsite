'use client'
import React from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './styles.css'


interface TimelineItemInterface {
    date: string;
    text: string[];
    image: string;
    link: {
        url: string;
        text: string;
        imageUrl?: string;
    };
    detailText?: string[];
    quote?: {
        text: string;
        author: string;
        authorImage: string;
    };
    definition?: {
        term: string;
        pronunciation: string;
        meaning: string;
        partOfSpeech: string;
    };
    milestone?: string;
}

interface TimelineItemsInterface {
    items: TimelineItemInterface[];
}

const timelineItems: TimelineItemsInterface = { items: [
    {
        date: '2019',
        text: ["Qcell launches operations in Sierra Leone, bringing innovative telecommunications services to connect communities across the nation."],
        image: '/images/timeline/2019-launch.jpg',
        link: {
            url: "",
            text: "",
        },
        detailText: ["Established our first network infrastructure and began serving customers in Freetown and surrounding areas."],
        quote: {
            text: "We saw an opportunity to transform telecommunications in Sierra Leone and bring world-class connectivity to our people.",
            author: "Dr. Mohamed Kallon, CEO",
            authorImage: "/images/management/ceo.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "🚀 Qcell Founded",
    },
    {
        date: '2020',
        text: ["Expanded network coverage across major cities and launched our first mobile money service, Qcell Mobile Money."],
        image: '/images/timeline/2020-expansion.jpg',
        link: {
            url: "",
            text: "",
        },
        detailText: ["Despite global challenges, we continued to invest in infrastructure and launched digital financial services to empower our customers."],
        quote: {
            text: "2020 taught us resilience. We didn't just survive the challenges; we used them as opportunities to innovate and serve our community better.",
            author: "Sarah Johnson, CTO",
            authorImage: "/images/management/cto.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "📱 Mobile Money Launch",
    },
    {
        date: '2021',
        text: ["Achieved 4G/LTE network deployment and reached 1 million customers milestone across Sierra Leone."],
        image: '/images/timeline/2021-4g.jpg',
        link: {
            url: "",
            text: "",
        },
        detailText: ["Launched high-speed internet services and expanded our customer base significantly, becoming a leading telecom provider."],
        quote: {
            text: "Reaching 1 million customers was more than a number; it represented our commitment to connecting every Sierra Leonean.",
            author: "Fatima Bangura, COO",
            authorImage: "/images/management/coo.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "📊 1M Customers",
    },
    {
        date: '2022',
        text: ["Launched QFiber broadband services and introduced innovative data bundles for businesses and individuals."],
        image: '/images/timeline/2022-qfiber.jpg',
        link: {
            url: "",
            text: "",
        },
        detailText: ["Expanded into fiber-optic services, providing high-speed internet to homes and businesses across major urban centers."],
        quote: {
            text: "QFiber represents our vision of a fully connected Sierra Leone, where every business and home has access to world-class internet.",
            author: "James Kamara, Network Director",
            authorImage: "/images/management/network-director.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "🌐 QFiber Launch",
    },
    {
        date: '2023',
        text: ["Expanded to 95% network coverage across Sierra Leone and launched enterprise solutions for businesses."],
        image: '/images/timeline/2023-coverage.jpg',
        link: {
            url: "",
            text: "",
        },
        detailText: ["Achieved comprehensive network coverage and introduced specialized business solutions, including corporate accounts and enterprise connectivity."],
        quote: {
            text: "Our enterprise solutions help businesses grow and compete in the digital economy, driving Sierra Leone's economic development.",
            author: "David Conteh, Sales Director",
            authorImage: "/images/management/sales-director.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "🏢 Enterprise Solutions",
    },
    {
        date: '2024',
        text: ["Launched 5G-ready infrastructure and introduced AI-powered customer service, setting new standards for telecom innovation in West Africa."],
        image: '/images/timeline/2024-5g.jpg',
        link: {
            url: "",
            text: "",
        },
        detailText: ["Prepared for the future with 5G infrastructure and implemented cutting-edge AI technology to enhance customer experience."],
        quote: {
            text: "We're not just keeping up with technology; we're leading it. Our 5G-ready network positions Sierra Leone at the forefront of digital innovation.",
            author: "Aminata Sesay, CMO",
            authorImage: "/images/management/cmo.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "⚡ 5G Ready",
    },
    {
        date: 'Current',
        text: ["Continuing to innovate with next-generation services, expanding digital inclusion programs, and preparing for future technological advancements."],
        image: '/images/timeline/current-innovation.jpg',
        link: {
            url: "",
            text: "",
        },
        detailText: ["Focusing on digital inclusion, sustainable growth, and preparing Sierra Leone for the digital future with cutting-edge telecommunications solutions."],
        quote: {
            text: "Our journey continues as we build the digital foundation for Sierra Leone's future, connecting every citizen and empowering every business.",
            author: "Dr. Mohamed Kallon, CEO",
            authorImage: "/images/management/ceo.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "🚀 Future Ready",
    }
]};


const TimelineItem = ({ item }: { item: TimelineItemInterface }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-50% 0px -50% 0px' });

    return (
        <div ref={ref} className="timeline_item">
            <div id="w-node-_24c49997-4a3d-4bd7-0915-1f0630d904af-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": inView ? 1 : 0.25}}><div className="timeline_date-text">{item.date}</div></div>
            <div id="w-node-_24c49997-4a3d-4bd7-0915-1f0630d904b2-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
            <div className="timeline_right" style={{opacity: inView ? 1 : 0.25, transition: 'opacity 0.5s ease',}}>
                {item.milestone ? <div className="timeline_milestone-badge"><div>{item.milestone}</div></div> : ""}
                {/*<div className="timeline_milestone-badge"><div>🚀 relume launches</div></div> NEED TO RENDER THE TIMELINE TEXT BELOW*/}
                <div className="margin-bottom-medium">
                    {item.text.map((text: string, index: number) => (
                        <React.Fragment key={index}>
                        <div className="timeline_text">{text}<br /></div>
                        {item.text.length -1 !== index ? <br /> : ""}
                        </React.Fragment>
                    ))}
                </div>
                {item.detailText && item.detailText.length > 0 ?
                <div className="margin-bottom-xlarge">
                    {item.detailText.map((text: string, index: number) => (
                        <p key={index} className="text-colour-lightgrey"> {text}<br /></p>
                    ))}
                </div> : ""}

                {item.link && (item.link.url || item.link.text) ?
                <div className="margin-bottom-xlarge">
                    <div className="inline-block">
                        <a href={item.link.url} target="_blank" className="timeline_link w-inline-block">
                            <div>{item.link.text}</div>
                            {item.link.imageUrl && <img src={item.link.imageUrl} loading="lazy" alt="" className="link-icon" />}
                        </a>
                    </div>
                </div> : ""}
                {item.definition && (item.definition.term || item.definition.pronunciation || item.definition.meaning ) ? 
                <div className="margin-bottom-xlarge">
                    <div className="timeline_definition-wrapper">
                        <p className="text-colour-black">{item.definition.term}<br /></p>
                        <div className="timeline_badge"><div>{item.definition.partOfSpeech}</div></div>
                        <p className="text-colour-lightgrey">
                            [{item.definition.pronunciation}]<br />
                            <span className="text-colour-black">{item.definition.meaning}</span>
                        </p>
                    </div>
                </div> : ""}
                <div className="timeline_image-wrapper"><img src={item.image} loading="lazy" width="480" alt="" /></div>
                {item.quote && (item.quote.text || item.quote.author || item.quote.authorImage) ?
                <>
                <br/>
                <div className="timeline_quote-wrapper">
                    {item.quote.authorImage && <img src={item.quote.authorImage} loading="lazy" alt="" className="timeline_quote-image" />}
                    <div className="timeline_quote-text-wrapper">
                        <p className="timeline_quote">
                            {item.quote.text}<br />
                        </p>
                        <p className="timeline_quote-title">{item.quote.author}<br /></p>
                    </div>
                </div>
                </> : "" }
            </div>
        </div>
    )

}

const Timeline = () => {

    return (
        <>
        <div className="container">
        <div className="timeline_component">
            <div className="timeline_progress"><div data-w-id="d5abcf1f-3370-3eea-ccfd-66f076babfdd" className="timeline_progress-bar" style={{"willChange": "opacity", "opacity": 1}}></div></div>
            {
                timelineItems.items.map((item: TimelineItemInterface, index: number) => (
                    <TimelineItem key={index} item={item} />
                ))
            }
            
            <div className="overlay-fade-bottom"></div>
            <div className="overlay-fade-top"></div>
        </div>
    </div>



    <style jsx>{`
        
    `}</style>
    </>
    );
};

export default Timeline;
