import { CardWrapper } from "./ui/card-wrapper"
import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialProps {
  content: string
  author: string
  position: string
  image: string
}

function TestimonialCard({ content, author, position, image }: TestimonialProps) {
  return (
    <CardWrapper>
      <Quote className="text-primary mb-4 h-8 w-8" />
      <p className="text-gray-400 mb-6">{content}</p>
      <div className="flex items-center gap-4">
        <Image src={image || "/placeholder.svg"} alt={author} width={48} height={48} className="rounded-full" />
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-400">{position}</p>
        </div>
      </div>
    </CardWrapper>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      author: "Sarah Johnson",
      position: "CEO at TechStart",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60",
      content:
        "Working with this developer was an absolute pleasure. Their attention to detail and creative solutions made our project a success.",
    },
    {
      author: "Michael Chen",
      position: "Product Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&q=60",
      content:
        "Exceptional work! The developer delivered beyond our expectations and was always responsive to our needs.",
    },
  ]

  return (
    <section className="py-16" id="testimonials">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't just take my word for it. Here's what my clients have to say about their experiences working with me.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  )
}
