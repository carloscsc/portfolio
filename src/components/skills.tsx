import Link from "next/link";
import { useTranslations } from "next-intl";
import { Suspense, use } from "react";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

const Skills = () => {
  const profileData = getAndCacheProfile();
  const t = useTranslations("SkillsSection");

  return (
    <section
      className="container max-w-7xl mx-auto pt-24 px-4 animate-in fade-in duration-500"
      id="skills"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4 text-primary">{t("heading")}</h2>
        <p className="text-secondary max-w-2xl mx-auto text-responsive-md leading-relaxed px-4">
          {t("description")}
        </p>
      </div>
      <Suspense fallback={<SkillsSkeleton />}>
        <RenderSkills profilePromise={profileData} />
      </Suspense>
    </section>
  );
};

const SkillsSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-4">
    {Array(4)
      .fill(null)
      .map((_, index) => (
        <Skeleton key={index} className="w-full h-10" />
      ))}
  </div>
);

type SkillsRenderProps = {
  profilePromise: ReturnType<typeof getAndCacheProfile>;
};

const RenderSkills = ({ profilePromise }: SkillsRenderProps) => {
  const profile = use(profilePromise);
  const skills = profile?.skills || [];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex items-baseline flex-wrap gap-2 p-4 bg-accent rounded transition-all duration-300"
        >
          <span className="text-base font-semibold text-primary shrink-0">
            {skill.name}:
          </span>
          <div className="flex flex-wrap gap-2">
            {skill.technologies.map((tech) => (
              <Link
                key={tech.value}
                href={`/tags/${tech.value}`}
                title={tech.label}
              >
                <Badge
                  variant="secondary"
                  className="bg-transparent text-highlight border-highlight hover:bg-highlight hover:text-background"
                >
                  {tech.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
