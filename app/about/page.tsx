export default function AboutUs() {
  return (
    <main className="bg-[#1F1F1F] text-white px-6 py-12 space-y-20">

      {/* What We Do */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-orange-400">What We Do</h2>
        <p className="text-lg mb-4 text-gray-300">
          Miti Tibeb blends the elegance of woodwork with African artistic heritage.
          Each piece we craft carries a story rooted in culture, sustainability, and care.
        </p>
        <p className="text-gray-400 text-base">
          Not only that, but also here at Miti Tibeb we offer a collection of interior design samples 
          that highlight the craftsmanship of our partners—not only in manufacturing high-quality wooden 
          products but also in installing them with precision and peace of mind.
        </p>
      </section>

      {/* Meet the Builder */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-orange-400">Meet the Builder</h2>
        <p className="text-lg text-gray-300">
          The Miti Tibeb platform is developed and maintained by a passionate junior developer with a
          strong interest in scalable software and ethical technology.
        </p>
        <p className="mt-4 text-gray-400 text-base">
          A late UR student, certified in ALX’s intensive 12-month Software Engineering Program, I bring 
          a multi-disciplinary edge—balancing backend systems, mobile apps, and security practices.
          From data pipelines to DevOps tooling, my aim is to create digital bridges between African talent 
          and global opportunity.
        </p>
      </section>

      {/* Future Integration */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-orange-400">Future Integration</h2>
        <p className="text-lg text-gray-300">
          Our roadmap is driven by innovation, scale, and cultural impact.
        </p>
        <p className="mt-4 text-gray-400 text-base">
          In the near future, we plan to integrate machine learning to recommend furniture based on user taste, 
          3D previews for better visualization, and digital craftsmanship certificates to promote artisan credibility.
          We are also working to build a vendor dashboard, live chat for interior consultations, and payment integrations 
          with local African banks and mobile money.
        </p>
      </section>
    </main>
  );
}
