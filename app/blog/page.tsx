import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog - Melolo",
  description: "Latest movie reviews, download tutorials, and tech tips",
  keywords: "blog, movie reviews, download tutorials, tech tips",
}

// 文章数据
const articles = [
  {
    id: "will-a-pack-doctor-choose-love-or-leave-her-alpha",
    title: "Love and Denial: Will a Pack Doctor Choose Love or Leave Her Alpha?",
    description: "Her werewolf nature and her dream of becoming a renowned doctor don't seem to go hand in hand for Yara. Not when werewolf enemies lurk around, ready to attack the pack.",
    excerpt: "Yara was a pre-med student with a great desire to become a successful doctor. When her pack got under attack, she had to flee to save her life. She remained in the human world and promised never to go back to the werewolf world...",
    image: "/placeholder.jpg",
    date: "2025-08-19",
    category: "Movie Review",
    tags: ["Werewolf", "Romance", "ReelShort", "Drama"],
    readTime: "5 min read"
  }
]

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-8 lg:px-16 max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover latest movie reviews, download tutorials and tech tips
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-8 lg:px-16 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-[#6122f2] text-white">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-[#6122f2] transition-colors">
                      <Link href={`/blog/${article.id}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${article.id}`}
                      className="inline-flex items-center text-[#6122f2] hover:text-[#4f1cc9] transition-colors font-medium"
                    >
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}