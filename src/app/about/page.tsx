"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { TeamMemberModal } from "@/app/_components/team-member-modal";
import Image from "next/image";
import { useState } from "react";


const teamMembers = [
  // {
  //   name: "Driss",
  //   image: "/assets/blog/authors/Driss.png",
  //   shortDescription: "...",
  //   extendedDescription: "..."
  // },
  {
    name: "Bruno",
    image: "/assets/blog/authors/Bruno.png",
    shortDescription: "...",
    extendedDescription: "..."  },
  {
    name: "Oleg",
    image: "/assets/blog/authors/Oleg.png",
      shortDescription: "...",
    extendedDescription: "..."  
  },
];

export default function About() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };
  return (
    <main>
      <Container>
        <Intro />
        <article className="mb-2.5 md:mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-md md:text-lg tracking-wider leading-tight mb-12 text-left font-normal">
              About
            </h1>
            
            <div className="text-lg leading-relaxed">
              
              <p className="mb-6">
              We are a team of computational designers with deep expertise in VDC and LCA, based across Copenhagen and Berlin.

Our work bridges design intelligence and environmental responsibility. We develop tools and methods that make life-cycle assessments faster, more accessible, and more relevant for the existing built environment.

Through efficient BIM, simulation, and computation, we translate complex environmental data into clear insight helping institutions act with precision and icreased speed in a changing regulatory landscape.              </p>
              
              {/* Authors Section */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {teamMembers.map((member) => (
                  <div key={member.name} className="text-left">
                    <div 
                      className="aspect-square mb-4 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openModal(member)}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-normal tracking-wider uppercase mb-2">{member.name}</h3>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {member.shortDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Container>
      
      <TeamMemberModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
      />
    </main>
  );
}