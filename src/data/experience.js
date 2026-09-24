// Work history grouped by employer and client engagement.
export const experience = [
  {
    company: "Mphasis Ltd.",
    role: "Software Engineer",
    period: "Aug 2024 - Present",
    status: "current",
    engagements: [
      {
        client: "HP | Java Backend Developer",
        bullets: [
          "Maintained and enhanced CDAX, HP's internal parts-ordering and CE task-management platform using Java Spring Boot, MySQL, and PostgreSQL",
          "Diagnosed and fixed a critical order-routing bug where orders were accepted without a valid zipcode, preventing wrong deliveries through frontend and backend validation",
          "Delivered end-to-end feature changes from stakeholder requirements, including adding, modifying, and deprecating application functionality",
          "Technologies: Java, Spring Boot, REST APIs, MySQL, PostgreSQL, Git",
        ],
      },
      {
        client: "Charles Schwab | Kafka Integration Engineer",
        bullets: [
          "Led Kafka onboarding for 15+ enterprise applications, configuring topics, producers, and consumers for reliable event-driven communication across distributed systems",
          "Built and maintained CI/CD pipelines using Bamboo and Harness, resolving build failures and ensuring smooth deployments across onboarded applications",
          "Used Ansible to remotely configure and manage servers, ensuring consistent and repeatable deployment environments",
          "Technologies: Java, Apache Kafka, Spring Boot, Bamboo, Harness, Ansible, Docker, Linux",
        ],
      },
    ],
  },
];
