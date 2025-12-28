import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layout/SiteLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

const Home = React.lazy(() => import("./pages/Home"));
const Services = React.lazy(() => import("./pages/Services"));
const ServiceDetail = React.lazy(() => import("./pages/ServiceDetail"));
const CaseStudies = React.lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = React.lazy(() => import("./pages/CaseStudyDetail"));
const Insights = React.lazy(() => import("./pages/Insights"));
const PostDetail = React.lazy(() => import("./pages/PostDetail"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const ThankYou = React.lazy(() => import("./pages/ThankYou"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-gray-700">Loading…</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
