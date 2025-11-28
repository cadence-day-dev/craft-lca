"use client";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { TeamMemberModal } from "@/app/_components/team-member-modal";
import { type Author } from "@/interfaces/author";
import { useState } from "react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
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
      shortDescription: "Oleg combines technical expertise with creative vision, specializing in the integration of technology and Koto in contemporary design practice.",
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
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <div onClick={handleAvatarClick} className="cursor-pointer">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {/* <CoverImage title={title} src={coverImage} /> */}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-2.5">
          <div onClick={handleAvatarClick} className="cursor-pointer">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
      
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
      />
    </>
  );
}