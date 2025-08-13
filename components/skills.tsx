interface SkillProps {
  name: string
  percentage: number
}

function SkillItem({ name, percentage }: SkillProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-gray-400">{percentage}%</span>
      </div>
      <div className="h-2 bg-card rounded-full">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section className="py-16" id="skills">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">My Skills</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          I've spent years honing my skills in web development. Here's an overview of my technical expertise and
          proficiency levels.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkillItem name="React" percentage={92} />
        <SkillItem name="CSS" percentage={85} />
        <SkillItem name="NextJS" percentage={92} />
        <SkillItem name="Node.js" percentage={87} />
        <SkillItem name="JavaScript" percentage={93} />
        <SkillItem name="React Native" percentage={92} />
      </div>
    </section>
  )
}
