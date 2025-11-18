"use client";

import teamData from "@/public/team.json";
import CustomProfileCard, { Member } from "./CustomProfileCard";

export default function CustomTeamCards() {
  const team = (teamData as Member[]) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {team.map((m, i) => (
        <CustomProfileCard key={i} member={m} />
      ))}
    </div>
  );
}