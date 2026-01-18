import Link from "next/link";
import { useTranslations } from "next-intl";
import { Suspense, use } from "react";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import { Badge } from "./ui/badge";

const Skills = () => {
  const profileData = getAndCacheProfile();
  const t = useTranslations("SkillsSection");

  return (
    <section
      className="container mx-auto pt-24 px-4 md:px-0 xl:px-4 animate-in fade-in duration-500"
      id="works"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary">{t("heading")}</h2>
      </div>
      <Suspense fallback={<div>Loading skills...</div>}>
        <RenderSkills profilePromise={profileData} />
      </Suspense>
    </section>
  );
};

type SkillsRenderProps = {
  profilePromise: ReturnType<typeof getAndCacheProfile>;
};
const RenderSkills = ({ profilePromise }: SkillsRenderProps) => {
  const profile = use(profilePromise);
  const skills = profile?.skills || [];

  return (
    <div>
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="mb-4 transition-all duration-300 ease-in-out"
        >
          <span className="text-3xl mb-4 text-primary">{skill.name}</span>:{" "}
          {skill.technologies.map((tech) => (
            <Link
              key={tech.value}
              href={`/tags/${tech.value}`}
              title={tech.label}
            >
              <Badge
                variant="secondary"
                className="bg-transparent text-highlight border-highlight hover:bg-highlight hover:text-background ml-2"
              >
                {tech.label}
              </Badge>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Skills;
