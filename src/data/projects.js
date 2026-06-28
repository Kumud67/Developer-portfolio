// Architecture pipelines are arrays of stage labels, rendered by <ArchitectureDiagram />
export const projects = [
  {
    slug: "banking-transaction-processor",
    title: "Banking Transaction Processor",
    eyebrow: "EVENT-DRIVEN SYSTEM",
    summary:
      "An event-driven transaction pipeline that processes, validates, and audits financial transactions at scale, with built-in retry and dead-letter handling.",
    metric: { value: "12K", label: "events / min" },
    tech: ["Java", "Spring Boot", "Kafka", "Docker", "PostgreSQL", "Redis"],
    problem:
      "Financial transactions arriving from multiple channels needed to be validated, processed, and recorded reliably — without losing events during downstream outages, and without double-processing on retries.",
    solution:
      "Built a Kafka-based event pipeline where each transaction is published as an immutable event. Consumers process events idempotently using a transaction-ID key, with a dead-letter queue catching anything that fails after 3 retries, and every state change written to an append-only audit log table.",
    features: [
      "Event-driven architecture with topic-per-transaction-type design",
      "Idempotent transaction processing keyed by transaction ID",
      "Exponential-backoff retry mechanism (3 attempts)",
      "Dead Letter Queue for failed events with manual replay tooling",
      "Append-only audit log for full transaction history",
      "Prometheus + Grafana dashboards for consumer lag monitoring",
    ],
    architecture: ["Client / Channel", "Spring Boot API", "Kafka Topic", "Consumer Group", "PostgreSQL", "Audit Log"],
    decisions: [
      {
        title: "Why Kafka over a direct REST call between services",
        text: "Direct synchronous calls meant a downstream outage would block transaction intake entirely. Kafka decouples intake from processing — transactions queue safely and drain once consumers recover, so write throughput stays unaffected by downstream issues.",
      },
      {
        title: "Why idempotency by transaction ID instead of consumer offset tracking alone",
        text: "Offset tracking alone doesn't protect against consumer restarts re-reading a partially committed batch. Keying idempotency to the business transaction ID guarantees safety regardless of how the consumer fails or restarts.",
      },
    ],
    codeSnippet: {
      language: "java",
      label: "TransactionConsumer.java",
      code: `@KafkaListener(topics = "transactions.incoming", groupId = "txn-processor")
public void consume(TransactionEvent event, Acknowledgment ack) {
    if (ledgerRepository.existsByTransactionId(event.getId())) {
        ack.acknowledge(); // already processed — safe no-op
        return;
    }
    try {
        ledgerService.process(event);
        ack.acknowledge();
    } catch (RetriableException ex) {
        retryTemplate.execute(ctx -> ledgerService.process(event));
    }
}`,
    },
    github: "https://github.com/kumudh-t/banking-transaction-processor",
    demo: null,
  },
  {
    slug: "realtime-inventory-sync",
    title: "Real-Time Inventory Sync Platform",
    eyebrow: "MICROSERVICES",
    summary:
      "A microservices platform that keeps inventory counts consistent across warehouse, e-commerce, and POS systems in near real time using event choreography.",
    metric: { value: "99.95%", label: "sync accuracy" },
    tech: ["Java", "Spring Boot", "Spring Cloud", "Kafka", "MongoDB", "Docker", "Kubernetes"],
    problem:
      "Inventory counts drifted between warehouse, online store, and point-of-sale systems because each updated independently. Overselling and stockout mismatches were common.",
    solution:
      "Decomposed inventory logic into independent services (Warehouse, Storefront, POS) communicating through Kafka events rather than direct calls. Each service owns its own data and reacts to stock-change events, with a reconciliation service periodically checking for drift and emitting correction events.",
    features: [
      "Service-per-domain microservices design (Warehouse, Storefront, POS, Reconciliation)",
      "Event choreography — no central orchestrator, services react independently",
      "Schema Registry (Avro) for backward-compatible event evolution",
      "Kubernetes deployment with horizontal pod autoscaling on consumer lag",
      "Reconciliation job for automatic drift correction",
      "Centralized structured logging via ELK stack",
    ],
    architecture: ["Warehouse Service", "Kafka (Avro)", "Storefront Service", "POS Service", "Reconciliation Service", "MongoDB"],
    decisions: [
      {
        title: "Why event choreography instead of a central orchestrator",
        text: "An orchestrator becomes a single point of failure and a bottleneck for adding new consumers. Choreography lets each service evolve and scale independently — adding a new consumer of stock-change events needs zero changes to existing services.",
      },
      {
        title: "Why Avro + Schema Registry over plain JSON events",
        text: "With multiple independent teams evolving their services, JSON gave no guarantee a field rename wouldn't silently break a consumer. Avro with Schema Registry enforces compatibility checks at publish time, catching breaking changes before they reach production.",
      },
    ],
    codeSnippet: {
      language: "java",
      label: "StockChangeProducer.java",
      code: `public void publishStockChange(String sku, int delta, String source) {
    StockChangeEvent event = StockChangeEvent.newBuilder()
        .setSku(sku)
        .setDelta(delta)
        .setSource(source)
        .setTimestamp(Instant.now().toEpochMilli())
        .build();

    kafkaTemplate.send("inventory.stock-changed", sku, event)
        .whenComplete((result, ex) -> {
            if (ex != null) log.error("Failed to publish stock change for {}", sku, ex);
        });
}`,
    },
    github: "https://github.com/kumudh-t/realtime-inventory-sync",
    demo: null,
  },
  {
    slug: "secure-api-gateway",
    title: "Secure API Gateway & RBAC Service",
    eyebrow: "SECURITY · INFRASTRUCTURE",
    summary:
      "A centralized API gateway handling authentication, role-based access control, and rate limiting for a suite of internal microservices.",
    metric: { value: "0", label: "unauthorized access incidents" },
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "Redis", "Docker"],
    problem:
      "Each internal microservice was implementing its own authentication and authorization logic, leading to inconsistent security rules and duplicated code across teams.",
    solution:
      "Built a single Spring Cloud Gateway service that handles JWT validation, role-based access control, and per-client rate limiting before requests ever reach downstream services — so individual services only deal with business logic, not auth.",
    features: [
      "Centralized JWT validation and refresh-token rotation",
      "Role-Based Access Control (RBAC) with fine-grained route-level permissions",
      "Redis-backed sliding-window rate limiting per API key",
      "Request/response logging with correlation IDs for tracing",
      "Circuit breaker (Resilience4j) for downstream service failures",
    ],
    architecture: ["Client", "API Gateway", "Auth / RBAC Filter", "Rate Limiter (Redis)", "Downstream Microservices"],
    decisions: [
      {
        title: "Why a centralized gateway instead of per-service auth",
        text: "Per-service auth meant a security fix had to be deployed N times across N services, and inevitably drifted out of sync. Centralizing it in the gateway means one change point and one consistent policy enforced everywhere.",
      },
      {
        title: "Why Redis for rate limiting instead of in-memory counters",
        text: "In-memory counters reset on restart and don't work across multiple gateway instances behind a load balancer. Redis gives a shared, persistent counter so rate limits hold true cluster-wide, not per-instance.",
      },
    ],
    codeSnippet: {
      language: "java",
      label: "RbacFilter.java",
      code: `@Override
public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    String token = extractToken(exchange.getRequest());
    Claims claims = jwtService.parse(token);

    String requiredRole = routeRoleResolver.resolve(exchange.getRequest().getPath());
    if (!claims.get("roles", List.class).contains(requiredRole)) {
        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
        return exchange.getResponse().setComplete();
    }
    return chain.filter(exchange);
}`,
    },
    github: "https://github.com/kumudh-t/secure-api-gateway",
    demo: null,
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
