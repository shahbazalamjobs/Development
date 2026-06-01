That's a much better approach. Instead of learning topics randomly, place each concept exactly where it appears in real backend development.

# 90-Day Backend Interview Roadmap (MERN + System Design)

## Phase 1: Backend Fundamentals (Days 1-30)

### Week 1: HTTP, APIs & Networking

#### Concepts

* What is an API
* REST vs GraphQL
* HTTP Methods (GET, POST, PUT, PATCH, DELETE)
* HTTP Status Codes (2xx, 4xx, 5xx)
* Stateless vs Stateful APIs

#### Node/Express

* Express basics
* Routing
* Middleware
* Request lifecycle

#### Machine Coding

1. Notes API
2. Todo API
3. Blog API

#### Project

Blog Backend API

---

### Week 2: Authentication & Security

#### Concepts

* Authentication vs Authorization
* Session-based Authentication vs JWT
* OAuth 2.0
* Google Login
* GitHub Login

#### Node/Express

* JWT
* Cookies
* Refresh Tokens
* RBAC

#### Machine Coding

4. JWT Auth Service
5. RBAC System
6. OAuth Login Service

#### Project

Production-grade Auth Service

---

### Week 3: Databases Fundamentals

#### Concepts

* SQL vs NoSQL
* ACID Properties
* Database Normalization vs Denormalization
* Indexes and Query Optimization

#### MongoDB

* CRUD
* Aggregation
* Indexes

#### SQL

* PostgreSQL basics
* Joins

#### Machine Coding

7. Inventory API
8. Product Catalog API
9. Search API

#### Project

Inventory Management Backend

---

### Week 4: Transactions & Data Handling

#### Concepts

* Transactions
* Isolation Levels
* Handling Duplicate Records
* Pagination (Offset vs Cursor)
* Optimistic vs Pessimistic Locking

#### MongoDB

* Transactions
* Sessions

#### Machine Coding

10. Banking API
11. Ticket Booking API
12. Pagination Service

#### Project

Booking System Backend

---

# Phase 2: Performance & Scalability (Days 31-60)

### Week 5: Caching

#### Concepts

* What is Caching
* Where to Cache
* TTL
* LRU
* Cache Eviction
* Cache Consistency
* Stale Cache Problems
* Why Cache Can Make Systems Wrong

#### Redis

* Redis Basics
* Cache Aside Pattern

#### Machine Coding

13. Redis Cache Layer
14. LRU Cache
15. Session Store

#### Project

High Performance Product API

---

### Week 6: Scaling Databases

#### Concepts

* Sharding & Partitioning
* Read Replicas
* Write Scaling

#### MongoDB

* Replication
* Sharding

#### Machine Coding

16. Analytics Service
17. Leaderboard Service
18. Feed Service

#### Project

Analytics Backend

---

### Week 7: API Protection & Reliability

#### Concepts

* Rate Limiting vs Throttling
* Idempotency
* Retries
* Timeouts
* Circuit Breakers

#### Node.js

* express-rate-limit
* Retry patterns

#### Machine Coding

19. Payment API
20. Rate Limiter
21. API Gateway

#### Project

Payment Backend

---

### Week 8: Messaging & Async Systems

#### Concepts

* Service-to-Service Communication

  * Synchronous
  * Asynchronous
* Message Queues

  * Kafka
  * RabbitMQ
  * SQS
* Event-Driven Architecture

#### Machine Coding

22. Email Queue
23. Notification Service
24. Order Processing Queue

#### Project

Order Management System

---

# Phase 3: System Design & Distributed Systems (Days 61-90)

### Week 9: Scaling Applications

#### Concepts

* Load Balancing

  * Round Robin
  * Least Connections
  * Hashing
* Horizontal vs Vertical Scaling
* CDN and Edge Caching

#### Design Problems

1. URL Shortener
2. Image Hosting Service

#### Machine Coding

25. Load Balancer
26. CDN Simulator

---

### Week 10: Architecture

#### Concepts

* Monolith vs Microservices
* Trade-offs
* Service Discovery
* API Gateway

#### Design Problems

3. E-commerce
4. Food Delivery

#### Machine Coding

27. API Gateway
28. Service Registry
29. Order Service

---

### Week 11: Distributed Systems

#### Concepts

* Exactly-Once vs At-Least-Once Processing
* Handling Race Conditions
* Distributed Locking
* Saga Pattern

#### Design Problems

5. Uber
6. WhatsApp
7. Netflix

#### Machine Coding

30. Distributed Counter
31. Distributed Lock
32. Saga Workflow Engine

---

### Week 12: Production Engineering

#### Concepts

* Observability

  * Logs
  * Metrics
  * Tracing
* Deployments

  * Blue-Green Deployment
  * Rolling Deployment
* Graceful Degradation
* Handling Traffic Spikes & Viral Load

#### Tools

* Docker
* CI/CD
* AWS Basics
* Prometheus
* Grafana

#### Machine Coding

33. Logging Service
34. Monitoring Service
35. Health Check Service

#### Project

Production-Ready SaaS Backend

---

# DSA Alongside (90 Days)

Spend 2 hours daily.

### Must Know

Arrays

* Two Pointers
* Sliding Window
* Prefix Sum

Strings

* Hashing
* KMP (basic)

Linked Lists

Stacks & Queues

Trees

* DFS
* BFS
* BST

Heaps

Graphs

* BFS
* DFS
* Topological Sort

Binary Search

Dynamic Programming

* 15-20 famous patterns

Target:

* 200-250 LeetCode questions

---

# Final 5 Major Projects

### Project 1

Auth Service

* JWT
* OAuth
* RBAC
* Refresh Tokens

### Project 2

E-commerce Backend

* Products
* Orders
* Payments
* Redis

### Project 3

URL Shortener

* Redis
* Analytics
* Rate Limiting

### Project 4

Chat Application

* WebSockets
* Redis Pub/Sub

### Project 5

Distributed Order System

* Kafka
* Saga Pattern
* Microservices
* Docker

---

# Interview Readiness Check

By Day 90, you should be able to confidently explain:

✅ REST vs GraphQL
✅ JWT vs Session
✅ OAuth Flow
✅ MongoDB Indexes
✅ ACID & Transactions
✅ Pagination
✅ Redis Caching
✅ Sharding & Replication
✅ Kafka vs RabbitMQ
✅ Load Balancing
✅ Horizontal Scaling
✅ Microservices vs Monoliths
✅ Circuit Breakers
✅ Distributed Locking
✅ Saga Pattern
✅ Observability
✅ Blue-Green Deployment
✅ Traffic Spike Handling

This roadmap covers all 40 backend concepts you listed and places them in the order they're typically encountered when building and scaling real-world MERN applications.
