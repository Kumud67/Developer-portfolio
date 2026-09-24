// Architecture pipelines are arrays of stage labels, rendered by <ArchitectureDiagram />
export const projects = [
  {
    slug: "ecommerce-order-platform",
    title: "E-Commerce Order Platform",
    eyebrow: "KAFKA MICROSERVICES",
    summary:
      "An event-driven e-commerce backend that coordinates catalogue, cart, order, inventory, notification, and audit workflows through Apache Kafka.",
    metric: { value: "6", label: "microservices" },
    tech: ["Java", "Spring Boot", "Apache Kafka", "MySQL", "JWT", "Docker Compose"],
    problem:
      "An e-commerce workflow needed to keep order processing responsive while allowing inventory, notifications, and audit history to evolve independently without tightly coupled service calls.",
    solution:
      "Built Spring Boot microservices for product catalogue, cart, and order management, with Inventory, Notification, and Audit services reacting to order events through Kafka. Topics use three partitions and order ID keys to preserve ordering, while separate consumer groups isolate each service's workload.",
    features: [
      "Kafka topics with three partitions and order ID key-based partitioning",
      "Independent consumer groups with manual commits for at-least-once delivery",
      "Dead-letter queue for isolating and reviewing failed messages",
      "JWT authentication and role-based access control on REST APIs",
      "Swagger/OpenAPI endpoint documentation",
      "JUnit and Mockito unit and integration test coverage",
      "Docker Compose setup for the services and Kafka",
    ],
    architecture: [
      "REST Clients",
      "Order Service",
      "Kafka Topics",
      "Inventory / Notification / Audit",
      "MySQL",
    ],
    decisions: [
      {
        title: "Why key Kafka records by order ID",
        text: "Orders can trigger several state changes, and processing them out of order could make inventory or audit records incorrect. Using the order ID as the record key keeps related events on the same partition while allowing the topic to scale across partitions.",
      },
      {
        title: "Why use a dead-letter queue",
        text: "A malformed or repeatedly failing event should not block healthy orders. After retry handling is exhausted, the event is moved to a dead-letter queue for inspection and replay without stopping the main consumer flow.",
      },
    ],
    codeSnippet: {
      language: "java",
      label: "OrderEventProducer.java",
      code: `public void publishOrderCreated(OrderCreatedEvent event) {
    kafkaTemplate.send("orders.created", event.orderId(), event)
        .whenComplete((result, error) -> {
            if (error != null) {
                log.error("Failed to publish order {}", event.orderId(), error);
            }
        });
}`,
    },
    github: "https://github.com/Kumud67/ecommerce-order-platform",
    demo: null,
  },
  {
    slug: "ask-your-data",
    title: "Ask-Your-Data",
    eyebrow: "NATURAL LANGUAGE TO SQL",
    summary:
      "A natural-language analytics assistant that turns plain-English questions into safe SQL queries and presents the results as tables or charts.",
    metric: { value: "SELECT", label: "query guardrail" },
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "LLM API", "Docker", "AWS EC2"],
    problem:
      "Business users needed answers from an orders dataset without writing SQL, but generated queries had to be constrained so the assistant could not mutate data or return unbounded results.",
    solution:
      "Built a FastAPI backend and React frontend that pass the PostgreSQL schema to an LLM as context, validate generated statements, execute them with a read-only database role, and render the limited results as a table or chart.",
    features: [
      "Plain-English questions translated into PostgreSQL queries",
      "Schema-aware prompting for tables, columns, and relationships",
      "SELECT-only validation before any query is executed",
      "Read-only database role and row limits for defense in depth",
      "Table and chart result views for quick analysis",
      "Prompt refinement against a sample-question test set",
      "Docker deployment on an AWS EC2 instance",
    ],
    architecture: [
      "React Client",
      "FastAPI",
      "LLM API",
      "Query Guardrails",
      "Read-only PostgreSQL",
    ],
    decisions: [
      {
        title: "Why schema context is sent with every request",
        text: "The model needs current table and column names to produce useful SQL. Supplying a focused schema context makes the generated query more precise and avoids relying on assumptions learned from unrelated datasets.",
      },
      {
        title: "Why the database role is read-only",
        text: "Prompt instructions alone are not a sufficient security boundary. The database role prevents INSERT, UPDATE, DELETE, and schema changes even if validation misses a malicious or malformed statement.",
      },
    ],
    codeSnippet: {
      language: "python",
      label: "query_guard.py",
      code: `def validate_query(query: str) -> str:
    statement = sqlparse.parse(query)
    if len(statement) != 1 or statement[0].get_type() != "SELECT":
        raise ValueError("Only a single SELECT query is allowed")

    return f"SELECT * FROM ({query}) AS result LIMIT 500"`,
    },
    github: "https://github.com/Kumud67/ask-your-data",
    demo: null,
  },
  {
    slug: "banking-transaction-processor",
    title: "Banking Transaction Processor",
    eyebrow: "EVENT-DRIVEN SYSTEM",
    summary:
      "A reliable transaction-processing pipeline that validates, audits, and recovers financial events without losing or double-processing records.",
    metric: { value: "12K", label: "events / min" },
    tech: ["Java", "Spring Boot", "Apache Kafka", "PostgreSQL", "Redis", "Docker"],
    problem:
      "Financial transactions arriving from multiple channels needed dependable validation and processing, even when downstream services were unavailable or consumers restarted during a retry.",
    solution:
      "Built a Kafka-based pipeline that publishes immutable transaction events, processes them idempotently by transaction ID, retries transient failures, and routes exhausted failures to a dead-letter queue while recording every state change in an audit table.",
    features: [
      "Topic-per-transaction-type event design",
      "Idempotent processing keyed by transaction ID",
      "Three-attempt exponential-backoff retry handling",
      "Dead-letter queue with manual replay support",
      "Append-only audit history for transaction state changes",
      "Consumer-lag monitoring with Prometheus and Grafana",
    ],
    architecture: [
      "Client Channels",
      "Spring Boot API",
      "Kafka Topics",
      "Transaction Consumer",
      "PostgreSQL Ledger",
    ],
    decisions: [
      {
        title: "Why Kafka instead of synchronous service calls",
        text: "A downstream outage should not stop transaction intake. Kafka stores events safely until consumers recover, allowing the API and processing services to scale and fail independently.",
      },
      {
        title: "Why idempotency uses the transaction ID",
        text: "Consumer offsets alone cannot prevent duplicate business effects after a partial batch failure. Checking the transaction ID makes replays and restarts safe at the business level.",
      },
    ],
    codeSnippet: {
      language: "java",
      label: "TransactionConsumer.java",
      code: `@KafkaListener(topics = "transactions.incoming", groupId = "txn-processor")
public void consume(TransactionEvent event, Acknowledgment ack) {
    if (ledgerRepository.existsByTransactionId(event.getId())) {
        ack.acknowledge();
        return;
    }
    ledgerService.process(event);
    ack.acknowledge();
}`,
    },
    github: "https://github.com/Kumud67/Banking_app",
    demo: null,
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
