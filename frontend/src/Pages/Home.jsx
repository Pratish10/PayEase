import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";
import PropTypes from "prop-types";
import { AppBar } from "../components/AppBar";
import { FeatureCard } from "../components/feature-card";

const MotionText = ({ children, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

MotionText.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const Button = ({ to, children }) => (
  <Link
    to={to}
    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg inline-flex items-center hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl"
  >
    {children}
  </Link>
);

Button.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Section = ({ id, title, children, className }) => (
  <section id={id} className={`py-20 ${className}`}>
    <div className="container mx-auto px-4">
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition-colors duration-300"
  >
    {children}
  </a>
);

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Home = () => {
  const date = new Date();
  const token = localStorage.getItem("token");
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppBar />
      <div className="pt-16 flex-grow">
        <div className="mx-auto space-y-8">
          <div className="flex flex-col">
            <main className="flex-grow">
              <Section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-24 md:py-32">
                <div className="container mx-auto px-4 text-center">
                  <MotionText
                    delay={0.2}
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                  >
                    Simplify Your Payments
                  </MotionText>
                  <MotionText
                    delay={0.4}
                    className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
                  >
                    Fast, secure, and hassle-free transactions at your
                    fingertips.
                  </MotionText>
                  <MotionText delay={0.6}>
                    <Button to={token ? "/dashboard" : "signup"}>
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </MotionText>
                </div>
              </Section>

              <Section id="features" title="Our Features" className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <FeatureCard
                    title="Instant Transfers"
                    description="Send money to anyone, anywhere, instantly."
                  />
                  <FeatureCard
                    title="Secure Payments"
                    description="Bank-grade encryption for all your transactions."
                  />
                </div>
              </Section>
            </main>

            <footer className="bg-gray-800 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="mb-4 md:mb-0">
                    &copy; {date.getFullYear().toString()} PayEase. All rights
                    reserved.
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm mr-2">Developed by:</span>
                    <FooterLink href="https://www.linkedin.com/in/pratish-ninawe-6199b2220/">
                      <Linkedin size={20} />
                      <span className="sr-only">LinkedIn</span>
                    </FooterLink>
                    <FooterLink href="https://x.com/Pratish1086241">
                      <Twitter size={20} />
                      <span className="sr-only">Twitter</span>
                    </FooterLink>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
