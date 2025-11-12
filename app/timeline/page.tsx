'use client'
import React from 'react';
import Image from 'next/image';
import { useInView} from 'framer-motion';
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
        date: 'January 2012',
        text: ["Co-founder Dan finishes the economics degree he promised his mum he'd complete, only to never use it and start his own clothing business (love you mum)."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60dda4ae36510574b1a7932a_Image%201%20-%20Transparent.png',
        link: {
            url: "",
            text: "",
        },
        detailText: [],
        quote: {
            text: "",
            author: "",
            authorImage: "",
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "",
    },
    {
        date: 'June 2016',
        text: ["Adam catches wind of Dan's early success and slides into his DM offering help. Dan politely accepts."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe2f3220f62c99e3f0f_Image%202.png',
        link: {
            url: "https://www.smartcompany.com.au/startupsmart/profiles/sydney-startup-with-500000-in-funding-wants-to-monetise-your-social-media-following/",
            text: "See the article that got Adam's attention",
            imageUrl: "https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4e982f499b91260e0e91_open_in_new.svg"
        },
        detailText: [],
        quote: {
            text: "",
            author: "",
            authorImage: "",
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "",
    },
    {
        date: 'August 2017',
        text: ["After collectively failing a number of business ventures, Dan and Adam finally have their first break. Together they build Lumio with a team of 7 other legends."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe355e62d52d0a322d8_Image%203.png',
        link: {
            url: "https://www.smartcompany.com.au/startupsmart/profiles/sydney-startup-with-500000-in-funding-wants-to-monetise-your-social-media-following/",
            text: "See the article that got Adam's attention",
            imageUrl: ""
        },
        detailText: ["Lumio, previously called Foenix, was a social media analytics company that helped brands like Audi, David Jones and Red Balloon source legitimate influencers for social media campaigns."],
        quote: {
            text: "“We were essentially the Instagram police and called out fake influencers left, right and centre. It was fun and all, but there is only so many bikini chicks you can look at on Instagram before you start losing your mind.”",
            author: "Dan, Co-founder and CEO of Lumio",
            authorImage: "https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de52655aae394d43a0ac08_Dan.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "",
    },
    {
        date: 'April 2018',
        text: ["Lumio gets acquired by German company, Influencer DB. Yeww! 🎉"],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe2c703faf630cb8191_Image%204.png',
        link: {
            url: "https://www.bandt.com.au/influencerdb-acquires-australian-based-lumio-analytics/",
            text: "Read about the acquisition"
        },
        detailText: [],
        quote: {
            text: "“After this, we both took up golf during the week and started eating fancy dinners at the local Country Club... Ha. This is not what happened at all. We suck at golf and love eating Guzman Y Gomez.”",
            author: "Adam, Co-founder of Lumio",
            authorImage: "https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de5451e0fe7488a2d0efda_Adam.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "",
    },
    {
        date: 'June 2018',
        text: ["Dan is shipped off to work with ze Germans as Head of Product at Influencer DB. ", "Adam decides to stay in Sydney and cut his teeth as a Product Designer with one of Sydney's leading design studios."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe27335a43515f1b7a7_Image%205.png',
        link: {
            url: "https://good-design.org/projects/seatfrog-com-responsive-website-redesign/",
            text: "Read about the Good Design Award"
        },
        detailText: ["Whilst in Germany, Dan worked with with brands such as Daniel Wellington and BMW - Ja!", "Adam worked with clients like Vodafone, TAFE NSW, Adobe and also won the 'Good Design Australia' award for his work on the Seatfrog website."],
        quote: {
            text: "",
            author: "",
            authorImage: ""
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "",
    },
    {
        date: 'November 2019',
        text: ["After spending time apart, Dan and Adam begin to plan their next moves and rekindle their business partnership. The name 'Relume' is born."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe236a3d8f3c716b49f_Image%206.png',
        definition: {
            term: "relume",
            pronunciation: "[ri-loom]",
            meaning: "To relight or rekindle (a light, flame, etc.)",
            partOfSpeech: "Verb"
        },
        link: {
            url: "",
            text: "",
        },
        detailText: [],
        quote: {
            text: "",
            author: "",
            authorImage: ""
        },
        milestone: ""
    },
    {
        date: 'January 2020',
        text: ["Dan moves back to Sydney to join a Global startup incubator called Antler. He convinces Adam to join him."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe229fc171a5a90cec1_Image%207.png',
        link: {
            url: "https://www.antler.co/",
            text: "Learn more about Antler here"
        },
        detailText: [],
        quote: {
            text: "",
            author: "",
            authorImage: ""
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "",
    },
    {
        date: 'April 2020',
        text: ["For various reasons, Dan and Adam decide to turn down a $100,000 investment from Antler and start their own business venture, without taking outside investment."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe33c218b7075db8daa_Image%208.png',
        milestone: "🚀 Relume launches",
        link: {
            url: "",
            text: ""
        },
        detailText: [],
        quote: {
            text: "",
            author: "",
            authorImage: ""
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
    },
    {
        date: 'June 2020',
        text: ["After building 11 websites on Webflow in under 6 weeks as a way to test a number of business ideas, Dan and Adam decide to stick to what they know best and launch Relume - a company that designs and builds beautiful Webflow websites."],
        image: 'https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe31b526885591abeb7_Image%209.png',
        link: {
            url: "",
            text: ""
        },
        detailText: [],
        quote: {
            text: "“Relume was an opportunity for us to build a profitable business, not a startup that bleeds cash, whilst doing what we love to do. It also allows us to learn about all types of businesses and the problems they deal with. These are all opportunities that we could potentially solve for in the future. For now, our goal is simple, we want to build a kickass business which means we really want our customers and the Webflow community to succeed too.”",
            author: "Dan, Co-founder of Relume",
            authorImage: "https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de52655aae394d43a0ac08_Dan.jpg"
        },
        definition: {
            term: "",
            pronunciation: "",
            meaning: "",
            partOfSpeech: ""
        },
        milestone: "",
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
                            {item.link.imageUrl && <Image src={item.link.imageUrl} width={16} height={16} alt="" className="link-icon" unoptimized />}
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
                <div className="timeline_image-wrapper"><Image src={item.image} width={480} height={320} alt="" unoptimized /></div>
                {item.quote && (item.quote.text || item.quote.author || item.quote.authorImage) ?
                <>
                <br/>
                <div className="timeline_quote-wrapper">
                    {item.quote.authorImage && <Image src={item.quote.authorImage} width={60} height={60} alt="" className="timeline_quote-image" unoptimized />}
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
            {/*<div data-w-id="d5abcf1f-3370-3eea-ccfd-66f076babfe0" className="timeline_item">
                <div id="w-node-d5abcf1f-3370-3eea-ccfd-66f076babfe1-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 1}}><div className="timeline_date-text">January 2012</div></div>
                <div id="w-node-d5abcf1f-3370-3eea-ccfd-66f076babfe4-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(255, 255, 255)"}}></div></div>
                <div id="w-node-d5abcf1f-3370-3eea-ccfd-66f076babfe6-8b0ae424" className="timeline_right" style={{"willChange": "opacity", "opacity": 1}}>
                    <div className="margin-bottom-xlarge">
                        <div className="timeline_text">Co-founder Dan finishes the economics degree he promised his mum he'd complete, only to never use it and start his own clothing business (love you mum).</div>
                    </div>
                    <div className="timeline_image-wrapper">
                        <Image
                            src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60dda4ae36510574b1a7932a_Image%201%20-%20Transparent.png"
                            width={480}
                            height={320}
                            alt=""
                            unoptimized
                        />
                    </div>
                </div>
            </div>
            <div data-w-id="0488106f-ce92-9b7b-01c3-8ad75f3f5e35" className="timeline_item">
                <div id="w-node-_0488106f-ce92-9b7b-01c3-8ad75f3f5e36-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">June 2016</div></div>
                <div id="w-node-_0488106f-ce92-9b7b-01c3-8ad75f3f5e39-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": 0.25}}>
                    <div className="margin-bottom-medium">
                        <div className="timeline_text">Adam catches wind of Dan's early success and slides into his DM offering help. Dan politely accepts.<br /></div>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <div className="inline-block">
                            <a href="https://www.smartcompany.com.au/startupsmart/profiles/sydney-startup-with-500000-in-funding-wants-to-monetise-your-social-media-following/" target="_blank" className="timeline_link w-inline-block">
                                <div>See the article that got Adam's attention</div>
                                <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4e982f499b91260e0e91_open_in_new.svg" width={16} height={16} alt="" className="link-icon" unoptimized />
                            </a>
                        </div>
                    </div>
                    <div className="timeline_image-wrapper">
                        <Image
                            src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe2f3220f62c99e3f0f_Image%202.png"
                            width={480}
                            height={320}
                            alt=""
                            unoptimized
                        />
                    </div>
                </div>
            </div>
            <div data-w-id="5b7ae63b-6f00-e542-a023-96ea5c4a96e3" className="timeline_item">
                <div id="w-node-_5b7ae63b-6f00-e542-a023-96ea5c4a96e4-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">August 2017</div></div>
                <div id="w-node-_5b7ae63b-6f00-e542-a023-96ea5c4a96e7-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": 0.25}}>
                    <div className="margin-bottom-medium">
                        <div className="timeline_text">After collectively failing a number of business ventures, Dan and Adam finally have their first break. Together they build Lumio with a team of 7 other legends.<br /></div>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <p className="text-colour-lightgrey">
                            Lumio, previously called Foenix, was a social media analytics company that helped brands like Audi, David Jones and Red Balloon source legitimate influencers for social media campaigns.<br />
                        </p>
                    </div>
                    <div className="timeline_image-wrapper margin-bottom-medium"><Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe355e62d52d0a322d8_Image%203.png" width={480} height={320} alt="" unoptimized /></div>
                    <div className="timeline_quote-wrapper">
                        <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de52655aae394d43a0ac08_Dan.jpg" width={60} height={60} alt="" className="timeline_quote-image" unoptimized />
                        <div className="timeline_quote-text-wrapper">
                            <p className="timeline_quote">
                                “We were essentially the Instagram police and called out fake influencers left, right and centre. It was fun and all, but there is only so many bikini chicks you can look at on Instagram before you start losing
                                your mind.”<br />
                            </p>
                            <p className="timeline_quote-title">Dan, Co-founder and CEO of Lumio<br /></p>
                        </div>
                    </div>
                </div>
            </div>
            <div data-w-id="e0f4f25e-22f1-da39-65d5-a453ca30c731" className="timeline_item">
                <div id="w-node-e0f4f25e-22f1-da39-65d5-a453ca30c732-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">April 2018</div></div>
                <div id="w-node-e0f4f25e-22f1-da39-65d5-a453ca30c735-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": 0.25}}>
                    <div className="margin-bottom-medium">
                        <div className="timeline_text">Lumio gets acquired by German company, Influencer DB. Yeww! 🎉<br /></div>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <div className="inline-block">
                            <a href="https://www.bandt.com.au/influencerdb-acquires-australian-based-lumio-analytics/" target="_blank" className="timeline_link w-inline-block">
                                <div>Read about the acquisition</div>
                                <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4e982f499b91260e0e91_open_in_new.svg" width={16} height={16} alt="" className="link-icon" unoptimized />
                            </a>
                        </div>
                    </div>
                    <div className="timeline_image-wrapper margin-bottom-medium">
                        <Image
                            src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe2c703faf630cb8191_Image%204.png"
                            width={480}
                            height={320}
                            alt=""
                            unoptimized
                        />
                    </div>
                    <div className="timeline_quote-wrapper">
                        <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de5451e0fe7488a2d0efda_Adam.jpg" width={60} height={60} alt="" className="timeline_quote-image" unoptimized />
                        <div className="timeline_quote-text-wrapper">
                            <p className="timeline_quote">
                                “After this, we both took up golf during the week and started eating fancy dinners at the local Country Club... Ha. This is not what happened at all. We suck at golf and love eating Guzman Y Gomez.”<br />
                            </p>
                            <p className="timeline_quote-title">Adam, Co-founder of Lumio<br /></p>
                        </div>
                    </div>
                </div>
            </div>
            <div data-w-id="ca21cc2f-00d7-84a3-f446-587e32a59c00" className="timeline_item">
                <div id="w-node-ca21cc2f-00d7-84a3-f446-587e32a59c01-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">June 2018</div></div>
                <div id="w-node-ca21cc2f-00d7-84a3-f446-587e32a59c04-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": 0.25}}>
                    <div className="margin-bottom-medium">
                        <div className="timeline_text">
                            Dan is shipped off to work with ze Germans as Head of Product at Influencer DB.<br />
                            <br />
                            Adam decides to stay in Sydney and cut his teeth as a Product Designer with one of Sydney's leading design studios.<br />
                        </div>
                    </div>
                    <div className="margin-bottom-medium">
                        <p className="text-colour-lightgrey">
                            Whilst in Germany, Dan worked with with brands such as Daniel Wellington and BMW - Ja!<br />
                            <br />
                            Adam worked with clients like Vodafone, TAFE NSW, Adobe and also won the 'Good Design Australia' award for his work on the Seatfrog website.<br />
                        </p>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <div className="inline-block">
                            <a href="https://good-design.org/projects/seatfrog-com-responsive-website-redesign/" target="_blank" className="timeline_link w-inline-block">
                                <div>Read about the Good Design Award</div>
                                <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4e982f499b91260e0e91_open_in_new.svg" width={16} height={16} alt="" className="link-icon" unoptimized />
                            </a>
                        </div>
                    </div>
                    <div className="timeline_image-wrapper">
                        <Image
                            src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe27335a43515f1b7a7_Image%205.png"
                            width={480}
                            height={320}
                            alt=""
                            unoptimized
                        />
                    </div>
                </div>
            </div>
            <div data-w-id="37ab9472-ef92-a1c7-f6c5-ffbef2542158" className="timeline_item">
                <div id="w-node-_37ab9472-ef92-a1c7-f6c5-ffbef2542159-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">November 2019</div></div>
                <div id="w-node-_37ab9472-ef92-a1c7-f6c5-ffbef254215c-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": 0.25}}>
                    <div className="margin-bottom-medium">
                        <div className="timeline_text">After spending time apart, Dan and Adam begin to plan their next moves and rekindle their business partnership.<br /></div>
                    </div>
                    <div className="margin-bottom-medium">
                        <p className="text-colour-lightgrey">The name "Relume" is born.<br /></p>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <div className="timeline_definition-wrapper">
                            <p className="text-colour-white">relume<br /></p>
                            <div className="timeline_badge"><div>verb</div></div>
                            <p className="text-colour-lightgrey">
                                [ri-loom]<br />
                                <span className="text-colour-white">To relight or rekindle (a light, flame, etc.)</span>
                            </p>
                        </div>
                    </div>
                    <div className="timeline_image-wrapper">
                        <img
                            src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe236a3d8f3c716b49f_Image%206.png"
                            loading="lazy"
                            width="480"
                            sizes="(max-width: 479px) 48px, (max-width: 767px) 64px, 36vw"
                            alt=""
                            srcSet="
                                https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe236a3d8f3c716b49f_Image%206-p-500.png 500w,
                                https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe236a3d8f3c716b49f_Image%206.png       960w
                            "
                        />
                    </div>
                </div>
            </div>
            <div data-w-id="3f36ed1c-86ad-66f2-a7e0-a2e345d5b491" className="timeline_item">
                <div id="w-node-_3f36ed1c-86ad-66f2-a7e0-a2e345d5b492-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">January 2020</div></div>
                <div id="w-node-_3f36ed1c-86ad-66f2-a7e0-a2e345d5b495-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": 0.25}}>
                    <div className="margin-bottom-medium">
                        <div className="timeline_text">Dan moves back to Sydney to join a Global startup incubator called Antler. He convinces Adam to join him.<br /></div>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <div className="inline-block">
                            <a href="https://www.antler.co/" target="_blank" className="timeline_link w-inline-block">
                                <div>learn more about antler here</div>
                                <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4e982f499b91260e0e91_open_in_new.svg" width={16} height={16} alt="" className="link-icon" unoptimized />
                            </a>
                        </div>
                    </div>
                    <div className="timeline_image-wrapper"><Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe229fc171a5a90cec1_Image%207.png" width={480} height={320} alt="" unoptimized /></div>
                </div>
            </div>
            <div data-w-id="24c49997-4a3d-4bd7-0915-1f0630d904ae" className="timeline_item">
                <div id="w-node-_24c49997-4a3d-4bd7-0915-1f0630d904af-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">April 2020</div></div>
                <div id="w-node-_24c49997-4a3d-4bd7-0915-1f0630d904b2-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": "0.25"}}>
                    <div className="timeline_milestone-badge"><div>🚀 relume launches</div></div>
                    <div className="margin-bottom-medium">
                        <div className="timeline_text">For various reasons, Dan and Adam decide to turn down a $100,000 investment from Antler and start their own business venture, without taking outside investment.<br /></div>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <p className="text-colour-lightgrey">To do this they would have to build a company that would be profitable in its first year. Not the next Uber of *insert clever idea*.<br /></p>
                    </div>

                    <div className="margin-bottom-xlarge">
                        <div className="inline-block">
                            <a href="https://www.smartcompany.com.au/startupsmart/profiles/sydney-startup-with-500000-in-funding-wants-to-monetise-your-social-media-following/" target="_blank" className="timeline_link w-inline-block">
                                <div>(text not correct) See the article that got Adam's attention</div>
                                <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4e982f499b91260e0e91_open_in_new.svg" width={16} height={16} alt="" className="link-icon" unoptimized />
                            </a>
                        </div>
                    </div>
                    <div className="margin-bottom-xlarge">
                        <div className="timeline_definition-wrapper">
                            <p className="text-colour-white">(not correct to be remove) relume<br /></p>
                            <div className="timeline_badge"><div>verb</div></div>
                            <p className="text-colour-lightgrey">
                                [ri-loom]<br />
                                <span className="text-colour-white">To relight or rekindle (a light, flame, etc.)</span>
                            </p>
                        </div>
                    </div>
                    <div className="timeline_image-wrapper"><Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe33c218b7075db8daa_Image%208.png" width={480} height={320} alt="" unoptimized /></div>
                    <div className="timeline_quote-wrapper">
                        <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de52655aae394d43a0ac08_Dan.jpg" width={60} height={60} alt="" className="timeline_quote-image" unoptimized />
                        <div className="timeline_quote-text-wrapper">
                            <p className="timeline_quote">
                                “(not correct)We were essentially the Instagram police and called out fake influencers left, right and centre. It was fun and all, but there is only so many bikini chicks you can look at on Instagram before you start losing
                                your mind.”<br />
                            </p>
                            <p className="timeline_quote-title">Dan, Co-founder and CEO of Lumio<br /></p>
                        </div>
                    </div>
                </div>
            </div>
            <div data-w-id="cea39288-a86d-bc98-0716-192fe18bb831" className="timeline_item">
                <div id="w-node-cea39288-a86d-bc98-0716-192fe18bb832-8b0ae424" className="timeline_left" style={{"willChange": "opacity", "opacity": 0.25}}><div className="timeline_date-text">June 2020</div></div>
                <div id="w-node-cea39288-a86d-bc98-0716-192fe18bb835-8b0ae424" className="timeline_centre"><div className="timeline_circle" style={{"willChange": "background", "backgroundColor": "rgb(65, 65, 65)"}}></div></div>
                <div className="timeline_right" style={{"willChange": "opacity", "opacity": 0.25}}>
                    <div className="margin-bottom-xlarge">
                        <div className="timeline_text">
                            After building 11 websites on Webflow in under 6 weeks as a way to test a number of business ideas, Dan and Adam decide to stick to what they know best and launch Relume - a company that designs and builds beautiful
                            Webflow websites.<br />
                        </div>
                    </div>
                    <div className="timeline_image-wrapper margin-bottom-medium"><Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de4fe31b526885591abeb7_Image%209.png" width={480} height={320} alt="" unoptimized /></div>
                    <div className="timeline_quote-wrapper">
                        <Image src="https://cdn.prod.website-files.com/60dd72519d9f9f67690ae425/60de52655aae394d43a0ac08_Dan.jpg" width={60} height={60} alt="" className="timeline_quote-image" unoptimized />
                        <div className="timeline_quote-text-wrapper">
                            <p className="timeline_quote">
                                “Relume was an opportunity for us to build a profitable business, not a startup that bleeds cash, whilst doing what we love to do. It also allows us to learn about all types of businesses and the problems they
                                deal with. These are all opportunities that we could potentially solve for in the future. For now, our goal is simple, we want to build a kickass business which means we really want our customers and the Webflow
                                community to succeed too.”<br />
                            </p>
                            <p className="timeline_quote-title">Dan, Co-founder of Relume<br /></p>
                        </div>
                    </div>
                </div>
            </div>*/}
            
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