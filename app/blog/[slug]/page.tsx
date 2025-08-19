import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

interface Article {
  id: string
  title: string
  description: string
  content: string
  image: string
  date: string
  category: string
  tags: string[]
  readTime: string
  author: string
}

// 文章数据库
const articles: Record<string, Article> = {
  "will-a-pack-doctor-choose-love-or-leave-her-alpha": {
    id: "will-a-pack-doctor-choose-love-or-leave-her-alpha",
    title: "Love and Denial: Will a Pack Doctor Choose Love or Leave Her Alpha?",
    description: "Her werewolf nature and her dream of becoming a renowned doctor don't seem to go hand in hand for Yara. Not when werewolf enemies lurk around, ready to attack the pack.",
    image: "/placeholder.jpg",
    date: "2025-01-22",
    category: "Movie Review",
    tags: ["Werewolf", "Romance", "ReelShort", "Drama"],
    readTime: "5 min read",
    author: "Gaya Freedman",
    content: `
    <div class="prose prose-lg max-w-none">
      <p class="lead">
        Her werewolf nature and her dream of becoming a renowned doctor don't seem to go hand in hand for Yara. Not when werewolf enemies lurk around, ready to attack the pack.
      </p>
      
      <p>
        Will a Pack Doctor Choose Love or Leave Her Alpha movie explores the difficulty of making choices. Yara is torn between being with her fated mate and being a successful doctor in the human world.
      </p>

      <p class="text-center">
        <a href="#" class="inline-block bg-[#6122f2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4f1cc9] transition-colors">
          Watch Movie Now &raquo;
        </a>
      </p>

      <h2>Part 1: What's the Story of Will a Pack Doctor Choose Love or Leave Her Alpha?</h2>
      
      <p>Do you want to know what happens in Will a Pack Doctor Choose Love or Leave Her Alpha drama? Here's a sneak peek into the story.</p>
      
      <p>
        Yara was a pre-med student with a great desire to become a successful doctor. When her pack got under attack, she had to flee to save her life. She remained in the human world and promised never to go back to the werewolf world.
      </p>
      
      <p>
        When her wolf was dying for release, Yara went into the woods to shift into her wolf when she heard a groan. Realizing that someone was in distress, Yara rushed to save the man who had his foot caught in a trap.
      </p>
      
      <p>
        After setting his leg free, Yara realized that the man in front of her was also a werewolf and her mate, nonetheless. No matter how hard she tried to pretend she didn't recognize the bond, the guy wasn't having it.
      </p>
      
      <p>
        Just then, a bunch of werewolves made an entrance, ready to attack Yara and protect the man in front of her. His identity? He was none other than the leader of the Ironfang pack, Alpha Warren.
      </p>
      
      <p>
        Watching Yara's reluctance to go with him, the Alpha ordered his men to take her to his packhouse. He wasn't about to let his mate wander the human world all alone.
      </p>

      <div class="my-8 p-6 bg-gray-50 rounded-lg">
        <p class="text-center text-gray-600 italic">
          Will a Pack Doctor Choose Love or Leave Her Alpha movie
        </p>
      </div>
      
      <p>
        Hurt and pained, Alpha Warren went to his pack's doctor, Lucia, a woman who fancied him and was visibly trying to make him depend on her in the near future. This is why she suggested they had to cut Warren's leg as the injuries were too severe for his wolf to be able to heal on its own.
      </p>
      
      <p>
        Upon hearing such nonsense, Yara stepped in and told her mate she could heal him. Miraculously, she had no trouble in restoring Warren's leg to good health. Was it the mate bond, or did Yara hold healing powers?
      </p>
      
      <p>
        No matter the reason, Lucia was furious with the outcome and wanted nothing more than to crush Yara and banish her from the back. Yara was also determined to leave the werewolves and go back to her life amongst humans.
      </p>
      
      <p>
        The only one with a different agenda was Alpha Warren, who couldn't let go of his beautiful, skilled mate.
      </p>

      <p class="text-center">
        <a href="#" class="inline-block bg-[#6122f2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4f1cc9] transition-colors">
          Watch Movie Now &raquo;
        </a>
      </p>

      <h2>Part 2: Who's in the Cast of Will a Pack Doctor Choose Love or Leave Her Alpha?</h2>

      <h3>Rebecca Stoughton as Yara</h3>
      
      <p>
        The sweetheart of Will a Pack Doctor Choose Love or Leave Her Alpha movie, Yara was a young shewolf who studied Medicine. Being a young, beautiful, and skilled girl, the daughter of an Alpha, prompted Alpha Simon to pursue her.
      </p>
      
      <p>
        Simon was not a nice werewolf leader. On the contrary, he had a reputation for being ruthless. His insistence on making Yara his Luna infuriated the girl's father, but Simon vowed he would succeed even if it meant he would have to kill the girl's father.
      </p>
      
      <p>
        After one more attack over her pack, Yara had to flee to the human world to avoid being taken away by Simon. She planned to finish her studies and become a doctor for humans.
      </p>
      
      <p>
        The last thing Yara expected was to find her fated mate as she was enjoying a run in the forest in her wolf form. This time, she couldn't escape as Alpha Warren took her home with the intention of making her his Luna.
      </p>
      
      <p>
        Would Yara give in to the mate bond or fight her fated werewolf?
      </p>

      <div class="my-8 p-6 bg-gray-50 rounded-lg">
        <p class="text-center text-gray-600 italic">
          Will a Pack Doctor Choose Love or Leave Her Alpha drama
        </p>
      </div>

      <h3>Aaron Russel as Alpha Warren</h3>
      
      <p>
        Rival of Alpha Simon, Warren was a kind werewolf leader, known for being fair. He always wanted to find his fated mate, and he never imagined that his Luna would be so hard to get.
      </p>
      
      <p>
        Yara was obviously a troublemaker, but Alpha Warren had no intention of letting her go. He may have started his relationship with Yara using force when he brought her to his packhouse, not now he wanted to take things slowly, enamor her.
      </p>
      
      <p>
        There were people standing in the way of their happiness, though. One was doctor Lucia who wanted Warren for herself, and the other was Alpha Simon who vowed to make Yara his Luna.
      </p>

      <h3>Jordan Wentz as Dr Lucia</h3>
      
      <p>
        One of the antagonists of the movie, doctor Lucia, was the Ironfang pack's doctor. Everyone looked up to her and had her back when Yara first arrived at the packhouse. The wolves were already considering Lucia as their next Luna, so Yara was the outsider.
      </p>
      
      <p>
        Relying on her peers, Lucia didn't hesitate to make Yara look bad in front of Warren, setting traps and blaming her for making terrible medical mistakes.
      </p>

      <p class="text-center">
        <a href="#" class="inline-block bg-[#6122f2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4f1cc9] transition-colors">
          Watch Movie Now &raquo;
        </a>
      </p>

      <h2>Part 3: Is Will a Pack Doctor Choose Love or Leave Her Alpha a Hit Drama Series?</h2>
      
      <p>
        There are several aspects that make a drama series a true hit, and Will a Pack Doctor Choose Love or Leave Her Alpha marks them all.
      </p>
      
      <p>
        First off, we get an amazing werewolf story. Who's not into fangs, fated mates, and love triangles? Outsiders meddling between lovers, stirring jealousies, and plotting against them are the ingredients of a great story.
      </p>
      
      <p>
        Lucia and Simon are a constant threat for Warren and Lucia's relationship, making their journey to happiness rockier than it was already.
      </p>
      
      <p>
        Furthermore, there are these constant plot twists that keep you invested in the story. Yara has an unpredictable temper. She's bold, she knows what she wants, but there are times when she takes us by surprise, acting out of character.
      </p>

      <div class="my-8 p-6 bg-gray-50 rounded-lg">
        <p class="text-center text-gray-600 italic">
          Will a Pack Doctor Choose Love or Leave Her Alpha series
        </p>
      </div>
      
      <p>
        Moreover, the romance storyline is bittersweet. You never know what to expect from Yara and Alpha Warren, as they are both stubborn. They clearly want to be together, but refrain from unleashing their feelings.
      </p>
      
      <p>
        One thing's for sure. Will a Pack Doctor Choose Love or Leave Her Alpha is a great short drama series that you have to watch on ReelShort.
      </p>

      <p class="text-center">
        <a href="#" class="inline-block bg-[#6122f2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4f1cc9] transition-colors">
          Watch Movie Now &raquo;
        </a>
      </p>

      <h2>Part 4: Conclusion</h2>
      
      <p>
        Will a Pack Doctor Choose Love or Leave Her Alpha ReelShort movie is a hit series that should be on your list of favorite dramas. Rebecca Stoughton and Aaron Russel make a great on-screen couple; they have amazing chemistry together.
      </p>
      
      <p>
        When you access the ReelShort website, make sure you check out their other werewolf dramas as well. They have unique stories, and they also have series inspired by some of the best online werewolf novels.
      </p>

      <div class="my-8 p-6 bg-gray-50 rounded-lg">
        <p class="text-center text-gray-600 italic">
          Will a Pack Doctor Choose Love or Leave Her Alpha ReelShort
        </p>
      </div>
      
      <p>
        Watching series on the platform or in the app is easy. All you need to do is create an account, and you can start enjoying the movie The Pack's Doctor. They are free; you can easily unlock the episodes by watching ads or by spending coins.
      </p>
      
      <p>
        I know there are other platforms that promise the experience of a full movie, but ReelShort is the best choice in terms of short video streaming.
      </p>

      <p class="text-center">
        <a href="#" class="inline-block bg-[#6122f2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4f1cc9] transition-colors">
          Watch Movie Now &raquo;
        </a>
      </p>
    </div>
    `
  }
}

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles[params.slug]
  
  if (!article) {
    return {
      title: "文章未找到 - Melolo"
    }
  }

  return {
    title: `${article.title} | Melolo博客`,
    description: article.description,
    keywords: article.tags.join(", "),
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image],
      type: "article",
      publishedTime: article.date,
    },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = articles[params.slug]

  if (!article) {
    notFound()
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Article Header */}
        <article className="py-16">
          <div className="container mx-auto px-8 lg:px-16 max-w-4xl">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link 
                href="/blog"
                className="inline-flex items-center text-[#6122f2] hover:text-[#4f1cc9] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>

            {/* Article Meta */}
            <div className="mb-8">
              <Badge className="bg-[#6122f2] text-white mb-4">
                {article.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                {article.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <Image
                src={article.image}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#6122f2] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share and Navigation */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Share this article:</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                  </div>
                </div>
                
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-[#6122f2] hover:text-[#4f1cc9] transition-colors"
                >
                  View More Articles →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

// 生成静态路径
export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }))
}