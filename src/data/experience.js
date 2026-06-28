// Formatted like structured log entries — the "About/Experience as logs" motif
export const experience = [
  {
    company: "Mphasis",
    role: "Software Engineer",
    period: "2024 — Present",
    status: "current",
    engagements: [
      {
        client: "Charles Schwab",
        bullets: [
          "Developed and maintained REST APIs using Spring Boot serving internal trading-support tools",
          "Built Kafka producers and consumers to process transaction events across 4+ downstream services",
          "Implemented Role-Based Access Control (RBAC) across API endpoints, reducing unauthorized access incidents to zero",
          "Wrote integration tests with JUnit and Mockito, raising module test coverage from 54% to 87%",
        ],
      },
      {
        client: "HP",
        bullets: [
          "Optimized API response times by 35% through query tuning and targeted Redis caching",
          "Set up and maintained CI/CD pipelines using Bamboo, cutting average deployment time from 20 to 6 minutes",
          "Collaborated directly with frontend engineers to define and version REST contracts, reducing integration bugs across 3 sprint cycles",
        ],
      },
    ],
  },
];
