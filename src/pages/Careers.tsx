import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";
import { useCareers } from "@/api/career"; 
import SocialSidebar from "@/components/socialSidebar";

const Careers = () => {
  const { data: careers, isLoading, isError } = useCareers();

  const mailTo = "Roylrichindia.chandra@gmail.com";

  const handleApplyClick = (jobTitle) => {
    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(
      `Dear HR Team,\n\nI am interested in applying for the position of ${jobTitle}.\nPlease find my resume and portfolio attached.\n\nBest regards,\n[Your Name]`
    );
    window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <SocialSidebar/>
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/90 via-muted/50 to-primary/80 text-primary-foreground py-12 shadow-lg">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-serif text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              Join Our{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Team
              </span>
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Build your career with NPS Estates
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl font-bold text-center mb-16">
              Why Work With <span className="text-gold">Us?</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: <TrendingUp className="h-8 w-8 text-gold" />,
                  title: "Growth Opportunities",
                  description:
                    "Fast-track your career with continuous learning and development",
                },
                {
                  icon: <Users className="h-8 w-8 text-gold" />,
                  title: "Great Team",
                  description:
                    "Work with passionate professionals who care about your success",
                },
                {
                  icon: <Briefcase className="h-8 w-8 text-gold" />,
                  title: "Competitive Benefits",
                  description:
                    "Attractive compensation and comprehensive benefits package",
                },
                {
                  icon: <Heart className="h-8 w-8 text-gold" />,
                  title: "Work-Life Balance",
                  description:
                    "Flexible work environment that values your well-being",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center space-y-4 p-6 rounded-xl bg-background/80 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl font-bold text-center mb-6">
              Open <span className="text-gold">Positions</span>
            </h2>

            <p className="text-center text-muted-foreground italic mb-12">
              *To apply, mail your resume and portfolio at{" "}
              <a
                href={`mailto:${mailTo}`}
                className="text-gold underline hover:text-yellow-400"
              >
                {mailTo}
              </a>
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
              {isLoading ? (
                <p className="text-center text-muted-foreground">
                  Loading jobs...
                </p>
              ) : isError ? (
                <p className="text-center text-red-500">
                  Failed to load job openings.
                </p>
              ) : careers && careers.length > 0 ? (
                careers.map((job) => (
                  <Card
                    key={job._id}
                    className="p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-border"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <span className="text-gold mr-1">•</span>{" "}
                            {job.position}
                          </span>
                          <span className="flex items-center">
                            <span className="text-gold mr-1">•</span>{" "}
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <span className="text-gold mr-1">•</span>{" "}
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <span className="text-gold mr-1">•</span>{" "}
                            {job.experienceRequired}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="gold"
                        onClick={() => handleApplyClick(job.jobTitle)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  There are currently no openings. Please check back later.
                </p>
              )}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Don't see the right position? Send us your resume anyway!
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = `mailto:${mailTo}`)}
              >
                Submit General Application
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
