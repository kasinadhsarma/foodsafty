import { Button } from "@/components/ui/button"
import { Hero, HeroTitle, HeroSubtitle, HeroActions } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import { Header, HeaderLogo, HeaderNav, HeaderNavItem } from "@/components/ui/header"
import { Footer, FooterContent, FooterCopyright, FooterSocial } from "@/components/ui/footer"
import { FeaturesGrid, Feature } from "@/components/ui/features"
import { TestimonialCarousel } from "@/components/ui/testimonials"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { PricingCards, PricingCard } from "@/components/ui/pricing"
import { FAQAccordion } from "@/components/ui/faq"
import { CaseStudiesSection } from "@/components/ui/case-studies"
import { TeamSection, TeamMember } from "@/components/ui/team"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Info as AccuracyIcon,
  Import as IntegrationIcon,
  Recycle as SustainabilityIcon,
  Component as CustomizationIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Linkedin as LinkedInIcon,
} from "lucide-react"

export default function HomePage() {
  const testimonials = [
    {
      quote: "This AI-powered system has transformed our food safety processes.",
      author: "John Smith",
      role: "Food Safety Manager",
      company: "Global Foods Inc."
    },
    {
      quote: "Incredible accuracy in predicting potential safety issues.",
      author: "Sarah Johnson",
      role: "Quality Control Director",
      company: "Fresh Produce Co."
    }
  ]

  const faqItems = [
    {
      question: "How accurate is the AI prediction system?",
      answer: "Our system achieves over 95% accuracy in food safety predictions, backed by extensive testing and validation."
    },
    {
      question: "Can it integrate with existing systems?",
      answer: "Yes, we offer seamless integration with most common food safety management systems through our API."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="flex h-14 items-center justify-between">
          <HeaderLogo href="/" className="mr-6">
            <span className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-primary"></span>
              <span className="font-semibold text-lg tracking-tight">FoodSafety AI</span>
            </span>
          </HeaderLogo>
          <HeaderNav className="gap-6">
            <HeaderNavItem 
              href="/features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </HeaderNavItem>
            <HeaderNavItem 
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </HeaderNavItem>
            <HeaderNavItem 
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </HeaderNavItem>
            <HeaderNavItem 
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </HeaderNavItem>
            <HeaderNavItem
              href="/signup"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign Up
            </HeaderNavItem>
          </HeaderNav>
        </Container>
      </Header>

      <main className="flex-1 pt-14">
        <Hero className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-24 md:py-32">
          <Container className="relative z-10 text-center">
            <HeroTitle className="mx-auto max-w-4xl text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Ensure Food Safety with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AI-Powered Analysis
              </span>
            </HeroTitle>
            <HeroSubtitle className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Advanced machine learning technology to predict and prevent food safety risks with industry-leading accuracy
            </HeroSubtitle>
            <HeroActions className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/demo">Try Demo</Link>
              </Button>
            </HeroActions>
          </Container>
        </Hero>

        <Container>
          <section className="py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Key Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">Why choose our AI-powered food safety platform</p>
            </div>
            <FeaturesGrid className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              <Feature
                icon={AccuracyIcon}
                title="High Accuracy"
                description="Our AI model delivers industry-leading accuracy in food safety predictions"
              />
              <Feature
                icon={IntegrationIcon}
                title="Easy Integration"
                description="Seamlessly integrate with your existing food safety processes"
              />
              <Feature
                icon={SustainabilityIcon}
                title="Sustainable Practice"
                description="Reduce food waste while maintaining safety standards"
              />
              <Feature
                icon={CustomizationIcon}
                title="Customizable"
                description="Adapt the system to your specific food safety requirements"
              />
            </FeaturesGrid>
          </section>

          <section className="border-t py-24" id="team">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">Meet the experts behind our success</p>
            </div>
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-12 md:grid-cols-2">
                <TeamMember
                  name="Dr. Jane Wilson"
                  role="Chief Scientific Officer"
                  imageUrl="/team/jane-wilson.jpg"
                  bio="20+ years experience in food safety, leading research and development of AI-powered food safety systems. Pioneering AI-driven solutions with a proven track record of implementing innovative systems across global organizations."
                />
                <TeamMember
                  name="Mike Chen"
                  role="Head of AI Development"
                  imageUrl="/team/mike-chen.jpg"
                  bio="Former lead at major tech companies, specializing in machine learning and predictive analytics. Expert in developing scalable AI solutions with experience leading teams at Fortune 500 tech companies."
                />
              </div>
            </div>
          </section>
          
          <section className="border-t py-24" id="case-studies">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Case Studies</h2>
              <p className="mt-4 text-lg text-muted-foreground">See how businesses are succeeding with our platform</p>
            </div>
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-2">
                <Link href="/case-studies/restaurant-chain" className="block">
                  <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-2xl font-bold">Major Restaurant Chain Implementation</CardTitle>
                      <p className="text-muted-foreground text-lg">How we helped reduce food safety incidents by 75%</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex items-center text-primary">
                        <span className="font-medium">Learn more</span>
                        <svg 
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/case-studies/production-facility" className="block">
                  <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-2xl font-bold">Food Production Facility Optimization</CardTitle>
                      <p className="text-muted-foreground text-lg">Achieving 99.9% safety compliance rate</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex items-center text-primary">
                        <span className="font-medium">Learn more</span>
                        <svg 
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>
        </Container>
      </main>

      <Footer className="border-t bg-muted/50">
        <Container>
          <FooterContent className="py-6 md:py-8">
            <FooterCopyright>
              © 2024 FoodSafety AI. All rights reserved.
            </FooterCopyright>
            <FooterSocial className="space-x-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <LinkedInIcon className="h-5 w-5" />
              </Link>
            </FooterSocial>
          </FooterContent>
        </Container>
      </Footer>
    </div>
  )
}
