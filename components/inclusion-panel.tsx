import Image from "next/image"

export default function InclusionPanel() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="col-span-2 md:col-span-2 bg-gradient-to-br from-[#CD7F32] to-[#CF9E0B] p-12 md:p-20">
          <p className="text-white text-2xl font-bold w-[90%] mx-auto md:text-3xl">
            This is where every voice matters, and every role plays a part in shaping how people connect across The
            Gambia, Sierra Leone and beyond. We&apos;re a team of bold thinkers, creators, and doers. We believe in
            potential, not just credentials.
          </p>
        </div>
        {/* Top left panel */}
        <div className="flex items-center justify-center bg-amber-800 p-8 md:p-10">
          <h2 className="text-3xl w-[90%] mx-auto md:text-4xl lg:text-5xl font-medium text-white">
            Together, we build the future of communication in Africa
          </h2>
        </div>

        {/* Top right panel */}
        <div className="bg-pink-300 flex items-center justify-center">
          <div className="w-full h-full">
            <Image
              src="/images/inclusion-1.jpg"
              alt="Team member smiling"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom panel spanning two columns */}
        {/*<div className="col-span-2 md:col-span-4 bg-amber-500 p-8 md:p-20">
          <p className="text-white text-2xl font-bold w-[90%] mx-auto md:text-3xl">
            This is where every voice matters, and every role plays a part in shaping how people connect across The
            Gambia, Sierra Leone and beyond. We're a team of bold thinkers, creators, and doers. We believe in
            potential, not just credentials.
          </p>
        </div>*/}

        {/* middle left panel */}
        <div className="bg-blue-600 flex items-center justify-center">
          <div className="w-full h-full">
            <Image
              src="/images/inclusion-2.jpg"
              alt="Team member smiling"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* middle right panel */}
        <div className="flex items-center justify-center bg-amber-800 p-8 md:p-10">
          <h2 className="text-3xl w-[90%] mx-auto md:text-4xl lg:text-5xl font-medium text-white">
            We embrace new ideas and technology to push boundaries
          </h2>
        </div>

        {/* bottom left panel */}
        <div className="flex items-center justify-center bg-amber-800 p-8 md:p-10">
          <h2 className="text-3xl w-[90%] mx-auto md:text-4xl lg:text-5xl font-medium text-white">
            We&apos;re invested in your journey, not just your job
          </h2>
        </div>

        {/* bottom right panel */}
        <div className="bg-pink-300 flex items-center justify-center">
          <div className="w-full h-full">
            <Image
              src="/images/inclusion-3.jpg"
              alt="Team member smiling"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* bottom bottom left panel */}
        <div className="bg-blue-600 flex items-center justify-center">
          <div className="w-full h-full">
            <Image
              src="/images/inclusion-4.jpg"
              alt="Team member smiling"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* bottom bottom right panel */}
        <div className="flex items-center justify-center bg-amber-800 p-8 md:p-10">
          <h2 className="text-3xl w-[90%] mx-auto md:text-4xl lg:text-5xl font-medium text-white">
            We celebrate what makes you, you
          </h2>
        </div>
      </div>
    </section>
  )
}
