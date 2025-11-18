"use client";

import Image from "next/image";
import type { FC } from "react";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";

export interface Member {
  name: string;
  role?: string;
  photo?: string;
  profile_card_link?: string;
  links?: { label: string; url: string; icon: string }[];
}

const iconFor = (type?: string) => {
  if (!type) return null;
  if (type.includes("X") || type.toLowerCase().includes("twitter")) return FaXTwitter;
  if (type.toLowerCase().includes("linkedin")) return FaLinkedinIn;
  if (type.toLowerCase().includes("github")) return FaGithub;
  return null;
};

export const CustomProfileCard: FC<{ member: Member }> = ({ member }) => {
  // find canonical links
  const twitter = member.links?.find(l => /x|twitter/i.test(l.icon || l.label));
  const linkedin = member.links?.find(l => /linkedin/i.test(l.icon || l.label));
  const github = member.links?.find(l => /github/i.test(l.icon || l.label));

  const showGithub = (member.role || "").toLowerCase() === "hub lead";

  return (
    <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 border rounded-xl p-5 shadow-sm">
      <div className="w-28 h-28 rounded-full overflow-hidden mb-3 flex items-center justify-center bg-gray-100">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <div className="text-sm text-gray-500">{member.name?.split(" ").slice(0,1)[0]}</div>
        )}
      </div>

      <div className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</div>
      {member.role && <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">{member.role}</div>}

      <div className="flex gap-3 mt-2">
        {twitter && (() => {
          const Icon = iconFor(twitter.icon || twitter.label) ?? FaXTwitter;
          return (
            <a href={twitter.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200">
              <Icon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </a>
          );
        })()}

        {linkedin && (() => {
          const Icon = iconFor(linkedin.icon || linkedin.label) ?? FaLinkedinIn;
          return (
            <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200">
              <Icon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </a>
          );
        })()}

        {showGithub && github && (() => {
          const Icon = iconFor(github.icon || github.label) ?? FaGithub;
          return (
            <a href={github.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200">
              <Icon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </a>
          );
        })()}
      </div>
    </div>
  );
};

export default CustomProfileCard;