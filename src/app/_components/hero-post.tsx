"use client";

import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { TeamMemberModal } from "@/app/_components/team-member-modal";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { useState } from "react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Team member data (same as in about page)
  const teamMembers = [
    {
      name: "Driss",
      image: "/assets/blog/authors/Driss.png",
      shortDescription: "...",
      extendedDescription: "..."
    },
    {
      name: "Bruno",
      image: "/assets/blog/authors/Bruno.png",
      shortDescription: "...",
      extendedDescription: "..."
    },
    {
      name: "Oleg",
      image: "/assets/blog/authors/Oleg.png",
      shortDescription: "...",
      extendedDescription: "..."
    },
  ];

  const openModal = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleAvatarClick = () => {
    const member = teamMembers.find(m => m.name === author.name);
    if (member) {
      openModal(member);
    }
  };

  return (
    <>
      <section>
        <div className="mb-8 md:mb-12">
          <CoverImage title={title} src={coverImage} slug={slug} aspectRatio="aspect-[1.5/1] md:aspect-[2/1]" />
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
          <div>
            <h3 className="mb-4 text-md lg:text-md leading-tight font-normal uppercase tracking-wider">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            <div className="mb-4 md:mb-0 text-sm tracking-wider">
              <DateFormatter dateString={date} />
            </div>
          </div>
          <div>
            <p className="text-md leading-relaxed mb-4 tracking-wider">{excerpt}</p>
            <div onClick={handleAvatarClick} className="cursor-pointer">
              <Avatar name={author.name} picture={author.picture} />
            </div>
          </div>
        </div>
      </section>
      
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
      />
    </>
  );
}