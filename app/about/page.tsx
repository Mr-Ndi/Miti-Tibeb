'use client';

import { motion } from 'framer-motion';
import { Users, Hammer, Rocket } from 'lucide-react';

export default function AboutUs() {
  return (
    <main className="bg-[#1F1F1F] text-white px-6 py-16 space-y-24">

      {/* What We Do */}
      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hammer className="mx-auto text-orange-400 mb-4" size={40} />
        <h2 className="text-3xl font-bold mb-4 text-orange-400">What We Do</h2>
        <p className="text-lg mb-4 text-gray-300">
          Miti Tibeb blends the elegance of woodwork with African artistic heritage. Each piece we craft carries a story rooted in culture, sustainability, and care.
        </p>
        <blockquote className="italic text-orange-300 mb-4">
          “Where artistry meets craftsmanship and tradition lives in every grain.”
        </blockquote>
        <p className="text-gray-400 text-base">
          Beyond creating furniture, we offer interior design samples that showcase not only the manufacturing talent of our partners but also their expert installation work — bringing peace and beauty into your spaces.
        </p>
      </motion.section>

      {/* Meet the Builder */}
      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Users className="mx-auto text-orange-400 mb-4" size={40} />
        <h2 className="text-3xl font-bold mb-4 text-orange-400">Meet the Builder</h2>
        <p className="text-lg text-gray-300">
          Behind Miti Tibeb is a late UR student, a junior software engineer passionate about open access, ethical tech, and scalable systems.
        </p>
        <p className="mt-4 text-gray-400 text-base">
          Certified from ALX’s 12-month software engineering program, I specialize in backend architecture, data pipelines, mobile development, DevOps, and cybersecurity. My mission: to build digital bridges between African talent and the global market.
        </p>
      </motion.section>

      {/* Future Integration */}
      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Rocket className="mx-auto text-orange-400 mb-4" size={40} />
        <h2 className="text-3xl font-bold mb-4 text-orange-400">Future Integration</h2>
        <p className="text-lg text-gray-300">
          Innovation is in our DNA — and our roadmap reflects that.
        </p>
        <p className="mt-4 text-gray-400 text-base">
          We are planning to integrate machine learning to personalize product recommendations, 3D previews for immersive shopping, and digital authenticity certificates. A dedicated vendor dashboard, live consultation chat, and support for African mobile banking are also on the way.
        </p>
      </motion.section>
    </main>
  );
}
