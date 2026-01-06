import React from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/clerk-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen w-[115%] flex flex-col bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Kairo</h1>
        <nav>
          <SignedOut>
            <SignInButton forceRedirectUrl={"/home"}>
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Smart Study Scheduler with AI
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          Kairo helps you plan, track, and revise smarter with AI-powered insights, streaks, and personalized reminders.
        </p>
        <SignInButton forceRedirectUrl={"/home"}>
          <Button size="lg" className="rounded-2xl px-8 py-6 text-lg">
            Get Started
          </Button>
              {/* <Button variant="outline">Login</Button> */}
          </SignInButton>
      </section>

      {/* Features Section */}
      <section className="px-6 py-12 bg-gray-50">
        <h3 className="text-2xl font-semibold text-center mb-8">Why Choose Kairo?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Smart Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get AI-powered spaced repetition reminders so you never forget what you learned.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Visualize streaks, study time, and subjects with beautiful analytics dashboards.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>AI Study Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Chat with Kairo AI to get summaries, quizzes, and personalized study plans.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-semibold text-center mb-8">What Students Say</h3>
        <div className="max-w-3xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 text-center">
                    <p className="italic text-gray-600">
                      “Kairo completely changed how I revise. My retention is way higher now!”
                    </p>
                    <span className="mt-4 block font-semibold">— Ananya, IIT Student</span>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 text-center">
                    <p className="italic text-gray-600">
                      “The streaks keep me motivated every single day. Love it!”
                    </p>
                    <span className="mt-4 block font-semibold">— Rahul, NEET Aspirant</span>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 text-center">
                    <p className="italic text-gray-600">
                      “The AI assistant is like having a personal tutor 24/7.”
                    </p>
                    <span className="mt-4 block font-semibold">— Sneha, UPSC Prep</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t">
        © {new Date().getFullYear()} Kairo. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage
