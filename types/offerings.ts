export interface Offering {
    id: string
    title: string
    description: string
    image: string
    features: string[]
    cta: {
      text: string
      action: string
    }
    details: {
      title: string
      description: string
      benefits: string[]
    }
  }
  //
export const offerings: Offering[] = [
  {
    id: "combo-bundles",
    title: "Combo Bundles",
    description: "Get the best of both worlds with our combo voice and data bundles!",
    image: "/images/qmobile.png",
    features: ["Voice + Data", "Affordable", "Flexible options"],
    cta: {
      text: "View Bundles",
      action: "/tariffs/alternative",
    },
    details: {
      title: "Combo Bundles",
      description: "Enjoy seamless connectivity with our affordable combo bundles, perfect for every need.",
      benefits: ["Save more", "All-in-one", "Easy activation"],
    },
  },
  {
    id: "data-bundles",
    title: "Data Bundles",
    description: "Stay connected with our high-value data bundles for every budget.",
    image: "/images/mifi.png",
    features: ["Big data", "Long validity", "Best price"],
    cta: {
      text: "Buy Data",
      action: "/tariffs/data-bundles",
    },
    details: {
      title: "Data Bundles",
      description: "Choose from a variety of data plans to suit your browsing and streaming needs.",
      benefits: ["No hidden fees", "Flexible plans", "Fast speeds"],
    },
  },
  {
    id: "voice-tariffs",
    title: "Voice Tariffs",
    description: "Crystal clear calls at unbeatable rates across all networks.",
    image: "/images/voice-tariffs.jpg",
    features: ["Low rates", "All networks", "No connection fee"],
    cta: {
      text: "See Tariffs",
      action: "/tariffs/voice-tariffs",
    },
    details: {
      title: "Voice Tariffs",
      description: "Enjoy affordable calls to any network, anytime.",
      benefits: ["No hidden charges", "Best value", "Wide coverage"],
    },
  },
  {
    id: "qpower",
    title: "QPower",
    description: "Buy NAWEC cash power easily and instantly with QPower!",
    image: "/images/qpower.jpg",
    features: ["Instant purchase", "No extra charges", "24/7 availability"],
    cta: {
      text: "Buy QPower",
      action: "/services/alternative",
    },
    details: {
      title: "QPower",
      description: "Top up your NAWEC cash power anytime, anywhere using your QCell line.",
      benefits: ["Fast & secure", "No queues", "Easy to use"],
    },
  },
  {
    id: "qcell-music",
    title: "QCell Music",
    description: "Stream and download your favorite songs with QCell Music!",
    image: "/images/qsmart-plus.png",
    features: ["Unlimited music", "No ads", "Offline listening"],
    cta: {
      text: "Try Now",
      action: "/services/alternative-two",
    },
    details: {
      title: "QCell Music",
      description: "Access a world of music with our exclusive streaming service.",
      benefits: ["Huge library", "No interruptions", "Listen anywhere"],
    },
  },
]
  
  