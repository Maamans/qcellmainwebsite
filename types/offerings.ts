export interface OfferingAction {
  text: string
  action: string
}

export interface OfferingDetails {
  title: string
  description: string
  benefits: string[]
  quickActions?: OfferingAction[]
  ctas?: OfferingAction[]
  image?: string
}

export interface Offering {
  id: string
  title?: string
  description?: string
  image?: string
  features?: string[]
  cta?: OfferingAction
  ctas?: OfferingAction[]
  quickActions?: OfferingAction[]
  details: OfferingDetails
}

export const offerings: Offering[] = [
  {
    id: "combo-bundles",
    title: "Combo Bundles",
    description: "Get the best of both worlds with our combo voice and data bundles!",
    image: "/images/off1.jpg",
    features: ["Voice + Data", "Affordable", "Flexible options"],
    cta: {
      text: "View Bundles",
      action: "/tariffs/alternative",
    },
    details: {
      title: "Combo Bundles",
      description: "Enjoy seamless connectivity with our affordable combo bundles, perfect for every need.",
      benefits: ["Save more", "All-in-one", "Easy activation"],
      quickActions: [
        { text: "Dial *335#", action: "*335#" },
        { text: "Open Qcell App", action: "app://qcell" },
      ],
      ctas: [
        { text: "Buy Combo Bundle", action: "/tariffs/alternative" },
        { text: "See Plan Details", action: "/tariffs/alternative" },
      ],
      image: "/images/off1.jpg",
    },
  },
  {
    id: "data-bundles",
    title: "Data Bundles",
    description: "Stay connected with our high-value data bundles for every budget.",
    image: "/images/off2.jpg",
    features: ["Big data", "Long validity", "Best price"],
    cta: {
      text: "Buy Data",
      action: "/tariffs/data-bundles",
    },
    details: {
      title: "Data Bundles",
      description: "Choose from a variety of data plans to suit your browsing and streaming needs.",
      benefits: ["No hidden fees", "Flexible plans", "Fast speeds"],
      quickActions: [
        { text: "Dial *335#", action: "*335#" },
        { text: "Share Data Gift", action: "/tariffs/data-bundles" },
      ],
      ctas: [
        { text: "Buy Data", action: "/tariffs/data-bundles" },
        { text: "View Full Plans", action: "/tariffs/data-bundles" },
      ],
      image: "/images/off2.jpg",
    },
  },
  {
    id: "voice-tariffs",
    title: "Voice Tariffs",
    description: "Crystal clear calls at unbeatable rates across all networks.",
    image: "/images/off3.jpg",
    features: ["Low rates", "All networks", "No connection fee"],
    cta: {
      text: "See Tariffs",
      action: "/tariffs/voice-tariffs",
    },
    details: {
      title: "Voice Tariffs",
      description: "Enjoy affordable calls to any network, anytime.",
      benefits: ["No hidden charges", "Best value", "Wide coverage"],
      quickActions: [
        { text: "Check Balance *335#", action: "*335#" },
        { text: "View Voice Plans", action: "/tariffs/voice-tariffs" },
      ],
      ctas: [
        { text: "See Voice Tariffs", action: "/tariffs/voice-tariffs" },
      ],
      image: "/images/off3.jpg",
    },
  },
  {
    id: "qpower",
    title: "QPower",
    description: "Buy NAWEC cash power easily and instantly with QPower!",
    image: "/images/off4.jpg",
    features: ["Instant purchase", "No extra charges", "24/7 availability"],
    cta: {
      text: "Buy QPower",
      action: "/services/alternative",
    },
    details: {
      title: "QPower",
      description: "Top up your NAWEC cash power anytime, anywhere using your QCell line.",
      benefits: ["Fast & secure", "No queues", "Easy to use"],
      quickActions: [
        { text: "Dial *335#", action: "*335#" },
      ],
      ctas: [
        { text: "Buy QPower", action: "/services/alternative" },
      ],
      image: "/images/off4.jpg",
    },
  },
  {
    id: "qcell-music",
    title: "QCell Music",
    description: "Stream and download your favorite songs with QCell Music!",
    image: "/images/off5.jpg",
    features: ["Unlimited music", "No ads", "Offline listening"],
    cta: {
      text: "Try Now",
      action: "/services/alternative-two",
    },
    details: {
      title: "QCell Music",
      description: "Access a world of music with our exclusive streaming service.",
      benefits: ["Huge library", "No interruptions", "Listen anywhere"],
      quickActions: [
        { text: "Dial *335#", action: "*335#" },
      ],
      ctas: [
        { text: "Start Listening", action: "/services/alternative-two" },
      ],
      image: "/images/off5.jpg",
    },
  },
  {
    id: "smart-home",
    title: "Smart Home Devices",
    description: "Secure, automate, and monitor your home with QCell smart solutions.",
    image: "/images/off6.jpg",
    features: ["Home security", "Automation", "24/7 monitoring"],
    cta: {
      text: "Explore Devices",
      action: "/devices",
    },
    details: {
      title: "Smart Home Devices",
      description: "Cameras, sensors, and hubs that keep your home connected and protected.",
      benefits: ["Easy installation", "Mobile control", "Secure cloud storage"],
      quickActions: [
        { text: "Book a Demo", action: "/devices" },
      ],
      ctas: [
        { text: "Explore Devices", action: "/devices" },
      ],
      image: "/images/off6.jpg",
    },
  },
]